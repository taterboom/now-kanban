import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"

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

  return (
    <GridItem title="V2EX热议" error={error} loading={!data}>
      {!!data && (
        <ul>
          {data.v2exHotItems.map((item: any, index: number) => (
            <li key={index}>
              <a href={`https://v2ex.com${item.link}`} target="_blank" rel="noreferrer">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </GridItem>
  )
}
