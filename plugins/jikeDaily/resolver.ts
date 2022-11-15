import { load } from "cheerio"
import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { getProxyAgent } from "../../utils/proxy"
import { GraphQLReadableLink } from "../CommonType"
import { Resolver } from "../Resolver"

const GraphQLJikeDaily = new GraphQLObjectType({
  name: "JikeDaily",
  fields: {
    title: { type: GraphQLString },
    items: { type: new GraphQLList(GraphQLReadableLink) },
  },
})

export default new Resolver({
  jikeDaily: {
    type: GraphQLJikeDaily,
    resolve: async () => {
      const result = await fetch("https://rsshub.app/jike/user/wenhao1996", {
        agent: getProxyAgent(),
      }).then((res) => res.text())
      const $ = load(result, {
        xml: {
          xmlMode: true,
          withStartIndices: true,
        },
      })
      const title = $("item title").first().text()
      const htmlStr = $("item description").first().text()
      let items
      if (htmlStr) {
        const $ = load(htmlStr)
        items = $("a")
          .map(function () {
            const link: any = $(this).attr("href")
            const text = $(this).text()
            return { link, text }
          })
          .toArray()
      }
      const data = {
        title,
        items,
      }
      return data
    },
  },
})
