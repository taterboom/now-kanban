import { HttpsProxyAgent } from "https-proxy-agent"

interface RequestInit {
  agent: any
}

export const getProxyAgent = () => {
  if (!process.env.http_proxy) {
    if (process.env.NODE_ENV === "development") {
      console.warn("cannot found http_proxy!!!")
    }
    return undefined
  }
  return new HttpsProxyAgent(process.env.http_proxy)
}
