"use client";
import React, { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLiveKit } from "@/hooks/useLiveKit";
import { useRemoteVideos } from "@/hooks/useRemoteVideos";
import LocalTile from "@/components/video-call/LocalTile";
import RemoteGrid from "@/components/video-call/RemoteGrid";
import Controls from "@/components/video-call/Controls";

type Props = { studentId: string; roomName: string; onCallEnd?: () => void };

export const VideoCall: React.FC<Props> = ({
  studentId,
  roomName,
  onCallEnd,
}) => {
  const {
    room,
    isConnected,
    isConnecting,
    participants,
    localParticipant,
    connect,
    disconnect,
    publishAudio,
    publishVideo,
    unpublishAudio,
    unpublishVideo,
    publishScreenShare,
    unpublishScreenShare,
    isAudioEnabled,
    isVideoEnabled,
    isScreenShareEnabled,
  } = useLiveKit();

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideos = useRemoteVideos(room, participants);

  // Connect once
  useEffect(() => {
    if (!studentId || !roomName || isConnected || isConnecting) return;
    connect(studentId, roomName);
  }, [studentId, roomName, isConnected, isConnecting, connect]);

  // Attach local track
  useEffect(() => {
    if (!localParticipant || !localVideoRef.current) return undefined;
    const pubs = Array.from(localParticipant.videoTrackPublications.values());
    if (pubs[0]?.track) pubs[0].track.attach(localVideoRef.current);
    const onPub = (p: any) => {
      if (p?.kind === "video" && p.track && localVideoRef.current)
        p.track.attach(localVideoRef.current);
    };
    localParticipant.on("trackPublished", onPub);
    // also handle local publish event name
    // @ts-ignore
    localParticipant.on("localTrackPublished", onPub);
    return () => {
      localParticipant.off("trackPublished", onPub);
      // @ts-ignore
      localParticipant.off("localTrackPublished", onPub);
    };
  }, [localParticipant]);

  // Auto-enable camera (mic stays manual)
  useEffect(() => {
    if (!isConnected || !localParticipant) return;
    if (localParticipant.videoTrackPublications.size === 0)
      publishVideo().catch(() => {});
  }, [isConnected, localParticipant, publishVideo]);

  const toggleAudio = () =>
    isAudioEnabled ? unpublishAudio() : publishAudio();
  const toggleVideo = () =>
    isVideoEnabled ? unpublishVideo() : publishVideo();
  const toggleScreen = () =>
    isScreenShareEnabled ? unpublishScreenShare() : publishScreenShare();
  const endCall = () => {
    disconnect();
    onCallEnd?.();
  };

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
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Video Call</CardTitle>
              <p className="text-sm text-gray-600">Room: {roomName}</p>
            </div>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{participants.length + 1}</span>
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <LocalTile
        videoRef={localVideoRef}
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        isScreenShareEnabled={isScreenShareEnabled}
        audioLevel={localParticipant?.audioLevel}
      />

      <RemoteGrid participants={participants} remoteVideos={remoteVideos} />

      <Card>
        <CardContent className="py-4">
          <Controls
            isConnecting={isConnecting}
            isAudioEnabled={isAudioEnabled}
            isVideoEnabled={isVideoEnabled}
            isScreenShareEnabled={isScreenShareEnabled}
            onToggleAudio={toggleAudio}
            onToggleVideo={toggleVideo}
            onToggleScreen={toggleScreen}
            onEnd={endCall}
          />
        </CardContent>
      </Card>
    </div>
  );
};
