import { gql } from "graphql-request"
import React, { useState, FunctionComponent } from "react"
import useSWR from "swr"
import GridItem, { GridItemError, GridItemLoading } from "../../components/GridITem"
import { PluginComponent } from "../PluginComponent"

const TABS = ["hot", "week", "month"]

const StackoverflowHot: PluginComponent = () => {
  const [tab, setTab] = useState(TABS[0])
  const { data, error } = useSWR([
    gql`
      query stackoverflowHotItems($tab: String) {
        stackoverflowHotItems(tab: $tab) {
          title
          link
          tags
          votes
          answers
          views
        }
      }
    `,
    {
      tab,
    },
  ])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <GridItem className="h-full flex flex-col" error={error} loading={!data} ignoreDefaultRendering>
      <div className="flex gap-2">
        <select
          className="select select-bordered select-xs"
          value={tab}
          onChange={(e) => setTab(e.target.value)}
        >
          {TABS.map((item) => (
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
        <ol className="mt-1 flex-1 overflow-y-auto">
          {data?.stackoverflowHotItems.map((item: any, index: number) => (
            <li key={index} className="my-2">
              <div className="inline-block align-top max-w-[calc(100%_-_2rem)]">
                <p className="font-semibold leading-tight">
                  <a href={item.link}>{item.title}</a>
                </p>
                <p className="text-sm mt-0.5">{item.tags.map((tag: any) => `#${tag} `)}</p>
                <p className="text-xs mt-0.5 opacity-70">
                  <span>{item.votes}</span> | <span>{item.answers}</span> |{" "}
                  <span>{item.views}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </GridItem>
  )
}

StackoverflowHot.category = "社区热议"
StackoverflowHot.title = "Stackoverflow"

export default StackoverflowHot
