import { PluginComponent } from "../PluginComponent"

const PolicyDatabase: PluginComponent = () => {
  return (
    <a className="link" href="https://zhengceku.fun/database" target="_blank" rel="noreferrer">
      政策数据库外链
    </a>
  )
}

PolicyDatabase.category = "财经"
PolicyDatabase.title = "政策数据库"

export default PolicyDatabase
