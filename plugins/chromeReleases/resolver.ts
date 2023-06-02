import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { JSDOM } from "jsdom"
import { getProxyAgent } from "../../utils/proxy"
import { GraphQLReadableLink } from "../CommonType"
import { Resolver } from "../Resolver"

const ChromeReleaseItem = new GraphQLObjectType({
  name: "ChromeReleaseItem",
  fields: {
    info: { type: GraphQLReadableLink },
    time: { type: GraphQLString },
  },
})

export default new Resolver({
  chromeReleaseItems: {
    type: new GraphQLList(ChromeReleaseItem),
    resolve: async () => {
      const result = await fetch("https://developer.chrome.com/blog", {
        agent: getProxyAgent(),
      }).then((res) => res.text())
      const dom = new JSDOM(result)
      const data: { info: { link: string; text: string }; time: string }[] = []
      dom.window.document.querySelectorAll(".blog-card").forEach((item: any) => {
        const anchor = item.querySelector("h2 a")
        const time = item.querySelector(".card-authors__meta time")
        data.push({
          info: {
            link: anchor.href,
            text: anchor.textContent || "",
          },
          time: time.textContent || "",
        })
      })
      return data.slice(0, 5)
    },
  },
})
