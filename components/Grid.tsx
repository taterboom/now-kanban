type GridProps = React.PropsWithChildren<{}>

function Grid(props: GridProps) {
  return (
    <div className="grid grid-cols-3 auto-rows-[360px] 2xl:auto-rows-[400px]">{props.children}</div>
  )
}

export default Grid
