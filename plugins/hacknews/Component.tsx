import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"

function Component() {
  const { data, error } = useSWR(
    gql`
      {
        hacknewsItems {
          link
          text
        }
      }
    `
  )

  return (
    <GridItem title="HACKNEWS" error={error} loading={!data}>
      {!!data && (
        <ul>
          {data.hacknewsItems.map((item: any, index: number) => (
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

export default Component
