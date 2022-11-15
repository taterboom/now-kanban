import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { executeInPage } from "../../utils/headless"
import { GraphQLReadableLink } from "../CommonType"
import { Resolver } from "../Resolver"

const IndiehackerExploreItem = new GraphQLObjectType({
  name: "IndiehackerExploreItem",
  fields: {
    title: { type: GraphQLString },
    items: { type: new GraphQLList(GraphQLReadableLink) },
  },
})

export default new Resolver({
  indiehackerExploreItems: {
    type: new GraphQLList(IndiehackerExploreItem),
    resolve: async () => {
      const result = await executeInPage("https://www.indiehackers.com/explore", async (page) => {
        await page.waitForSelector(".explore")
        const data = await page.evaluate(() => {
          const sections = document.querySelectorAll(".explore__category")
          const sectionsData = []
          for (const section of sections) {
            const title = section.querySelector(".explore__category-title")?.textContent
            const sectionData = {
              title: title?.trim(),
              items: [] as any[],
            }
            sectionsData.push(sectionData)
            const items = section.querySelectorAll(".explore__category-item")
            for (const item of items) {
              if (sectionData.items.length >= 3) break
              const itemTitle = item.querySelector(".category-item__title")?.textContent
              const itemLink = item.getAttribute("href")
              sectionData.items.push({
                text: itemTitle?.trim(),
                link: itemLink,
              })
            }
          }
          return sectionsData
        })
        return data
      })

      return result
    },
  },
})
