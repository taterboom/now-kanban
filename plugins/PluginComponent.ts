import { ComponentType } from "react"

export type PluginComponent<P = {}> = ComponentType<P> & {
  category: string
  title: string
  priority?: number
}
