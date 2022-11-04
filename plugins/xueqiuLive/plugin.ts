import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { GraphQLBigInt } from "graphql-scalars"
import { pick } from "lodash"
import { executeInPage } from "../../utils/headless"
import { Plugin } from "../Plugin"

const GraphQLWXueqiuLiveItem = new GraphQLObjectType({
  name: "XueqiuLiveItem",
  fields: {
    created_at: { type: GraphQLBigInt },
    id: { type: GraphQLInt },
    target: { type: GraphQLString },
    text: { type: GraphQLString },
  },
})

export default new Plugin({
  xueqiuLiveItems: {
    type: new GraphQLList(GraphQLWXueqiuLiveItem),
    resolve: async () => {
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
      return data
    },
  },
})
