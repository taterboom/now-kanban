import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SWRConfig } from "swr"
import { GraphQLClient } from "graphql-request"

const endpoint =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/api/graphql" : "/api/graphql"

const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    Accept: "application/json",
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: (gql, variables) => graphqlClient.request(gql, variables),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}
