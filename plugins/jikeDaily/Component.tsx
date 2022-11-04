import { gql } from "graphql-request"
import useSWR from "swr"

export default function JikeDaily() {
  const { data, error } = useSWR(
    gql`
      {
        jikeDaily {
          title
          items {
            link
            text
          }
        }
      }
    `
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <section>
      <p>{data.jikeDaily.title}</p>
      <ul>
        {data.jikeDaily.items.map((item: any, index: number) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
