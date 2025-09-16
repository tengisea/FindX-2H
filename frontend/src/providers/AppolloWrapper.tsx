"use client";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { ReactNode } from "react";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.BACKEND_URL || "http://localhost:8000/api/graphql",
});

export const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        // Authorization: `Bearer ${clerkToken}`,
      },
    };
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
