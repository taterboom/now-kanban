import React, { useState } from "react"
import { PageProps } from "./Page"

type ModuleProps = {
  title: string
  children: React.ReactElement<PageProps>[]
}

function Module(props: ModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const validChildren = React.Children.map(props.children, (child) => {
    if (!React.isValidElement(child)) return
    return child
  })!.filter(Boolean)

  return (
    <section className="flex flex-col">
      <h2 className="p-2 font-semibold text-lg">{props.title}</h2>
      <div className="flex-1 flex flex-col p-2 border border-base-300/70 rounded-lg overflow-hidden backdrop-blur bg-base-200/30">
        <div className="tabs px-2 py-1 border border-base-300 rounded bg-base-300/30">
          {validChildren.map((child, index) => (
            <button
              key={child.props.title}
              className={"tab tab-sm" + (index === currentIndex ? " tab-active" : "")}
              onClick={() => {
                setCurrentIndex(index)
              }}
            >
              {child.props.title}
            </button>
          ))}
        </div>
        <div className="mt-2 px-2 py-1 border border-base-300 rounded bg-base-300/30 flex-1 overflow-y-auto">
          {validChildren[currentIndex]}
        </div>
      </div>
    </section>
  )
}

export default Module
