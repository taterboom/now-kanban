import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const JikeDaily: PluginComponent = () => {
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
        <ol>
          {data.jikeDaily.items.map((item: any, index: number) => (
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

JikeDaily.category = "综合新闻"
JikeDaily.title = "即刻一觉醒来"

export default JikeDaily
