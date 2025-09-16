import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET() {
    return NextResponse.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        services: {
            mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
            socketio: "running",
            graphql: "running",
        },
    });
}
