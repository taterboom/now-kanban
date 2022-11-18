import { gql } from "graphql-request"
import { useMemo, useState } from "react"
import useSWR from "swr"
import GridItem, { GridItemError, GridItemLoading } from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const TIME_TYPES = ["today", "yesterday", "month"]

const ProducthuntRank: PluginComponent = () => {
  const [timeType, setTimeType] = useState(TIME_TYPES[0])
  const { data, error } = useSWR([
    gql`
      query producthuntRankItems($time: String) {
        producthuntRankItems(time: $time) {
          title
          link
          thumbnail
          desc
          votes
          category
          categoryLink
        }
      }
    `,
    {
      time: timeType,
    },
  ])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <GridItem
      className="h-full flex flex-col"
      title="Producthunt Rank"
      error={error}
      loading={!data}
      ignoreDefaultRendering
    >
      <div className="flex gap-2">
        <select
          className="select select-bordered select-xs"
          value={timeType}
          onChange={(e) => setTimeType(e.target.value)}
        >
          {TIME_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <GridItemError />
      ) : !data ? (
        <GridItemLoading />
      ) : (
        <ol className="mt-1 flex-1 overflow-y-auto list-none">
          {data?.producthuntRankItems.map((item: any, index: number) => (
            <li key={index} className="my-2">
              <div className="flex gap-2">
                <a href={item.link}>
                  <img width={24} src={item.thumbnail} alt="" />
                </a>
                <div>
                  <p className="font-semibold">
                    <a href={`https://www.producthunt.com${item.link}`}>{item.title}</a>
                  </p>
                  <p className="text-sm">{item.desc}</p>
                  <p className="text-xs opacity-70">
                    <a href={item.categoryLink}>{item.category}</a> | <span>▲ {item.votes}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </GridItem>
  )
}

ProducthuntRank.category = "产品"
ProducthuntRank.title = "Producthunt Rank"

export default ProducthuntRank
