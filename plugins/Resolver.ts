import { GraphQLFieldConfig } from "graphql"

type Fields = Record<string, GraphQLFieldConfig<any, any>>

export class Resolver {
  fields: Fields

  constructor(fields: Fields) {
    this.fields = fields
  }
}
