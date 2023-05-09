import dynamic from "next/dynamic"
import { PluginComponent } from "../PluginComponent"

const StockPrice: PluginComponent = dynamic(() => import("./ClientComponent"), { ssr: false })

StockPrice.category = "行情"
StockPrice.title = "A股"
StockPrice.priority = 1

export default StockPrice
