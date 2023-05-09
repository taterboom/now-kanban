import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { Resolver } from "../Resolver"
import { getStockData } from "./sina"

/**
  code: string
  name: string
  price: number
  high: number
  low: number
  open: number
 */

const GraphQLStockPrice = new GraphQLObjectType({
  name: "GraphQLStockPrice",
  fields: {
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    high: { type: GraphQLFloat },
    low: { type: GraphQLFloat },
    open: { type: GraphQLFloat },
  },
})

export default new Resolver({
  stockPrice: {
    type: new GraphQLList(GraphQLStockPrice),
    args: {
      codes: {
        type: new GraphQLList(GraphQLString),
      },
    },
    resolve: async (_, { codes }) => {
      return getStockData(codes)
    },
  },
})
