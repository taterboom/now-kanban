import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const IndiehackerExplore: PluginComponent = () => {
  const { data, error } = useSWR(
    gql`
      {
        indiehackerExploreItems {
          title
          items {
            text
            link
          }
        }
      }
    `
  )

  return (
    <GridItem title="Indiehacker Explore" error={error} loading={!data} className="row-span-2">
      <ul className="list-none py-1 divide-y divide-base-300/20">
        {data?.indiehackerExploreItems.map((section: any, index: number) => (
          <li key={index}>
            <div>
              <p className="font-semibold">{section.title}</p>
              <ol>
                {section.items.map((item: any, index: number) => (
                  <li key={index}>
                    <a
                      href={`https://www.indiehackers.com${item.link}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ul>
    </GridItem>
  )
}

IndiehackerExplore.category = "产品"
IndiehackerExplore.title = "Indiehacker Explore"

export default IndiehackerExplore
