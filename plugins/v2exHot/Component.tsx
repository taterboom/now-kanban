import { gql } from "graphql-request"
import useSWR from "swr"

export default function V2exHot() {
  const { data, error } = useSWR(
    gql`
      {
        v2exHotItems {
          link
          text
        }
      }
    `
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <ul>
      {data.v2exHotItems.map((item: any, index: number) => (
        <li key={index}>
          <a href={`https://v2ex.com${item.link}`} target="_blank" rel="noreferrer">
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
