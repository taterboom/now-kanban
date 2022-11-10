import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"

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

  return (
    <GridItem title="Oschina 热议" error={error} loading={!data}>
      <ul>
        {data?.oschinaHotItems.map((item: any, index: number) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </GridItem>
  )
}
