import "dotenv/config";
import { createServer } from "http";
import mongoose from "mongoose";
import next from "next";

import { Server as SocketIOServer, Socket } from "socket.io";

// --- Next.js setup ---
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT || "8000", 10);

// --- Socket.IO types ---
interface Notification {
  title: string;
  message: string;
  [key: string]: any;
}

interface VideoOfferData {
  to: string;
  sdp: any;
}

interface VideoAnswerData {
  to: string;
  sdp: any;
}

interface IceCandidateData {
  to: string;
  candidate: any;
}

interface SocketWithUser extends Socket {
  studentId?: string;
  organizerId?: string;
}

async function startServer() {
  // 1️⃣ MongoDB connect
  await mongoose.connect(process.env.FindX_MONGODB_URL ?? "");
  console.log("✅ MongoDB Connected");

  // 2️⃣ Next.js prepare
  await app.prepare();

  // 3️⃣ HTTP + Socket.IO
  const httpServer = createServer();
  const io = new SocketIOServer(httpServer, {
    path: "/socket.io",
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // 4️⃣ Request routing (Next.js handles all requests including API routes)
  httpServer.on("request", (req, res) => {
    return handle(req, res);
  });

  // 5️⃣ Socket.IO connection
  io.on("connection", (socket: SocketWithUser & { handshake: any }) => {
    const { studentId, organizerId } = socket.handshake.auth;
    socket.studentId = studentId;
    socket.organizerId = organizerId;

    console.log(
      `⚡ User connected: student=${studentId}, organizer=${organizerId}`
    );

    // --- Room join / leave ---
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
      console.log(`${studentId || organizerId} joined room ${roomId}`);
    });

    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);
      console.log(`${studentId || organizerId} left room ${roomId}`);
    });

    // --- Notification ---
    socket.on("send_notification", (notification: Notification) => {
      io.emit("notification", {
        ...notification,
        senderId: studentId || organizerId,
        timestamp: new Date().toISOString(),
      });
    });

    // --- Video call events ---
    socket.on("video-offer", (data: VideoOfferData) => {
      io.to(data.to).emit("video-offer", {
        from: studentId || organizerId,
        sdp: data.sdp,
      });
    });

    socket.on("video-answer", (data: VideoAnswerData) => {
      io.to(data.to).emit("video-answer", {
        from: studentId || organizerId,
        sdp: data.sdp,
      });
    });

    socket.on("ice-candidate", (data: IceCandidateData) => {
      io.to(data.to).emit("ice-candidate", {
        from: studentId || organizerId,
        candidate: data.candidate,
      });
    });

    socket.on("disconnect", () => {
      console.log(
        `❌ User disconnected: student=${studentId}, organizer=${organizerId}`
      );
    });
  });

  // 6️⃣ Start server
  httpServer.listen(port, () => {
    console.log("======================================================");
    console.log(`✅ Next.js Server ready: http://localhost:${port}`);
    console.log(`🚀 GraphQL endpoint: http://localhost:${port}/api/graphql`);
    console.log(`💬 Socket.IO: ws://localhost:${port}/socket.io`);
    console.log("======================================================");
  });
}

startServer().catch((err) => {
  console.error("❌ Fatal server error:", err);
  process.exit(1);
});
