"use client";
import React from "react";
import { RemoteParticipant } from "livekit-client";

type Props = {
  participants: RemoteParticipant[];
  remoteVideos: Map<string, HTMLVideoElement>;
};

export default function RemoteGrid({ participants, remoteVideos }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {participants.map((p) => {
        const el = remoteVideos.get(p.identity);
        const speaking = !!p.isSpeaking && (p.audioLevel ?? 0) > 0.1;
        const hasAudio = p.audioTrackPublications?.size > 0;
        const hasVideo = p.videoTrackPublications?.size > 0;
        return (
          <div
            key={p.identity}
            className={
              `relative transition-all duration-300 rounded-lg overflow-hidden aspect-video bg-gray-900 ` +
              (speaking
                ? "ring-4 ring-green-500 ring-opacity-75 shadow-lg shadow-green-500/25"
                : hasAudio
                ? "ring-2 ring-blue-500 ring-opacity-50"
                : "ring-0")
            }
          >
            {el ? (
              <div
                ref={(host) => {
                  if (host && el && !host.contains(el)) {
                    host.innerHTML = "";
                    host.appendChild(el);
                  }
                }}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                {p.identity}
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {p.identity} {hasAudio ? "🔊" : "🔇"} {hasVideo ? "📹" : "📷"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
