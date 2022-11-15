type GridProps = React.PropsWithChildren<{}>

function Grid(props: GridProps) {
  return (
    <div className="grid grid-cols-3 auto-rows-[12rem] 2xl:auto-rows-[16rem]">{props.children}</div>
  )
}

export default Grid
