import { load } from "cheerio"
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { getProxyAgent } from "../../utils/proxy"
import { Resolver } from "../Resolver"

const StackoverflowHot = new GraphQLObjectType({
  name: "StackoverflowHot",
  fields: {
    title: { type: GraphQLString },
    link: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    votes: { type: GraphQLInt },
    answers: { type: GraphQLInt },
    views: { type: GraphQLInt },
  },
})

export default new Resolver({
  stackoverflowHotItems: {
    type: new GraphQLList(StackoverflowHot),
    args: {
      tab: { type: GraphQLString }, // hot | week | month
    },
    resolve: async (_, { tab }) => {
      const result = await fetch(`https://stackoverflow.com/?tab=${tab}`, {
        agent: getProxyAgent(),
      }).then((res) => res.text())
      const $ = load(result)
      const data = $("[id^=question-summary]")
        .slice(0, 5)
        .map(function () {
          const [votes, answers, views] = $(this)
            .find(
              ".s-post-summary--stats .s-post-summary--stats-item .s-post-summary--stats-item-number"
            )
            .map(function () {
              return +$(this).text() || 0
            })
            .toArray()

          const titleEl = $(this).find(".s-post-summary--content-title a").first()
          const title = titleEl.text()
          const link = titleEl.attr("href") || ""

          const tags = $(this)
            .find(".js-post-tag-list-item")
            .map(function () {
              return $(this).text()
            })
            .toArray()

          return {
            title: title.trim(),
            link: link.trim(),
            views,
            answers,
            votes,
            tags,
          }
        })
        .toArray()

      return data
    },
  },
})
