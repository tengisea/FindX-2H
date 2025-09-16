import { useEffect, useRef, useState } from "react";
import { Room, RemoteParticipant, RoomEvent } from "livekit-client";

export type RemoteVideosMap = Map<string, HTMLVideoElement>;

export function useRemoteVideos(
  room: Room | null,
  participants: RemoteParticipant[]
) {
  const [remoteVideos, setRemoteVideos] = useState<RemoteVideosMap>(new Map());
  const remoteVideosRef = useRef<RemoteVideosMap>(new Map());

  useEffect(() => {
    remoteVideosRef.current = remoteVideos;
  }, [remoteVideos]);

  useEffect(() => {
    if (!room) return;

    const attachVideo = (participant: RemoteParticipant, publication: any) => {
      if (!publication?.track) return;
      if (remoteVideosRef.current.has(participant.identity)) return;
      const el = document.createElement("video");
      el.autoplay = true;
      el.playsInline = true;
      el.muted = true;
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.objectFit = "cover";
      // Mirror remote video as requested
      el.style.transform = "scaleX(-1)";
      publication.track.attach(el);
      setRemoteVideos((prev) => new Map(prev).set(participant.identity, el));
    };

    const onTrackSubscribed = (
      track: any,
      publication: any,
      participant: RemoteParticipant
    ) => {
      if (track.kind === "video") attachVideo(participant, publication);
    };

    room.on(RoomEvent.TrackSubscribed, onTrackSubscribed);

    // Attach already published tracks (when joining late)
    participants.forEach((p) => {
      const pubs = Array.from(p.videoTrackPublications.values());
      if (pubs[0]?.track) attachVideo(p, pubs[0]);
    });

    return () => {
      room.off(RoomEvent.TrackSubscribed, onTrackSubscribed);
    };
  }, [room, participants]);

  useEffect(() => {
    // Remove tiles of participants who left
    const ids = new Set(participants.map((p) => p.identity));
    setRemoteVideos((prev) => {
      const next = new Map(prev);
      for (const key of next.keys()) if (!ids.has(key)) next.delete(key);
      return next;
    });
  }, [participants]);

  return remoteVideos;
}
