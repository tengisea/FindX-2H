"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLiveKit } from "@/hooks/useLiveKit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  Users,
  Settings,
} from "lucide-react";

interface VideoCallProps {
  studentId: string;
  roomName: string;
  onCallEnd?: () => void;
}

export const VideoCall: React.FC<VideoCallProps> = ({
  studentId,
  roomName,
  onCallEnd,
}) => {
  const {
    room,
    isConnected,
    participants,
    localParticipant,
    connect,
    disconnect,
    publishAudio,
    publishVideo,
    unpublishAudio,
    unpublishVideo,
    isAudioEnabled,
    isVideoEnabled,
    error,
  } = useLiveKit();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [remoteVideos, setRemoteVideos] = useState<
    Map<string, HTMLVideoElement>
  >(new Map());
  const [isConnecting, setIsConnecting] = useState(false);

  // Connect to room when component mounts
  useEffect(() => {
    if (studentId && roomName && !isConnected && !isConnecting) {
      setIsConnecting(true);
      connect(studentId, roomName).finally(() => setIsConnecting(false));
    }
  }, [studentId, roomName, isConnected, isConnecting, connect]);

  // Handle local video stream
  useEffect(() => {
    if (localParticipant && localVideoRef.current) {
      const videoTrack = localParticipant.videoTrackPublications.values().next()
        .value?.track;
      if (videoTrack) {
        videoTrack.attach(localVideoRef.current);
      }
    }
  }, [localParticipant]);

  // Handle remote video streams
  useEffect(() => {
    participants.forEach((participant) => {
      const videoTrack = participant.videoTrackPublications.values().next()
        .value?.track;
      if (videoTrack) {
        const videoElement = document.createElement("video");
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.objectFit = "cover";

        videoTrack.attach(videoElement);
        setRemoteVideos(
          (prev) => new Map(prev.set(participant.identity, videoElement))
        );
      }
    });
  }, [participants]);

  const handleEndCall = () => {
    disconnect();
    onCallEnd?.();
  };

  const toggleAudio = () => {
    if (isAudioEnabled) {
      unpublishAudio();
    } else {
      publishAudio();
    }
  };

  const toggleVideo = () => {
    if (isVideoEnabled) {
      unpublishVideo();
    } else {
      publishVideo();
    }
  };

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600">Connection Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry Connection
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isConnecting) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Connecting to room...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Video Call</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Room: {roomName}</p>
          <Button onClick={() => connect(studentId, roomName)}>
            Join Call
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Video Call</CardTitle>
              <p className="text-sm text-gray-600">Room: {roomName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <Users className="h-3 w-3" />
                <span>{participants.length + 1}</span>
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Local Video */}
        <Card className="relative">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                You {isAudioEnabled ? "🔊" : "🔇"}{" "}
                {isVideoEnabled ? "📹" : "📷"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remote Videos */}
        {Array.from(remoteVideos.entries()).map(
          ([participantId, videoElement]) => (
            <Card key={participantId} className="relative">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <div
                    ref={(el) => {
                      if (el && videoElement) {
                        el.appendChild(videoElement);
                      }
                    }}
                    className="w-full h-full"
                  />
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {participantId}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={isAudioEnabled ? "default" : "destructive"}
              size="lg"
              onClick={toggleAudio}
              className="rounded-full w-12 h-12"
            >
              {isAudioEnabled ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant={isVideoEnabled ? "default" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              className="rounded-full w-12 h-12"
            >
              {isVideoEnabled ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={handleEndCall}
              className="rounded-full w-12 h-12"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
