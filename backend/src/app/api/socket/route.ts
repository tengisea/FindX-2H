import { NextRequest, NextResponse } from "next/server";
import { socketService } from "@/services/socketService";

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json();

    switch (action) {
      case "send_notification":
        if (data.userId) {
          socketService.sendNotificationToUser(data.userId, data.notification);
        } else if (data.roomName) {
          socketService.sendNotificationToRoom(
            data.roomName,
            data.notification
          );
        } else {
          socketService.broadcastNotification(data.notification);
        }
        break;

      case "send_room_message":
        socketService.sendMessageToRoom(data.roomName, data.message, data.data);
        break;

      case "get_stats":
        return NextResponse.json({
          connectedUsers: socketService.getConnectedUsersCount(),
          usersInRoom: data.roomName
            ? socketService.getUsersInRoom(data.roomName)
            : null,
        });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Socket API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "stats") {
      return NextResponse.json({
        connectedUsers: socketService.getConnectedUsersCount(),
        status: "Socket.IO server is running",
      });
    }

    return NextResponse.json({
      status: "Socket.IO server is running",
      endpoints: {
        POST: "/api/socket - Send notifications and messages",
        GET: "/api/socket?action=stats - Get server statistics",
      },
    });
  } catch (error) {
    console.error("Socket API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

