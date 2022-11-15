import { load } from "cheerio"
import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { getProxyAgent } from "../../utils/proxy"
import { Resolver } from "../Resolver"

const ProducthuntRankItem = new GraphQLObjectType({
  name: "ProducthuntRankItem",
  fields: {
    link: { type: GraphQLString },
    title: { type: GraphQLString },
    desc: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    category: { type: GraphQLString },
    categoryLink: { type: GraphQLString },
    votes: { type: GraphQLString },
  },
})

const getTime = (time: "month" | "yesterday" | "today") => {
  const date = new Date()
  switch (time) {
    case "yesterday": {
      const yesterdayDate = new Date(date.getTime() - 24 * 60 * 60 * 1000)
      return `${yesterdayDate.getFullYear()}/${
        yesterdayDate.getMonth() + 1
      }/${yesterdayDate.getDate()}`
    }
    case "month":
      return `${date.getFullYear()}/${date.getMonth() + 1}`
  }
}

export default new Resolver({
  producthuntRankItems: {
    type: new GraphQLList(ProducthuntRankItem),
    args: {
      time: { type: GraphQLString }, // month: 2022/11; yesterday: 2022/11/11; today: 2022/11/12
    },
    resolve: async (_, { time }) => {
      const requestUrl =
        time === "today"
          ? "https://www.producthunt.com"
          : `https://www.producthunt.com/time-travel/${getTime(time)}`
      const result = await fetch(requestUrl, {
        agent: getProxyAgent(),
      }).then((res) => res.text())
      const $ = load(result)
      const data = $("[data-test^=post-item]").map(function () {
        const titleEl = $(this).find("[data-test^=post-name]").first()
        const title = titleEl.text()
        const link = titleEl.attr("href")

        const thumbnailImg = $(this).find("[data-test=post-thumbnail] img").first()?.attr("src")
        const thumbnailVideo = $(this)
          .find("[data-test=post-thumbnail] video")
          .first()
          ?.attr("poster")
        const processedThumbnail = thumbnailImg || thumbnailVideo
        let thumbnail = ""
        if (processedThumbnail) {
          const url = new URL(processedThumbnail)
          thumbnail = url.origin + url.pathname
        }

        const desc = $(this).find("[class^=styles_tagline]").first().text()

        const categoryEl = $(this).find("[class^=styles_postTopicLink]").first()
        const category = categoryEl.text()
        const categoryLink = categoryEl.attr("href")

        const votes = $(this).find("[data-test=vote-button]").first().text()

        return {
          title: title.trim(),
          link,
          desc: desc.trim(),
          thumbnail: thumbnail.trim(),
          category: category.trim(),
          categoryLink,
          votes: votes.trim(),
        }
      })

      return data
    },
  },
})
