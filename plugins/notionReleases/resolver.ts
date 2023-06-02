import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { JSDOM } from "jsdom"
import { getProxyAgent } from "../../utils/proxy"
import { GraphQLReadableLink } from "../CommonType"
import { Resolver } from "../Resolver"

const NotionReleaseItem = new GraphQLObjectType({
  name: "NotionReleaseItem",
  fields: {
    info: { type: GraphQLReadableLink },
    time: { type: GraphQLString },
  },
})

export default new Resolver({
  notionReleaseItems: {
    type: new GraphQLList(NotionReleaseItem),
    resolve: async () => {
      const result = await fetch("https://www.notion.so/releases", {
        agent: getProxyAgent(),
      }).then((res) => res.text())
      const dom = new JSDOM(result)
      const data: { info: { link: string; text: string }; time: string }[] = []
      const artile = dom.window.document.querySelector("article.release")
      if (artile) {
        const time = artile.querySelector("time") as any
        const anchor = artile.querySelector("h2 a") as any
        data.push({
          info: {
            link: anchor.href,
            text: anchor.textContent || "",
          },
          time: time.textContent || "",
        })
      }
      dom.window.document.querySelectorAll(".release-preview").forEach((item: any) => {
        const anchor = item.querySelector("h3 a")
        const time = item.querySelector("time")
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
