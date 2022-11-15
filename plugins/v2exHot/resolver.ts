import { load } from "cheerio"
import { GraphQLList } from "graphql"
import { getProxyAgent } from "../../utils/proxy"
import { GraphQLReadableLink } from "../CommonType"
import { Resolver } from "../Resolver"

export default new Resolver({
  v2exHotItems: {
    type: new GraphQLList(GraphQLReadableLink),
    resolve: async () => {
      // const result = await executeInPage("https://v2ex.com", (page) =>
      //   page.$eval("#TopicsHot", (el) => {
      //     const _result: { link: string; text: string | null }[] = []
      //     el.querySelectorAll(".item_hot_topic_title > a").forEach((item) => {
      //       if (item instanceof HTMLAnchorElement) {
      //         _result.push({
      //           link: item.href,
      //           text: item.textContent,
      //         })
      //       }
      //     })
      //     return _result
      //   })
      // )
      const result = await fetch("http://v2ex.com", {
        agent: getProxyAgent(),
      }).then((res) => res.text())
      const $ = load(result)
      const data = $("#TopicsHot .item_hot_topic_title > a")
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
