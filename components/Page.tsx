export type PageProps = React.PropsWithChildren<{
  title: string
}>

function Page(props: PageProps) {
  return <>{props.children}</>
}

export default Page
