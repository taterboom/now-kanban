import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"
import dayjs from "dayjs"

const Releases: PluginComponent = () => {
  const { data, error } = useSWR(
    gql`
      {
        releases {
          project
          index
          title
          link
          updated
        }
      }
    `
  )

  return (
    <GridItem title="Releases" error={error} loading={!data}>
      {!!data && (
        <table className="table table-compact">
          <thead>
            <tr>
              <th>project</th>
              <th>latest</th>
              <th>updated</th>
            </tr>
          </thead>
          <tbody>
            {data.releases.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <a href={item.index} target="_blank" rel="noreferrer">
                    {item.project}
                  </a>
                </td>
                <td>
                  <a href={item.link} target="_blank" rel="noreferrer" title={item.title}>
                    {`${item.title.slice(0, 24)}...`}
                  </a>
                </td>
                <td>{dayjs(item.updated).format("MM-DD")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </GridItem>
  )
}

Releases.category = "产品"
Releases.title = "Releases"

export default Releases
