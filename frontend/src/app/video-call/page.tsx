"use client";

import React, { useState, useEffect } from "react";
import { VideoCall } from "@/components/VideoCall";
import { NotificationCenter } from "@/components/NotificationCenter";
import { useSocketIO } from "@/hooks/useSocketIO";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Video, Users, Settings, Wifi, WifiOff } from "lucide-react";

export default function VideoCallPage() {
  const [studentId, setStudentId] = useState("student-123");
  const [organizerId, setOrganizerId] = useState("");
  const [roomName, setRoomName] = useState("test-room");
  const [isInCall, setIsInCall] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);

  const { addNotification } = useNotifications();

  // Socket.IO connection for notifications
  const {
    isConnected: wsIsConnected,
    lastEvent,
    sendMessage,
    joinRoom,
    leaveRoom,
    sendRoomMessage,
  } = useSocketIO(
    "http://localhost:8000",
    studentId || organizerId,
    `User-${studentId || organizerId}`
  );

  // Handle Socket.IO events
  useEffect(() => {
    if (lastEvent) {
      switch (lastEvent.type) {
        case "notification":
          addNotification({
            type: lastEvent.data?.type || "info",
            title: lastEvent.data?.title || "System Notification",
            message: lastEvent.data?.message || "You have a new notification",
          });
          break;
        case "room_message":
          addNotification({
            type: "info",
            title: `Room: ${lastEvent.data?.roomName}`,
            message: lastEvent.data?.message || "New message in room",
          });
          break;
        case "direct_message":
          addNotification({
            type: "info",
            title: "Direct Message",
            message: lastEvent.data?.message || "You have a new message",
          });
          break;
        case "authenticated":
          addNotification({
            type: "success",
            title: "Connected",
            message: "Connected to notification server",
          });
          break;
        case "user_joined":
          addNotification({
            type: "info",
            title: "User Joined",
            message: `${
              lastEvent.data?.username || lastEvent.data?.userId
            } joined the room`,
          });
          break;
        case "user_left":
          addNotification({
            type: "info",
            title: "User Left",
            message: `${
              lastEvent.data?.username || lastEvent.data?.userId
            } left the room`,
          });
          break;
      }
    }
  }, [lastEvent, addNotification]);

  // Update WebSocket connection status
  useEffect(() => {
    setWsConnected(wsIsConnected);
  }, [wsIsConnected]);

  const handleJoinCall = () => {
    setIsInCall(true);
    joinRoom(roomName);
    addNotification({
      type: "success",
      title: "Call Started",
      message: `Joined room: ${roomName}`,
    });
  };

  const handleEndCall = () => {
    setIsInCall(false);
    leaveRoom();
    addNotification({
      type: "info",
      title: "Call Ended",
      message: "You have left the call",
    });
  };

  const sendTestNotification = () => {
    sendMessage("ping");
    sendRoomMessage(roomName, "Test message from client", { test: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Video className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                FindX Video Call
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {wsConnected ? (
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <Wifi className="h-3 w-3" />
                    <span>Connected</span>
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="flex items-center space-x-1"
                  >
                    <WifiOff className="h-3 w-3" />
                    <span>Disconnected</span>
                  </Badge>
                )}
              </div>

              {/* Notification Center */}
              <NotificationCenter />

              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isInCall ? (
          /* Join Call Form */
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Join Video Call</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter your student ID"
                  />
                </div>

                <div>
                  <Label htmlFor="roomName">Room Name</Label>
                  <Input
                    id="roomName"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room name"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleJoinCall}
                    className="flex-1"
                    disabled={!studentId || !roomName}
                  >
                    Join Call
                  </Button>

                  <Button
                    variant="outline"
                    onClick={sendTestNotification}
                    disabled={!wsConnected}
                  >
                    Test WS
                  </Button>
                </div>

                <div className="text-sm text-gray-500">
                  <p>• Make sure your camera and microphone are enabled</p>
                  <p>• You'll be able to see other participants in the room</p>
                  <p>• Use the controls to mute/unmute audio and video</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Video Call Interface */
          <VideoCall
            studentId={studentId}
            roomName={roomName}
            onCallEnd={handleEndCall}
          />
        )}
      </main>
    </div>
  );
}
