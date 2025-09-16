"use client";
import React, { useEffect } from "react";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenShareEnabled: boolean;
  audioLevel?: number;
};

export default function LocalTile({
  videoRef,
  isAudioEnabled,
  isVideoEnabled,
  isScreenShareEnabled,
  audioLevel,
}: Props) {
  const speaking = isAudioEnabled && (audioLevel ?? 0) > 0.1;
  const mirror = isVideoEnabled && !isScreenShareEnabled;

  useEffect(() => {}, []);

  return (
    <div
      className={
        `relative aspect-video bg-gray-900 rounded-lg overflow-hidden ` +
        (speaking
          ? "ring-4 ring-green-500 ring-opacity-75 shadow-lg shadow-green-500/25"
          : isAudioEnabled
          ? "ring-2 ring-blue-500 ring-opacity-50"
          : "ring-0")
      }
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover ${
          mirror ? "transform -scale-x-100" : ""
        }`}
        style={{ backgroundColor: "#000" }}
      />
      {!isVideoEnabled && !isScreenShareEnabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <div className="text-center text-sm">Camera Off</div>
        </div>
      )}
    </div>
  );
}
