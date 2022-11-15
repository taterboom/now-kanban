import Grid from "../components/Grid"
import components from "../plugins/components"

export default function Index() {
  return (
    <Grid>
      {components.map((Component, index) => (
        <Component key={index} />
      ))}
    </Grid>
  )
}
