import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";
export async function POST(req) {
    try {
        const { userId, room } = await req.json();
        if (!userId || !room) {
            return NextResponse.json({
                error: "Bad Request: 'userId' and 'room' parameters are required.",
            }, { status: 400 });
        }
        const apiKey = process.env.LIVEKIT_API_KEY;
        const apiSecret = process.env.LIVEKIT_API_SECRET;
        if (!apiKey || !apiSecret) {
            console.error("FATAL: LiveKit API credentials are not found in .env file.");
            return NextResponse.json({
                error: "Server Configuration Error: LiveKit credentials not set.",
            }, { status: 500 });
        }
        const at = new AccessToken(apiKey, apiSecret, {
            identity: userId,
            name: userId,
        });
        at.addGrant({
            roomJoin: true,
            room,
            canPublish: true,
            canSubscribe: true,
        });
        const token = await at.toJwt();
        return NextResponse.json({ token });
    }
    catch (error) {
        console.error("UNEXPECTED ERROR in /api/livekit-token:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
