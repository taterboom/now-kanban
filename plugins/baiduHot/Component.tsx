import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const BaiduHot: PluginComponent = () => {
  const { data, error } = useSWR(
    gql`
      {
        baiduHotItems {
          link
          text
        }
      }
    `
  )

  return (
    <GridItem error={error} loading={!data}>
      {!!data && (
        <ol>
          {data.baiduHotItems.map((item: any, index: number) => (
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

BaiduHot.category = "综合新闻"
BaiduHot.title = "百度热搜"
BaiduHot.priority = 0.1

export default BaiduHot
