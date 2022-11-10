import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"

export default function WeiboHot() {
  const { data, error } = useSWR(
    gql`
      {
        weiboHotItems {
          desc
          pic
          desc_extr
        }
      }
    `
  )

  return (
    <GridItem title="微博热搜" error={error} loading={!data}>
      {!!data && (
        <ul>
          {data.weiboHotItems.map((item: any, index: number) => (
            <li key={index}>
              <img width={24} src={item.pic} alt="" />
              <p>{item.desc}</p>
              <span>{item.desc_extr}</span>
            </li>
          ))}
        </ul>
      )}
    </GridItem>
  )
}
