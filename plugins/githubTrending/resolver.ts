import { load } from "cheerio"
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { getProxyAgent } from "../../utils/proxy"
import { Resolver } from "../Resolver"

// doc: https://docs.rsshub.app/programming.html#github-trending
// /github/trending/:since/:language/:spoken_language

const GithubTrendingItem = new GraphQLObjectType({
  name: "GithubTrendingItem",
  fields: {
    title: { type: GraphQLString },
    link: { type: GraphQLString },
    desc: { type: GraphQLString },
    language: { type: GraphQLString },
    stars: { type: GraphQLInt },
  },
})

const DATA_REGEXP = /<img src="(.*)"\s.*<br>(.*)<br><br>Language:(.*)<br>Stars:(.*)<br>Forks:(.*)/

export default new Resolver({
  githubTrendingItems: {
    type: new GraphQLList(GithubTrendingItem),
    args: {
      since: { type: GraphQLString },
      language: { type: GraphQLString },
      spoken_language: { type: GraphQLString },
    },
    resolve: async (_, { since, language, spoken_language }) => {
      const result = await fetch(
        `https://rsshub.app/github/trending/${since}/${language}/${spoken_language}`,
        {
          agent: getProxyAgent(),
        }
      ).then((res) => res.text())
      const $ = load(result, {
        xml: {
          xmlMode: true,
          withStartIndices: true,
        },
      })
      const data = $("item").map(function () {
        const title: string = $(this).find("title").text()
        const link = $(this).find("link").text()
        let img = ""
        let desc = ""
        let language = ""
        let stars = ""
        let forks = ""

        const bodyStr = $(this).find("description").text()
        const bodyMatchResult = bodyStr.match(DATA_REGEXP)
        if (bodyMatchResult) {
          ;[_, img, desc, language, stars, forks] = bodyMatchResult
        }

        return {
          title: title.trim(),
          link: link.trim(),
          desc: desc.trim(),
          language: language.trim(),
          stars: +stars.trim() || 0,
        }
      })

      return data
    },
  },
})
