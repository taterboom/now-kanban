import { load } from "cheerio"
import { GraphQLList } from "graphql"
import { getProxyAgent } from "../../utils/proxy"
import { GraphQLReadableLink } from "../CommonType"
import { Resolver } from "../Resolver"

export default new Resolver({
  baiduHotItems: {
    type: new GraphQLList(GraphQLReadableLink),
    resolve: async () => {
      const result = await fetch("https://top.baidu.com/board", {
        agent: getProxyAgent(),
      }).then((res) => res.text())
      const $ = load(result)
      const data = $(".theme-hot [class^=item-wrap]")
        .map(function () {
          const link: any = $(this).attr("href")
          const text = $(this).find("[class^=content-wrap] [class^=name]").first().text()
          return { link, text }
        })
        .toArray()
        .slice(1) // 第一条通常无意义
      return data
    },
  },
})
