import { pick } from "lodash"
import type { NextApiRequest, NextApiResponse } from "next"
import { executeInPage } from "../../utils/headless"

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

  // const result = await fetch("https://rsshub.app/jike/user/wenhao1996", {
  //   // @ts-ignore
  //   agent: getProxyAgent(),
  // }).then((res) => res.text())
  // const $ = load(result, {
  //   xml: {
  //     xmlMode: true,
  //     withStartIndices: true,
  //   },
  // })
  // const title = $("item title").first().text()
  // const htmlStr = $("item description").first().text()
  // let items
  // if (htmlStr) {
  //   const $ = load(htmlStr)
  //   items = $("a")
  //     .map(function () {
  //       const link: any = $(this).attr("href")
  //       const text = $(this).text()
  //       return { link, text }
  //     })
  //     .toArray()
  // }
  // const data = {
  //   title,
  //   items,
  // }
  // console.log("!", $("item title").text())

  const result = await executeInPage("https://xueqiu.com", (page) =>
    page.evaluate(async () => {
      const _result = await fetch(
        `/statuses/livenews/list.json?since_id=-1&max_id=-1&count=20`
      ).then((res) => res.json())
      return _result
    })
  )

  const data =
    result?.items.map((item: any) => pick(item, ["id", "created_at", "target", "text"])) || []

  res.status(200).json({ data })
}
