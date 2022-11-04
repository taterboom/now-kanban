import { load } from "cheerio"
import type { NextApiRequest, NextApiResponse } from "next"
import { getProxyAgent } from "../../utils/proxy"

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log("?")
  // const result = await fetch("https://rsshub.app/jike/user/wenhao1996", {
  //   headers: {
  //     "User-Agent":
  //       "bayAgent/1.1 Android/5.7.3 com.shanbay.words/5.7.3 channel/0 Frontend/4.4 api/2.8 device/mobile Edg/84.0.4147.125",
  //   },
  // }).then((res) => res.text())

  // console.log(await fetch("https://twitter.com").then((res) => res.text()))

  // const agent = httpsOverHttp({
  //   proxy: {
  //     host: "127.0.0.1",
  //     port: 7890,
  //   },
  // })

  const result = await fetch("https://rsshub.app/jike/user/wenhao1996", {
    // @ts-ignore
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const $ = load(result, {
    xml: {
      xmlMode: true,
      withStartIndices: true,
    },
  })
  const title = $("item title").first().text()
  const htmlStr = $("item description").first().text()
  let items
  if (htmlStr) {
    const $ = load(htmlStr)
    items = $("a")
      .map(function () {
        const link: any = $(this).attr("href")
        const text = $(this).text()
        return { link, text }
      })
      .toArray()
  }
  const data = {
    title,
    items,
  }
  console.log("!", $("item title").text())

  res.status(200).json({ data })
}
