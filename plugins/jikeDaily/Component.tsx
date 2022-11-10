import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"

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

  return (
    <GridItem title={data?.jikeDaily.title.slice(0, -5)} error={error} loading={!data}>
      {!!data && (
        <ul>
          {data.jikeDaily.items.map((item: any, index: number) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </GridItem>
  )
}
