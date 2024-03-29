import { load } from "cheerio"
import { GraphQLList } from "graphql"
import { GraphQLReadableLink } from "../CommonType"
import { Resolver } from "../Resolver"

export default new Resolver({
  oschinaHotItems: {
    type: new GraphQLList(GraphQLReadableLink),
    resolve: async () => {
      const result = await fetch("https://www.oschina.net/news/industry").then((res) => res.text())
      const $ = load(result)
      const data = $(".section.articles-list > .items > .item > .content > a")
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
