import { HttpsProxyAgent } from "https-proxy-agent"

interface RequestInit {
  agent: any
}

export const getProxyAgent = () => {
  if (!process.env.http_proxy) {
    console.warn("cannot found http_proxy!!!")
    return undefined
  }
  return new HttpsProxyAgent(process.env.http_proxy)
}
