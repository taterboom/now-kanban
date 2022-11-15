import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const Hacknews: PluginComponent = () => {
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
        <ol>
          {data.hacknewsItems.map((item: any, index: number) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </GridItem>
  )
}

Hacknews.category = "社区热议"
Hacknews.title = "HACKNEWS"

export default Hacknews
