import { useState, useEffect, useCallback } from "react";
import {
  Room,
  RoomEvent,
  RemoteParticipant,
  LocalParticipant,
  Track,
} from "livekit-client";
import { getLiveKitToken, getLiveKitWsUrl } from "@/utils/livekit";

interface UseLiveKitReturn {
  room: Room | null;
  isConnected: boolean;
  participants: RemoteParticipant[];
  localParticipant: LocalParticipant | null;
  connect: (studentId: string, roomName: string) => Promise<void>;
  disconnect: () => void;
  publishAudio: () => Promise<void>;
  publishVideo: () => Promise<void>;
  unpublishAudio: () => void;
  unpublishVideo: () => void;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  error: string | null;
}

export const useLiveKit = (): UseLiveKitReturn => {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState<RemoteParticipant[]>([]);
  const [localParticipant, setLocalParticipant] =
    useState<LocalParticipant | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async (studentId: string, roomName: string) => {
    try {
      setError(null);

      // Шинэ room үүсгэх
      const newRoom = new Room();

      // Event listeners нэмэх
      newRoom.on(RoomEvent.Connected, () => {
        console.log("Connected to room");
        setIsConnected(true);
        setLocalParticipant(newRoom.localParticipant);
      });

      newRoom.on(RoomEvent.Disconnected, (reason) => {
        console.log("Disconnected from room:", reason);
        setIsConnected(false);
        setLocalParticipant(null);
        setParticipants([]);
      });

      newRoom.on(RoomEvent.ParticipantConnected, (participant) => {
        console.log("Participant connected:", participant.identity);
        setParticipants((prev) => [...prev, participant]);
      });

      newRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
        console.log("Participant disconnected:", participant.identity);
        setParticipants((prev) =>
          prev.filter((p) => p.identity !== participant.identity)
        );
      });

      newRoom.on(
        RoomEvent.TrackSubscribed,
        (track, publication, participant) => {
          console.log("Track subscribed:", track.kind, participant.identity);
        }
      );

      newRoom.on(
        RoomEvent.TrackUnsubscribed,
        (track, publication, participant) => {
          console.log("Track unsubscribed:", track.kind, participant.identity);
        }
      );

      // Token авах
      const token = await getLiveKitToken(studentId, roomName);
      const wsUrl = getLiveKitWsUrl();

      // Room-д холбогдох
      await newRoom.connect(wsUrl, token);

      setRoom(newRoom);
    } catch (err) {
      console.error("Failed to connect to room:", err);
      setError(
        err instanceof Error ? err.message : "Failed to connect to room"
      );
    }
  }, []);

  const disconnect = useCallback(() => {
    if (room) {
      room.disconnect();
      setRoom(null);
      setIsConnected(false);
      setLocalParticipant(null);
      setParticipants([]);
      setIsAudioEnabled(false);
      setIsVideoEnabled(false);
    }
  }, [room]);

  const publishAudio = useCallback(async () => {
    if (room && room.localParticipant) {
      try {
        await room.localParticipant.setMicrophoneEnabled(true);
        setIsAudioEnabled(true);
      } catch (err) {
        console.error("Failed to enable microphone:", err);
        setError("Failed to enable microphone");
      }
    }
  }, [room]);

  const publishVideo = useCallback(async () => {
    if (room && room.localParticipant) {
      try {
        await room.localParticipant.setCameraEnabled(true);
        setIsVideoEnabled(true);
      } catch (err) {
        console.error("Failed to enable camera:", err);
        setError("Failed to enable camera");
      }
    }
  }, [room]);

  const unpublishAudio = useCallback(() => {
    if (room && room.localParticipant) {
      room.localParticipant.setMicrophoneEnabled(false);
      setIsAudioEnabled(false);
    }
  }, [room]);

  const unpublishVideo = useCallback(() => {
    if (room && room.localParticipant) {
      room.localParticipant.setCameraEnabled(false);
      setIsVideoEnabled(false);
    }
  }, [room]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [room]);

  return {
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
  };
};
