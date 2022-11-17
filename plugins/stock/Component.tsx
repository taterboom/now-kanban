import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const Stocks: PluginComponent = () => {
  const { data, error } = useSWR(
    gql`
      {
        stocks {
          link
          values
        }
      }
    `
  )

  return (
    <GridItem error={error} loading={!data}>
      {!!data && (
        <table className="table table-compact">
          <tbody>
            {data.stocks.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.values[0]}
                  </a>
                </td>
                <td>{item.values[1]}</td>
                <td>{item.values[2]}</td>
                <td>{item.values[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </GridItem>
  )
}

Stocks.category = "财经"
Stocks.title = "Stocks"
Stocks.priority = 1

export default Stocks
