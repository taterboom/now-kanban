import { GraphQLObjectType, GraphQLString } from "graphql"

export const GraphQLReadableLink = new GraphQLObjectType({
  name: "ReadableLink",
  fields: {
    link: { type: GraphQLString },
    text: { type: GraphQLString },
  },
})
