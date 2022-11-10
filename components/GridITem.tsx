import React, { useMemo } from "react"

export function GridItemLoading() {
  return <div>Loading...</div>
}

export function GridItemError() {
  return <div>Failed to load.</div>
}

type GridItemProps = React.PropsWithChildren<{
  title: string
  error?: any
  loading?: boolean
  className?: string
  ignoreDefaultRendering?: boolean
}>

function GridItem(props: GridItemProps) {
  const className = useMemo(
    () => `py-1 px-2 ring overflow-y-auto ${props.className || ""}`,
    [props.className]
  )

  return (
    <section className={className}>
      {(() => {
        const content = (
          <>
            <h2 className="sticky top-0">{props.title}</h2>
            <div>{props.children}</div>
          </>
        )
        if (props.ignoreDefaultRendering) return content
        if (props.error) return <GridItemError />
        if (props.loading) return <GridItemLoading />
        return content
      })()}
    </section>
  )
}

export default GridItem
