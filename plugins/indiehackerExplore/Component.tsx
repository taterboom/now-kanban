import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"

export default function IndiehackerExplore() {
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
      <ul>
        {data?.indiehackerExploreItems.map((section: any, index: number) => (
          <li key={index}>
            <div>
              <p>{section.title}</p>
              <ul>
                {section.items.map((item: any, index: number) => (
                  <li key={index}>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </GridItem>
  )
}
