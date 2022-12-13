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
          desc
          language
          stars
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
      className="common-wrapper"
      title="Github Trending"
      error={error}
      loading={!data}
      ignoreDefaultRendering
    >
      <div className="commmon-header">
        <select className="common-select" value={since} onChange={(e) => setSince(e.target.value)}>
          {SINCES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="common-select"
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
          className="common-select"
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
        <ol className="common-body">
          {data?.githubTrendingItems.map((item: any, index: number) => (
            <li key={index} className="my-2">
              <div className="inline-block align-top max-w-[calc(100%_-_2rem)]">
                <p className="font-semibold">
                  <a href={item.link}>{item.title}</a>
                </p>
                <p className="text-sm">{item.desc}</p>
                <p className="text-xs opacity-70">
                  <span>{item.language}</span> | <span>★ {item.stars}</span>
                </p>
              </div>
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
