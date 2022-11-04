import { GraphQLFieldConfig } from "graphql"

type Fields = Record<string, GraphQLFieldConfig<any, any>>

export class Plugin {
  fields: Fields

  constructor(fields: Fields) {
    this.fields = fields
  }
}
