import Module from "../components/Module"
import Page from "../components/Page"
import Wrapper from "../components/Wrapper"
import components from "../plugins/components"
import { PluginComponent } from "../plugins/PluginComponent"

const modules = components.reduce<Record<string, PluginComponent[]>>((data, component) => {
  if (data[component.category]) {
    const insertIndex = data[component.category].findIndex(
      (item) => (component.priority || 0) > (item.priority || 0)
    )
    if (insertIndex > -1) {
      data[component.category].splice(insertIndex, 0, component)
    } else {
      data[component.category].push(component)
    }
  } else {
    data[component.category] = [component]
  }
  return data
}, {})

export default function Index() {
  return (
    <Wrapper>
      {Object.entries(modules).map(([moduleTitle, pages]) => (
        <Module key={moduleTitle} title={moduleTitle}>
          {pages.map((PageItem) => (
            <Page key={PageItem.title} title={PageItem.title}>
              <PageItem />
            </Page>
          ))}
        </Module>
      ))}
    </Wrapper>
  )
}
