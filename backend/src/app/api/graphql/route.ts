import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Context, buildContext } from "@/types/context";

// Import all your existing schemas and resolvers
import { typeDefs } from "@/schemas";
import { resolvers } from "@/resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

// --- Apollo Server ---
const apolloServer = new ApolloServer<Context>({
  schema,
  introspection: true,
});

const apolloHandler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req) => buildContext(req as any),
});

export async function GET(req: NextRequest) {
  return apolloHandler(req);
}

export async function POST(req: NextRequest) {
  return apolloHandler(req);
}
