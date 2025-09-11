import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "@/resolvers";
import { typeDefs } from "@/schemas";
import { NextRequest } from "next/server";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

// export const dynamic = "force-dynamic";

export { handler as GET, handler as POST };
