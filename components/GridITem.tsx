import React, { useMemo } from "react"

export function GridItemLoading() {
  return <div>Loading...</div>
}

export function GridItemError() {
  return <div>Failed to load.</div>
}

type GridItemProps = React.PropsWithChildren<{
  title?: string
  error?: any
  loading?: boolean
  className?: string
  ignoreDefaultRendering?: boolean
}>

function GridItem(props: GridItemProps) {
  const className = useMemo(() => `p-1 ${props.className || ""}`, [props.className])

  return (
    <section className={className}>
      {(() => {
        if (props.ignoreDefaultRendering) return props.children
        if (props.error) return <GridItemError />
        if (props.loading) return <GridItemLoading />
        return props.children
      })()}
    </section>
  )
}

export default GridItem
