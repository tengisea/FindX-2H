import { typeDefs } from "@/schemas";
import { resolvers } from "@/resolvers";
import { NextResponse } from "next/server";
import { connectDataBase } from "@/database";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
connectDataBase();
const server = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: true,
});
const handler = startServerAndCreateNextHandler(server, {
    context: async (req) => ({ req }),
});
// Handle CORS preflight requests
export async function OPTIONS(request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}
export const dynamic = "force-dynamic";
export async function GET(request) {
    return handler(request);
}
export async function POST(request) {
    return handler(request);
}
