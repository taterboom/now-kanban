import { gql } from "graphql-request"
import useSWR from "swr"

export default function XueqiuLive() {
  const { data, error } = useSWR(
    gql`
      {
        xueqiuLiveItems {
          created_at
          text
          target
        }
      }
    `
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <ul>
      {data.xueqiuLiveItems.map((item: any, index: number) => (
        <li key={index}>
          <a href={item.target} target="_blank" rel="noreferrer">
            <p>{new Date(item.created_at).toLocaleTimeString()}</p>
            <span>{item.text}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
