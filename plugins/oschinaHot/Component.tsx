import { gql } from "graphql-request"
import useSWR from "swr"

export default function OschinaHot() {
  const { data, error } = useSWR(
    gql`
      {
        oschinaHotItems {
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
      {data.oschinaHotItems.map((item: any, index: number) => (
        <li key={index}>
          <a href={item.link} target="_blank" rel="noreferrer">
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
