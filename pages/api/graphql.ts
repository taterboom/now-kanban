import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { createYoga } from "graphql-yoga"
import { Resolver } from "../../plugins/Resolver"
import resolvers from "../../plugins/resolvers"

const createGraphqlQueryType = (plugins: Resolver[]) => {
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
  query: createGraphqlQueryType(resolvers),
})

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
})
