import { gql } from "graphql-request"
import { useState } from "react"
import useSWR from "swr"

const SINCES = ["daily", "weekly", "monthly"]
const LANGUAGES = ["any", "javascript", "typescript"]
const SPOKEN_LANGUAGES = ["any", "zh"]

export default function GithubTrending() {
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
    <div>
      <select value={since} onChange={(e) => setSince(e.target.value)}>
        {SINCES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        {LANGUAGES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select value={spokenLanguage} onChange={(e) => setSpokenLanguage(e.target.value)}>
        {SPOKEN_LANGUAGES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <ul>
        {data.githubTrendingItems.map((item: any, index: number) => (
          <li key={index}>
            {/* <a href={`https://v2ex.com${item.link}`} target="_blank" rel="noreferrer">
            {item.text}
          </a> */}
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
