import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { createYoga } from "graphql-yoga"
import { Plugin } from "../../plugins/Plugin"

import githubTrending from "../../plugins/githubTrending/plugin"
import jikeDaily from "../../plugins/jikeDaily/plugin"
import oschinaHot from "../../plugins/oschinaHot/plugin"
import v2exHot from "../../plugins/v2exHot/plugin"
import weibohot from "../../plugins/weiboHot/plugin"
import xueqiuLive from "../../plugins/xueqiuLive/plugin"

const createGraphqlQueryType = (plugins: Plugin[]) => {
  return new GraphQLObjectType({
    name: "Query",
    fields: plugins.reduce(
      (acc, plugin) => ({
        ...acc,
        ...plugin.fields,
      }),
      {}
    ),
  })
}

const schema = new GraphQLSchema({
  query: createGraphqlQueryType([
    jikeDaily,
    weibohot,
    xueqiuLive,
    v2exHot,
    githubTrending,
    oschinaHot,
  ]),
})

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
})
