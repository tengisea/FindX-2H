import { typeDefs } from "@/schemas";
import { resolvers } from "@/resolvers";
import { NextRequest } from "next/server";
import { connectDataBase } from "@/database";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
connectDataBase();

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

// export const dynamic = "force-dynamic";

export { handler as GET, handler as POST };
