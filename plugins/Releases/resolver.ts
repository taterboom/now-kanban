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

async function chromeBlog() {
  const result = await fetch("https://developer.chrome.com/feeds/blog.xml", {
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const dom = new JSDOM(result, { contentType: "text/xml" })
  const entry = dom.window.document.querySelector("entry")!
  const title = entry.querySelector("title")
  const link = entry.querySelector("link")
  const updated = entry.querySelector("updated")
  return {
    project: "ChromeBlog",
    index: "https://developer.chrome.com/blog",
    updated: updated?.textContent,
    title: title?.textContent,
    link: link?.getAttribute("href"),
  }
}

async function chromeArticle() {
  const result = await fetch("https://developer.chrome.com/feeds/articles.xml", {
    agent: getProxyAgent(),
  }).then((res) => res.text())
  const dom = new JSDOM(result, { contentType: "text/xml" })
  const entry = dom.window.document.querySelector("entry")!
  const title = entry.querySelector("title")
  const link = entry.querySelector("link")
  const updated = entry.querySelector("updated")
  return {
    project: "ChromeArticle",
    index: "https://developer.chrome.com/articles",
    updated: updated?.textContent,
    title: title?.textContent,
    link: link?.getAttribute("href"),
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
    project: "notion",
    index: "https://www.notion.so/releases",
    updated: updated.textContent,
    title: anchor.textContent,
    link: anchor.href,
  }
}

export default new Resolver({
  releases: {
    type: new GraphQLList(ReleaseItem),
    resolve: async () => {
      return Promise.all([chromeBlog(), chromeArticle(), notionRelease()])
    },
  },
})
