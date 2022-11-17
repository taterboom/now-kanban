import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const WeiboHot: PluginComponent = () => {
  const { data, error } = useSWR(
    gql`
      {
        weiboHotItems {
          desc
          pic
          desc_extr
          scheme
        }
      }
    `
  )

  return (
    <GridItem title="微博热搜" error={error} loading={!data}>
      {!!data && (
        <ul className="list-none">
          {data.weiboHotItems.map((item: any, index: number) => (
            <li key={index} className="flex gap-1 items-center">
              <img width={24} src={item.pic} alt="" />
              <a href={item.scheme} target="_blank" rel="noreferrer">
                {item.desc}
              </a>
              <span className="text-xs opacity-60">{item.desc_extr}</span>
            </li>
          ))}
        </ul>
      )}
    </GridItem>
  )
}

WeiboHot.category = "综合新闻"
WeiboHot.title = "Weibo热搜"
WeiboHot.priority = 1

export default WeiboHot
