import { load } from "cheerio"
import { GraphQLList } from "graphql"
import { getProxyAgent } from "../../utils/proxy"
import { GraphQLReadableLink } from "../CommonType"
import { Resolver } from "../Resolver"

export default new Resolver({
  hacknewsItems: {
    type: new GraphQLList(GraphQLReadableLink),
    resolve: async () => {
      const result = await fetch("https://news.ycombinator.com/", {
        agent: getProxyAgent(),
      }).then((res) => res.text())
      const $ = load(result)
      const data = $(".athing .title .titleline > a")
        .map(function () {
          const link: any = $(this).attr("href")
          const text = $(this).text()
          return { link, text }
        })
        .toArray()
      return data
    },
  },
})
