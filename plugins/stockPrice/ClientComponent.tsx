import { gql } from "graphql-request"
import useSWR from "swr"
import GridItem from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"
import { useLocalStorageState } from "../../components/hooks/useLocalStorage"
import { Settings } from "../../components/Settings"

const StockPrice = () => {
  const [codes, setCodes] = useLocalStorageState("stockPrice", ["sh000001"])
  const { data, error } = useSWR([
    gql`
      query stockPrice($codes: [String]) {
        stockPrice(codes: $codes) {
          code
          name
          price
          open
          high
          low
        }
      }
    `,
    { codes },
  ])

  return (
    <GridItem error={error} loading={!data}>
      <Settings>
        <input
          className="input min-w-[256px]"
          type="text"
          defaultValue={codes.join(",")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.currentTarget.value
              setCodes(value.split(","))
            }
          }}
        />
      </Settings>
      {!!data && (
        <table className="table table-compact">
          <thead>
            <tr>
              <th>code</th>
              <th>name</th>
              <th>price</th>
              <th>open</th>
              <th>high</th>
              <th>low</th>
            </tr>
          </thead>
          <tbody>
            {data.stockPrice.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.open}</td>
                <td>{item.high}</td>
                <td>{item.low}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </GridItem>
  )
}

export default StockPrice
