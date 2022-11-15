import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const XueqiuLive: PluginComponent = () => {
  const { data, error } = useSWR(
    gql`
      {
        xueqiuLiveItems {
          created_at
          text
          target
        }
      }
    `
  )

  return (
    <GridItem title="雪球7*24" error={error} loading={!data} className="row-span-2">
      <ul className="list-none">
        {data?.xueqiuLiveItems.map((item: any, index: number) => (
          <li key={index}>
            <a href={item.target} target="_blank" rel="noreferrer">
              <p>{new Date(item.created_at).toLocaleTimeString()}</p>
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </GridItem>
  )
}

XueqiuLive.category = "财经"
XueqiuLive.title = "雪球 Live"

export default XueqiuLive
