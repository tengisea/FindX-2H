"use client";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { ReactNode } from "react";
import { setContext } from "@apollo/client/link/context";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:8000/api/graphql";
console.log("🔧 Apollo Client Backend URL:", backendUrl);

const httpLink = createHttpLink({
  uri: backendUrl,
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
