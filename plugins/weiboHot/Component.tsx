import { gql } from "graphql-request"
import useSWR from "swr"

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

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <ul>
      {data.weiboHotItems.map((item: any, index: number) => (
        <li key={index}>
          <img width={24} src={item.pic} alt="" />
          <p>{item.desc}</p>
          <span>{item.desc_extr}</span>
        </li>
      ))}
    </ul>
  )
}
