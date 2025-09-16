"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  PhoneOff,
} from "lucide-react";

type Props = {
  isConnecting: boolean;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenShareEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleScreen: () => void;
  onEnd: () => void;
  onRequestMedia?: () => void;
};

export default function Controls({
  isConnecting,
  isAudioEnabled,
  isVideoEnabled,
  isScreenShareEnabled,
  onToggleAudio,
  onToggleVideo,
  onToggleScreen,
  onEnd,
  onRequestMedia,
}: Props) {
  return (
    <div className="flex items-center justify-center space-x-4">
      {onRequestMedia && !isAudioEnabled && !isVideoEnabled && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRequestMedia}
          className="mr-2"
        >
          Enable Camera & Mic
        </Button>
      )}

      <Button
        variant={isAudioEnabled ? "default" : "destructive"}
        size="lg"
        onClick={onToggleAudio}
        disabled={isConnecting}
        className="rounded-full w-12 h-12 bg-black"
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
        onClick={onToggleVideo}
        disabled={isConnecting}
        className="rounded-full w-12 h-12 bg-black"
      >
        {isVideoEnabled ? (
          <Video className="h-5 w-5" />
        ) : (
          <VideoOff className="h-5 w-5" />
        )}
      </Button>

      <Button
        variant={isScreenShareEnabled ? "default" : "outline"}
        size="lg"
        onClick={onToggleScreen}
        disabled={isConnecting}
        className="rounded-full w-12 h-12 bg-black"
      >
        {isScreenShareEnabled ? (
          <MonitorOff className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
      </Button>

      <Button
        variant="destructive"
        size="lg"
        onClick={onEnd}
        className="rounded-full w-12 h-12 bg-black"
      >
        <PhoneOff className="h-5 w-5" />
      </Button>
    </div>
  );
}
