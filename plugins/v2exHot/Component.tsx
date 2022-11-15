import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const V2exHot: PluginComponent = () => {
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
        <ol>
          {data.v2exHotItems.map((item: any, index: number) => (
            <li key={index}>
              <a href={`https://v2ex.com${item.link}`} target="_blank" rel="noreferrer">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </GridItem>
  )
}

V2exHot.category = "社区热议"
V2exHot.title = "V2ex Hot"

export default V2exHot
