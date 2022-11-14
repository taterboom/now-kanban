import { gql } from "graphql-request"
import { useMemo, useState } from "react"
import useSWR from "swr"
import GridItem, { GridItemError, GridItemLoading } from "../../components/GridITem"

const TIME_TYPES = ["today", "yesterday", "month"]

export default function ProducthuntRank() {
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
    <GridItem title="Producthunt Rank" error={error} loading={!data} ignoreDefaultRendering>
      <div className="sticky top-6">
        <select value={timeType} onChange={(e) => setTimeType(e.target.value)}>
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
        <ul>
          {data?.producthuntRankItems.map((item: any, index: number) => (
            <li key={index}>
              <div className="flex">
                <a href={item.link}>
                  <img src={item.thumbnail} alt="" />
                </a>
                <div>
                  <p>
                    <a href={item.link}>{item.title}</a>
                  </p>
                  <p>{item.desc}</p>
                  <p>
                    <a href={item.categoryLink}>{item.category}</a> | <span>▲ {item.votes}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </GridItem>
  )
}
