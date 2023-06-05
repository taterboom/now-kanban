import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { JSDOM } from "jsdom"
import { getProxyAgent } from "../../utils/proxy"
import { Resolver } from "../Resolver"

const ReleaseItem = new GraphQLObjectType({
  name: "ReleaseItem",
  fields: {
    project: {
      type: GraphQLString,
    },
    index: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    updated: {
      type: GraphQLString,
    },
    link: {
      type: GraphQLString,
    },
  },
})

function standardAtomFeed(xmlString: string) {
  const dom = new JSDOM(xmlString, { contentType: "text/xml" })
  const entry = dom.window.document.querySelector("entry")!
  const title = entry.querySelector("title")
  const link = entry.querySelector("link")
  const updated = entry.querySelector("updated")
  return {
    updated: updated?.textContent,
    title: title?.textContent,
    link: link?.getAttribute("href"),
  }
}

async function chromeBlog() {
  const result = await fetch("https://developer.chrome.com/feeds/blog.xml", {
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const firstFeed = standardAtomFeed(result)

  return {
    project: "ChromeBlog",
    index: "https://developer.chrome.com/blog",
    ...firstFeed,
  }
}

async function chromeArticle() {
  const result = await fetch("https://developer.chrome.com/feeds/articles.xml", {
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const firstFeed = standardAtomFeed(result)
  return {
    project: "ChromeArticle",
    index: "https://developer.chrome.com/articles",
    ...firstFeed,
  }
}

async function chromeExtension() {
  const index = `https://developer.chrome.com/docs/extensions/whatsnew/`
  const result = await fetch(index, {
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const dom = new JSDOM(result, { url: index })
  const contentBody = dom.window.document.querySelector(".center-images")!
  const title = contentBody.querySelector("h3") as HTMLElement
  const link = contentBody.querySelector("h3 a") as HTMLAnchorElement
  const time = contentBody.querySelector("h3 + p > time") as HTMLTimeElement
  return {
    project: "ChromeExtension",
    index,
    title: title?.textContent?.slice(2),
    link: link?.href,
    updated: time?.textContent,
  }
}

async function notionRelease() {
  const result = await fetch("https://www.notion.so/releases", {
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const dom = new JSDOM(result)
  const artile = dom.window.document.querySelector("article.release")!
  const updated = artile.querySelector("time") as any
  const anchor = artile.querySelector("h2 a") as any
  return {
    project: "Notion",
    index: "https://www.notion.so/releases",
    updated: updated.textContent,
    title: anchor.textContent,
    link: anchor.href,
  }
}

async function notionDeveloper() {
  const result = await fetch("https://developers.notion.com/page/changelog", {
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const dom = new JSDOM(result)
  const firstChangelogHeading = dom.window.document.querySelector(".markdown-body h2")!.textContent
  const text = firstChangelogHeading?.split(" - ")[0]
  return {
    project: "NotionDeveloper",
    index: "https://developers.notion.com/page/changelog",
    updated: text,
    title: text,
    link: "https://developers.notion.com/page/changelog",
  }
}

async function vercel() {
  const result = await fetch("https://vercel.com/atom", {
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const firstFeed = standardAtomFeed(result)

  return {
    project: "Vercel",
    index: "https://vercel.com/blog",
    ...firstFeed,
  }
}

export default new Resolver({
  releases: {
    type: new GraphQLList(ReleaseItem),
    resolve: async () => {
      return Promise.all([
        chromeBlog(),
        chromeArticle(),
        chromeExtension(),
        notionRelease(),
        notionDeveloper(),
        vercel(),
      ])
    },
  },
})
