import { Server as SocketIOServer } from "socket.io";
// Global Socket.IO server instance
let io = null;
// Store connected users
const connectedUsers = new Map();
// Initialize Socket.IO server
export function initializeSocketIOServer(server) {
    if (io)
        return io;
    io = new SocketIOServer(server, {
        cors: {
            origin: process.env.CORS_ORIGIN || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
        path: "/socket.io/",
    });
    // Connection handling
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
        // Handle user authentication/identification
        socket.on("authenticate", (data) => {
            const { userId, username } = data;
            // Store user data
            connectedUsers.set(socket.id, {
                userId,
                username,
            });
            // Join user to their personal room
            socket.join(`user:${userId}`);
            console.log(`User authenticated: ${userId} (${username || "Anonymous"})`);
            // Send confirmation
            socket.emit("authenticated", {
                userId,
                socketId: socket.id,
                message: "Successfully authenticated",
            });
            // Notify about connection
            socket.emit("notification", {
                type: "success",
                title: "Connected",
                message: "Connected to notification server",
            });
        });
        // Handle joining rooms
        socket.on("join_room", (data) => {
            const { roomName } = data;
            const userData = connectedUsers.get(socket.id);
            if (userData) {
                // Leave previous room if any
                if (userData.roomName) {
                    socket.leave(userData.roomName);
                }
                // Join new room
                socket.join(roomName);
                userData.roomName = roomName;
                connectedUsers.set(socket.id, userData);
                console.log(`User ${userData.userId} joined room: ${roomName}`);
                // Notify room members
                socket.to(roomName).emit("user_joined", {
                    userId: userData.userId,
                    username: userData.username,
                    roomName,
                });
                // Send confirmation
                socket.emit("room_joined", {
                    roomName,
                    message: `Joined room: ${roomName}`,
                });
            }
        });
        // Handle leaving rooms
        socket.on("leave_room", () => {
            const userData = connectedUsers.get(socket.id);
            if (userData && userData.roomName) {
                const roomName = userData.roomName;
                socket.leave(roomName);
                userData.roomName = undefined;
                connectedUsers.set(socket.id, userData);
                console.log(`User ${userData.userId} left room: ${roomName}`);
                // Notify room members
                socket.to(roomName).emit("user_left", {
                    userId: userData.userId,
                    username: userData.username,
                    roomName,
                });
                // Send confirmation
                socket.emit("room_left", {
                    roomName,
                    message: `Left room: ${roomName}`,
                });
            }
        });
        // Handle room messages
        socket.on("room_message", (data) => {
            const { roomName, message, data: messageData } = data;
            const userData = connectedUsers.get(socket.id);
            if (userData) {
                console.log(`Room message from ${userData.userId} to ${roomName}: ${message}`);
                // Broadcast to room (including sender)
                io === null || io === void 0 ? void 0 : io.to(roomName).emit("room_message", {
                    from: {
                        userId: userData.userId,
                        username: userData.username,
                    },
                    roomName,
                    message,
                    data: messageData,
                    timestamp: new Date().toISOString(),
                });
            }
        });
        // Handle direct messages
        socket.on("direct_message", (data) => {
            const { targetUserId, message, data: messageData } = data;
            const userData = connectedUsers.get(socket.id);
            if (userData) {
                console.log(`Direct message from ${userData.userId} to ${targetUserId}: ${message}`);
                // Send to target user's personal room
                io === null || io === void 0 ? void 0 : io.to(`user:${targetUserId}`).emit("direct_message", {
                    from: {
                        userId: userData.userId,
                        username: userData.username,
                    },
                    message,
                    data: messageData,
                    timestamp: new Date().toISOString(),
                });
            }
        });
        // Handle notifications
        socket.on("send_notification", (data) => {
            const userData = connectedUsers.get(socket.id);
            if (userData) {
                console.log(`Notification from ${userData.userId}: ${data.title}`);
                // Send notification to user
                socket.emit("notification", Object.assign(Object.assign({}, data), { timestamp: new Date().toISOString() }));
            }
        });
        // Handle ping/pong for connection health
        socket.on("ping", () => {
            socket.emit("pong", {
                timestamp: new Date().toISOString(),
            });
        });
        // Handle disconnection
        socket.on("disconnect", (reason) => {
            const userData = connectedUsers.get(socket.id);
            if (userData) {
                console.log(`User ${userData.userId} disconnected: ${reason}`);
                // Notify room members if user was in a room
                if (userData.roomName) {
                    socket.to(userData.roomName).emit("user_left", {
                        userId: userData.userId,
                        username: userData.username,
                        roomName: userData.roomName,
                        reason: "disconnected",
                    });
                }
                // Remove from connected users
                connectedUsers.delete(socket.id);
            }
        });
    });
    return io;
}
// Utility functions for sending messages from other parts of the application
export const socketService = {
    // Send notification to specific user
    sendNotificationToUser: (userId, notification) => {
        if (io) {
            io.to(`user:${userId}`).emit("notification", Object.assign(Object.assign({}, notification), { timestamp: new Date().toISOString() }));
        }
    },
    // Send notification to all users in a room
    sendNotificationToRoom: (roomName, notification) => {
        if (io) {
            io.to(roomName).emit("notification", Object.assign(Object.assign({}, notification), { timestamp: new Date().toISOString() }));
        }
    },
    // Broadcast notification to all connected users
    broadcastNotification: (notification) => {
        if (io) {
            io.emit("notification", Object.assign(Object.assign({}, notification), { timestamp: new Date().toISOString() }));
        }
    },
    // Send message to room
    sendMessageToRoom: (roomName, message, data) => {
        if (io) {
            io.to(roomName).emit("room_message", {
                from: { userId: "system", username: "System" },
                roomName,
                message,
                data,
                timestamp: new Date().toISOString(),
            });
        }
    },
    // Get connected users count
    getConnectedUsersCount: () => {
        return connectedUsers.size;
    },
    // Get users in a specific room
    getUsersInRoom: (roomName) => {
        if (io) {
            const room = io.sockets.adapter.rooms.get(roomName);
            return room ? Array.from(room) : [];
        }
        return [];
    },
};
