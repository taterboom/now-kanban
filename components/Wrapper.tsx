type WrapperProps = React.PropsWithChildren<{}>

function Wrapper(props: WrapperProps) {
  return (
    <div className="p-6 grid grid-cols-3 gap-6 auto-rows-[20rem] 2xl:auto-rows-[24rem]">
      {props.children}
    </div>
  )
}

export default Wrapper
