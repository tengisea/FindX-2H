# LiveKit Video Call & WebSocket Notifications Setup

This guide will help you set up your Next.js backend server with LiveKit WebSocket server for video calls and real-time notifications.

## Prerequisites

- Node.js 18+ installed
- LiveKit server running (local or cloud)
- LiveKit API credentials

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
yarn install
```

### 2. Environment Variables

Create a `.env.local` file in the backend directory:

```env
# LiveKit Configuration
LIVEKIT_API_KEY=your_livekit_api_key_here
LIVEKIT_API_SECRET=your_livekit_api_secret_here
LIVEKIT_WS_URL=wss://your-livekit-server.com
LIVEKIT_HTTP_URL=https://your-livekit-server.com

# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration (if using MongoDB)
MONGODB_URI=mongodb://localhost:27017/findx

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 3. Start the Backend Server

```bash
# Development mode with TypeScript (runs src/server.ts)
yarn dev

# Or build and start production
yarn build
yarn start
```

The server will start on `http://localhost:8000` with:

- GraphQL endpoint at `http://localhost:8000/api/graphql`
- Socket.IO server at `http://localhost:8000/socket.io/`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
yarn install
```

### 2. Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# Backend URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# LiveKit Configuration
NEXT_PUBLIC_LIVEKIT_WS_URL=wss://your-livekit-server.com
NEXT_PUBLIC_LIVEKIT_HTTP_URL=https://your-livekit-server.com
```

### 3. Start the Frontend

```bash
yarn dev
```

The frontend will start on `http://localhost:3000`.

## Features

### Video Call System

- **Real-time video/audio communication** using LiveKit
- **Multi-participant support** with video grid layout
- **Audio/Video controls** (mute/unmute, camera on/off)
- **Room-based communication** with unique room names
- **Token-based authentication** for secure access

### Socket.IO Notifications

- **Real-time notifications** via Socket.IO connection
- **Room-based messaging** for group notifications
- **Direct messaging** for individual users
- **Connection status monitoring** with auto-reconnect
- **Built-in fallbacks** (WebSocket → polling)
- **Event-based architecture** with clean API
- **Notification center** with read/unread status

### Components

- `VideoCall` - Main video call interface
- `NotificationCenter` - Real-time notification system
- `useLiveKit` - Hook for LiveKit functionality
- `useSocketIO` - Hook for Socket.IO connections
- `useNotifications` - Hook for notification management

## API Endpoints

### Backend API

- `POST /api/livekit/token` - Generate LiveKit access tokens
- `POST /api/graphql` - GraphQL endpoint (integrated in server.ts)
- `GET /api/socket` - Socket.IO server status and statistics
- `POST /api/socket` - Send notifications and messages via Socket.IO

### Socket.IO Events

**Client → Server:**

- `authenticate` - Authenticate user with ID and username
- `join_room` - Join a specific room
- `leave_room` - Leave current room
- `room_message` - Send message to room
- `direct_message` - Send direct message to user
- `send_notification` - Send notification
- `ping` - Connection health check

**Server → Client:**

- `authenticated` - Authentication confirmation
- `room_joined` - Room join confirmation
- `room_left` - Room leave confirmation
- `user_joined` - User joined room notification
- `user_left` - User left room notification
- `room_message` - Message received in room
- `direct_message` - Direct message received
- `notification` - Notification received
- `pong` - Ping response

## Usage Examples

### Starting a Video Call

```typescript
import { VideoCall } from "@/components/VideoCall";

<VideoCall
  studentId="student-123"
  roomName="math-class"
  onCallEnd={() => console.log("Call ended")}
/>;
```

### Sending Notifications

```typescript
import { useSocketIO } from "@/hooks/useSocketIO";

const { sendRoomMessage, sendDirectMessage, sendNotification } = useSocketIO(
  "http://localhost:8000",
  "user-123",
  "John Doe"
);

// Send to room
sendRoomMessage("math-class", "Class is starting!", { type: "announcement" });

// Send direct message
sendDirectMessage("student-456", "You have a new assignment", {
  assignmentId: "123",
});

// Send notification
sendNotification({
  type: "success",
  title: "Assignment Submitted",
  message: "Your assignment has been submitted successfully",
});
```

### Managing Notifications

```typescript
import { useNotifications } from "@/hooks/useNotifications";

const { addNotification, notifications, unreadCount } = useNotifications();

addNotification({
  type: "success",
  title: "Call Started",
  message: "You joined the video call successfully",
});
```

## Troubleshooting

### Common Issues

1. **Socket.IO Connection Failed**

   - Check if backend server is running
   - Verify Socket.IO URL in environment variables
   - Check firewall settings
   - Ensure CORS is properly configured

2. **LiveKit Token Generation Failed**

   - Verify LiveKit API credentials
   - Check LiveKit server is accessible
   - Ensure proper CORS configuration

3. **Video/Audio Not Working**
   - Check browser permissions for camera/microphone
   - Verify HTTPS in production (required for media access)
   - Check LiveKit server configuration

### Development Tips

- Use browser developer tools to monitor Socket.IO connections
- Check network tab for API calls and Socket.IO events
- Use LiveKit dashboard to monitor room activity
- Test with multiple browser tabs/windows for multi-participant scenarios

## Production Deployment

### Backend

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Configure reverse proxy (nginx) for Socket.IO support
4. Set up SSL certificates for HTTPS/WSS

### Frontend

1. Build the application: `yarn build`
2. Deploy to a static hosting service
3. Configure environment variables for production
4. Ensure HTTPS for media access

## Security Considerations

- Always use HTTPS/WSS in production
- Validate all Socket.IO events
- Implement proper authentication/authorization
- Rate limit Socket.IO connections
- Sanitize user inputs in notifications
- Use secure token generation for LiveKit

## Server Structure

The `src/server.ts` now handles:

1. **Database connection** (MongoDB)
2. **Apollo GraphQL server** with your schemas and resolvers
3. **Socket.IO server** for real-time notifications
4. **Next.js application** for all other routes
5. **LiveKit token generation** API

All services are integrated into a single TypeScript server located in `src/server.ts`, making it easier to manage and deploy. The GraphQL functionality is now part of the main server process rather than a separate API route.

## Support

For issues related to:

- LiveKit: Check [LiveKit documentation](https://docs.livekit.io/)
- Socket.IO: Check browser compatibility and server configuration
- Next.js: Check [Next.js documentation](https://nextjs.org/docs)
