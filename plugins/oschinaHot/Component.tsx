import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const OschinaHot: PluginComponent = () => {
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
      <ol>
        {data?.oschinaHotItems.map((item: any, index: number) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </GridItem>
  )
}

OschinaHot.category = "社区热议"
OschinaHot.title = "Oschina Hot"

export default OschinaHot
