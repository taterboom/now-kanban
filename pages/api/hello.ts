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

  // const result = await fetch("https://www.eastmoney.com/", {
  //   agent: getProxyAgent(),
  // }).then((res) => res.text())
  // const $ = load(result)
  // const blocks = $(".hq-news .hq-news-con")
  // const data = blocks
  //   .map(function () {
  //     return $(this)
  //       .find(".hq-news-con-b .hq-news-data")
  //       .map(function () {
  //         const values = $(this)
  //           .children()
  //           .map(function () {
  //             return $(this).text()
  //           })
  //           .toArray()
  //         const link = $(this).find(".nickname a").first().attr("href")
  //         return {
  //           link,
  //           values: values.slice(0, 3),
  //         }
  //       })
  //       .toArray()
  //   })
  //   .toArray()
  // console.log("!", data)

  // const result = await executeInPage("https://www.eastmoney.com/", async (page) => {
  //   await page.waitForSelector(".explore")
  //   console.log("ok")
  //   const data = await page.evaluate(() => {
  //     const sections = document.querySelectorAll(".explore__category")
  //     const sectionsData = []
  //     for (const section of sections) {
  //       const title = section.querySelector(".explore__category-title")?.textContent
  //       const sectionData = {
  //         title,
  //         items: [] as any[],
  //       }
  //       sectionsData.push(sectionData)
  //       const items = section.querySelectorAll(".explore__category-item")
  //       for (const item of items) {
  //         const itemTitle = item.querySelector(".category-item__title")?.textContent
  //         const itemLink = item.getAttribute("href")
  //         sectionData.items.push({
  //           title: itemTitle,
  //           link: itemLink,
  //         })
  //       }
  //     }
  //     return sectionsData
  //   })
  //   return data
  // })
  const tab = "month"
  const result = await fetch(`https://stackoverflow.com/?tab=${tab}`, {
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const $ = load(result)
  const data = $("[id^=question-summary]")
    .map(function () {
      const [votes, answers, views] = $(this)
        .find(
          ".s-post-summary--stats .s-post-summary--stats-item .s-post-summary--stats-item-number"
        )
        .map(function () {
          return +$(this).text() || 0
        })
        .toArray()

      const titleEl = $(this).find(".s-post-summary--content-title a").first()
      const title = titleEl.text()
      const link = titleEl.attr("href") || ""

      const tags = $(this)
        .find(".js-post-tag-list-item")
        .map(function () {
          return $(this).text()
        })
        .toArray()

      return {
        title: title.trim(),
        link: link.trim(),
        views,
        answers,
        votes,
        tags,
      }
    })
    .toArray()

  res.status(200).json({ data: data })
}
