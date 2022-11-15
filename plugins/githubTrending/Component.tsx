import { gql } from "graphql-request"
import React, { useState, FunctionComponent } from "react"
import useSWR from "swr"
import GridItem, { GridItemError, GridItemLoading } from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const SINCES = ["daily", "weekly", "monthly"]
const LANGUAGES = ["any", "javascript", "typescript"]
const SPOKEN_LANGUAGES = ["any", "zh"]

const GithubTrending: PluginComponent = () => {
  const [since, setSince] = useState(SINCES[0])
  const [language, setLanguage] = useState(LANGUAGES[0])
  const [spokenLanguage, setSpokenLanguage] = useState(SPOKEN_LANGUAGES[0])
  const { data, error } = useSWR([
    gql`
      query githubTrendingItems($since: String, $language: String, $spoken_language: String) {
        githubTrendingItems(since: $since, language: $language, spoken_language: $spoken_language) {
          title
          link
          author
          img
          desc
          language
          stars
          forks
        }
      }
    `,
    {
      since,
      language,
      spoken_language: spokenLanguage,
    },
  ])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <GridItem
      className="h-full flex flex-col"
      title="Github Trending"
      error={error}
      loading={!data}
      ignoreDefaultRendering
    >
      <div className="flex gap-2">
        <select
          className="select select-bordered select-xs"
          value={since}
          onChange={(e) => setSince(e.target.value)}
        >
          {SINCES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered select-xs"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {LANGUAGES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered select-xs"
          value={spokenLanguage}
          onChange={(e) => setSpokenLanguage(e.target.value)}
        >
          {SPOKEN_LANGUAGES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <GridItemError />
      ) : !data ? (
        <GridItemLoading />
      ) : (
        <ol className="mt-1 flex-1 overflow-y-auto">
          {data?.githubTrendingItems.map((item: any, index: number) => (
            <li key={index}>
              {/* <a href={`https://v2ex.com${item.link}`} target="_blank" rel="noreferrer">
            {item.text}
          </a> */}
              {item.title}
            </li>
          ))}
        </ol>
      )}
    </GridItem>
  )
}

GithubTrending.category = "产品"
GithubTrending.title = "Github Trending"

export default GithubTrending
