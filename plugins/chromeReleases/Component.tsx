import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const ChromeReleases: PluginComponent = () => {
  const { data, error } = useSWR(
    gql`
      {
        chromeReleaseItems {
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
    <GridItem title="Chrome Releases" error={error} loading={!data}>
      {!!data && (
        <ol>
          {data.chromeReleaseItems.map((item: any, index: number) => (
            <li key={index}>
              <div className="inline-block align-top max-w-[calc(100%_-_2rem)]">
                <div>
                  <a
                    href={`https://developer.chrome.com${item.info.link}`}
                    target="_blank"
                    rel="noreferrer"
                  >
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

ChromeReleases.category = "平台方"
ChromeReleases.title = "Chrome"
ChromeReleases.priority = 1

export default ChromeReleases
