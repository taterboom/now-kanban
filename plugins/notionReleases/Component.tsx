import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const NotionReleases: PluginComponent = () => {
  const { data, error } = useSWR(
    gql`
      {
        notionReleaseItems {
          info {
            link
            text
          }
          time
        }
      }
    `
  )

  return (
    <GridItem title="Notion Releases" error={error} loading={!data}>
      {!!data && (
        <ol>
          {data.notionReleaseItems.map((item: any, index: number) => (
            <li key={index}>
              <div className="inline-block align-top max-w-[calc(100%_-_2rem)]">
                <div>
                  <a href={`https://notion.so${item.info.link}`} target="_blank" rel="noreferrer">
                    {item.info.text}
                  </a>
                </div>
                <div className="text-xs opacity-70">{item.time}</div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </GridItem>
  )
}

NotionReleases.category = "平台方"
NotionReleases.title = "Notion"
// NotionReleases.priority = 1

export default NotionReleases
