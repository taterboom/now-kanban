import { load } from "cheerio"
import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { getProxyAgent } from "../../utils/proxy"
import { Resolver } from "../Resolver"

const GraphQLStock = new GraphQLObjectType({
  name: "GraphQLStock",
  fields: {
    link: { type: GraphQLString },
    values: { type: new GraphQLList(GraphQLString) }, // [name, current price, price diff, price diff percent]
  },
})

export default new Resolver({
  stocks: {
    type: new GraphQLList(GraphQLStock),
    resolve: async () => {
      const result = await fetch("https://www.eastmoney.com/", {
        agent: getProxyAgent(),
      }).then((res) => res.text())
      const $ = load(result)
      const blocks = $(".hq-news .hq-news-con")
      const data = blocks
        .map(function () {
          return $(this)
            .find(".hq-news-con-b .hq-news-data")
            .map(function () {
              const values = $(this)
                .children()
                .map(function () {
                  return $(this).text()
                })
                .toArray()
              const link = $(this).find(".nickname a").first().attr("href")
              return {
                link,
                values,
              }
            })
            .toArray()
            .slice(0, 3)
        })
        .toArray()
      return data
    },
  },
})
