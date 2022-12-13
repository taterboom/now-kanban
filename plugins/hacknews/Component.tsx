import { gql } from "graphql-request"
import { useState } from "react"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const TYPES = [
  ["news", ""],
  ["show", "show"],
  ["ask", "ask"],
]

const Hacknews: PluginComponent = () => {
  const [type, setType] = useState(TYPES[0][1])
  const { data, error } = useSWR([
    gql`
      query ($type: String) {
        hacknewsItems(type: $type) {
          link
          text
        }
      }
    `,
    {
      type,
    },
  ])

  return (
    <GridItem className="common-wrapper" title="HACKNEWS" error={error} loading={!data}>
      <div className="common-header">
        <select className="common-select" value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((item) => (
            <option key={item[1]} value={item[1]}>
              {item[0]}
            </option>
          ))}
        </select>
      </div>
      {!!data && (
        <ol className="common-body">
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
