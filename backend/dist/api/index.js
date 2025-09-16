import "dotenv/config";
import { typeDefs } from "../src/schemas";
import { resolvers } from "../src/resolvers";
import { connectDataBase } from "../src/database";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
// Connect to database
connectDataBase();
const server = new ApolloServer({
    resolvers,
    typeDefs,
});
const handler = startServerAndCreateNextHandler(server, {
    context: async (req) => ({ req }),
});
export { handler as GET, handler as POST };
