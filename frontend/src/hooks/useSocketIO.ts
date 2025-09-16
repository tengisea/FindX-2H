import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface SocketIOEvent {
  type: string;
  data?: any;
  timestamp?: string;
}

interface UseSocketIOReturn {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (event: string, data?: any) => void;
  lastEvent: SocketIOEvent | null;
  error: string | null;
  joinRoom: (roomName: string) => void;
  leaveRoom: () => void;
  sendRoomMessage: (roomName: string, message: string, data?: any) => void;
  sendDirectMessage: (
    targetUserId: string,
    message: string,
    data?: any
  ) => void;
  sendNotification: (notification: any) => void;
}

export const useSocketIO = (
  serverUrl: string,
  userId: string,
  username?: string
): UseSocketIOReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<SocketIOEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    try {
      const newSocket = io(serverUrl, {
        path: "/socket.io/",
        transports: ["websocket", "polling"],
        autoConnect: true,
      });

      // Connection events
      newSocket.on("connect", () => {
        console.log("Socket.IO connected:", newSocket.id);
        setIsConnected(true);
        setError(null);

        // Authenticate user
        newSocket.emit("authenticate", {
          userId,
          username,
        });
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket.IO disconnected:", reason);
        setIsConnected(false);

        // Attempt to reconnect after 3 seconds
        if (reason !== "io client disconnect") {
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 3000);
        }
      });

      newSocket.on("connect_error", (err) => {
        console.error("Socket.IO connection error:", err);
        setError("Socket.IO connection error");
      });

      // Authentication events
      newSocket.on("authenticated", (data) => {
        console.log("Socket.IO authenticated:", data);
        setLastEvent({
          type: "authenticated",
          data,
          timestamp: new Date().toISOString(),
        });
      });

      // Room events
      newSocket.on("room_joined", (data) => {
        console.log("Joined room:", data);
        setLastEvent({
          type: "room_joined",
          data,
          timestamp: new Date().toISOString(),
        });
      });

      newSocket.on("room_left", (data) => {
        console.log("Left room:", data);
        setLastEvent({
          type: "room_left",
          data,
          timestamp: new Date().toISOString(),
        });
      });

      newSocket.on("user_joined", (data) => {
        console.log("User joined room:", data);
        setLastEvent({
          type: "user_joined",
          data,
          timestamp: new Date().toISOString(),
        });
      });

      newSocket.on("user_left", (data) => {
        console.log("User left room:", data);
        setLastEvent({
          type: "user_left",
          data,
          timestamp: new Date().toISOString(),
        });
      });

      // Message events
      newSocket.on("room_message", (data) => {
        console.log("Room message:", data);
        setLastEvent({
          type: "room_message",
          data,
          timestamp: new Date().toISOString(),
        });
      });

      newSocket.on("direct_message", (data) => {
        console.log("Direct message:", data);
        setLastEvent({
          type: "direct_message",
          data,
          timestamp: new Date().toISOString(),
        });
      });

      // Notification events
      newSocket.on("notification", (data) => {
        console.log("Notification received:", data);
        setLastEvent({
          type: "notification",
          data,
          timestamp: new Date().toISOString(),
        });
      });

      // Ping/pong events
      newSocket.on("pong", (data) => {
        setLastEvent({
          type: "pong",
          data,
          timestamp: new Date().toISOString(),
        });
      });

      setSocket(newSocket);
    } catch (err) {
      console.error("Failed to create Socket.IO connection:", err);
      setError("Failed to create Socket.IO connection");
    }
  }, [serverUrl, userId, username]);

  const sendMessage = useCallback(
    (event: string, data?: any) => {
      if (socket && socket.connected) {
        socket.emit(event, data);
      } else {
        console.warn("Socket.IO is not connected");
      }
    },
    [socket]
  );

  const joinRoom = useCallback(
    (roomName: string) => {
      sendMessage("join_room", { roomName });
    },
    [sendMessage]
  );

  const leaveRoom = useCallback(() => {
    sendMessage("leave_room");
  }, [sendMessage]);

  const sendRoomMessage = useCallback(
    (roomName: string, message: string, data?: any) => {
      sendMessage("room_message", { roomName, message, data });
    },
    [sendMessage]
  );

  const sendDirectMessage = useCallback(
    (targetUserId: string, message: string, data?: any) => {
      sendMessage("direct_message", { targetUserId, message, data });
    },
    [sendMessage]
  );

  const sendNotification = useCallback(
    (notification: any) => {
      sendMessage("send_notification", notification);
    },
    [sendMessage]
  );

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        socket.disconnect();
      }
    };
  }, [connect]);

  return {
    socket,
    isConnected,
    sendMessage,
    lastEvent,
    error,
    joinRoom,
    leaveRoom,
    sendRoomMessage,
    sendDirectMessage,
    sendNotification,
  };
};

