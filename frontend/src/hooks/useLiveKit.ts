import { useState, useEffect, useCallback, useRef } from "react";
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
  isConnecting: boolean;
  participants: RemoteParticipant[];
  localParticipant: LocalParticipant | null;
  connect: (studentId: string, roomName: string) => Promise<void>;
  disconnect: () => void;
  publishAudio: () => Promise<void>;
  publishVideo: () => Promise<void>;
  unpublishAudio: () => void;
  unpublishVideo: () => void;
  publishScreenShare: () => Promise<void>;
  unpublishScreenShare: () => void;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenShareEnabled: boolean;
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
  const [isScreenShareEnabled, setIsScreenShareEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const connectionAttemptRef = useRef(0);

  const connect = useCallback(
    async (studentId: string, roomName: string) => {
      // Set connecting state immediately to prevent duplicates
      if (isConnecting) {
        console.log("Already connecting, skipping...");
        return;
      }

      if (isConnected) {
        console.log("Already connected, skipping...");
        return;
      }

      // Additional check to prevent race conditions
      if (connectionAttemptRef.current > 0) {
        console.log("Connection attempt already in progress, skipping...");
        return;
      }

      setIsConnecting(true);
      setError(null);
      connectionAttemptRef.current += 1;
      const attemptNumber = connectionAttemptRef.current;

      try {
        // Шинэ room үүсгэх
        const newRoom = new Room();

        // Event listeners нэмэх
        newRoom.on(RoomEvent.Connected, () => {
          console.log("✅ Successfully connected to room:", roomName);
          console.log("Room details:", {
            name: newRoom.name,
            participants: newRoom.numParticipants,
            localParticipant: newRoom.localParticipant?.identity,
          });
          setIsConnected(true);
          setLocalParticipant(newRoom.localParticipant);
        });

        newRoom.on(RoomEvent.Disconnected, (reason) => {
          console.log("❌ Disconnected from room:", reason);
          console.log("Disconnect details:", {
            reason,
            roomName: newRoom.name,
            wasConnected: isConnected,
            participantCount: newRoom.numParticipants,
          });
          setIsConnected(false);
          setLocalParticipant(null);
          setParticipants([]);
          setIsConnecting(false);
          connectionAttemptRef.current = 0; // Reset connection attempt counter

          // Show error for unexpected disconnections
          if (reason) {
            console.log("Disconnect reason:", reason);

            // Map disconnect reasons to user-friendly messages
            let errorMessage =
              "Connection lost. This may be due to participant limits or network issues.";

            if (reason === 2) {
              // PARTICIPANT_REMOVED
              errorMessage =
                "You were removed from the room. This usually indicates participant limits on your LiveKit plan.";
            } else if (reason === 3) {
              // SERVER_SHUTDOWN
              errorMessage = "The server shut down. Please try reconnecting.";
            } else if (reason === 4) {
              // PARTICIPANT_METADATA_CHANGED
              errorMessage = "Connection lost due to metadata changes.";
            }

            setError(errorMessage);
          }
        });

        newRoom.on(RoomEvent.ParticipantConnected, (participant) => {
          console.log("👥 Participant connected:", participant.identity);
          console.log("Participant details:", {
            identity: participant.identity,
            videoTracks: participant.videoTrackPublications.size,
            audioTracks: participant.audioTrackPublications.size,
            isSpeaking: participant.isSpeaking,
            audioLevel: participant.audioLevel,
          });
          setParticipants((prev) => [...prev, participant]);

          // Trigger immediate auto-fetch for new participant
          setTimeout(() => {
            console.log(
              "🔄 Auto-fetch triggered for new participant:",
              participant.identity
            );
            // This will trigger the useEffect in VideoCall component
          }, 500);
        });

        newRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
          console.log("👥 Participant disconnected:", participant.identity);
          setParticipants((prev) =>
            prev.filter((p) => p.identity !== participant.identity)
          );
        });

        // Listen for track subscriptions at room level
        newRoom.on(
          RoomEvent.TrackSubscribed,
          (track, publication, participant) => {
            console.log("📺 Track subscribed:", {
              trackKind: track.kind,
              participantIdentity: participant.identity,
              trackId: track.sid,
            });
          }
        );

        newRoom.on(
          RoomEvent.TrackUnsubscribed,
          (track, publication, participant) => {
            console.log("📺 Track unsubscribed:", {
              trackKind: track.kind,
              participantIdentity: participant.identity,
              trackId: track.sid,
            });
          }
        );

        // Token авах
        const token = await getLiveKitToken(studentId, roomName);
        const wsUrl = getLiveKitWsUrl();

        // Room-д холбогдох
        console.log(
          `🔄 Attempt #${attemptNumber} - Connecting to room:`,
          roomName
        );
        console.log("Connection details:", { wsUrl, hasToken: !!token });

        await newRoom.connect(wsUrl, token);

        console.log("✅ Room connection successful");
        setRoom(newRoom);
      } catch (err) {
        console.error("Failed to connect to room:", err);

        // Check for specific LiveKit errors
        let errorMessage = "Failed to connect to room";
        if (err instanceof Error) {
          if (
            err.message.includes(
              "could not createOffer with closed peer connection"
            )
          ) {
            errorMessage =
              "Connection limit reached - only 1 participant allowed in this room. Please check your LiveKit Cloud plan.";
          } else if (
            err.message.includes("publishing rejected as engine not connected")
          ) {
            errorMessage = "Connection lost - please refresh and try again.";
          } else {
            errorMessage = err.message;
          }
        }

        setError(errorMessage);
      } finally {
        setIsConnecting(false);
      }
    },
    [isConnecting]
  );

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
        // First try to get user media to ensure permissions are granted
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());

        // Then enable microphone in LiveKit
        await room.localParticipant.setMicrophoneEnabled(true);
        setIsAudioEnabled(true);
        console.log("✅ Microphone enabled successfully");
      } catch (err) {
        console.error("Failed to enable microphone:", err);
        if (
          err instanceof Error &&
          err.message.includes("publishing rejected as engine not connected")
        ) {
          console.log("Connection lost - cannot enable microphone");
          setError("Connection lost - please refresh and try again.");
        } else {
          console.log(
            "Microphone access denied or unavailable, continuing without audio"
          );
        }
        setIsAudioEnabled(false);
      }
    }
  }, [room]);

  const publishVideo = useCallback(async () => {
    if (room && room.localParticipant) {
      try {
        // First try to get user media to ensure permissions are granted
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());

        // Then enable camera in LiveKit
        await room.localParticipant.setCameraEnabled(true);
        setIsVideoEnabled(true);
        console.log("✅ Camera enabled successfully");
      } catch (err) {
        console.error("Failed to enable camera:", err);
        if (
          err instanceof Error &&
          err.message.includes("publishing rejected as engine not connected")
        ) {
          console.log("Connection lost - cannot enable camera");
          setError("Connection lost - please refresh and try again.");
        } else {
          console.log(
            "Camera access denied or unavailable, continuing without video"
          );
        }
        setIsVideoEnabled(false);
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

  const publishScreenShare = useCallback(async () => {
    if (room && room.localParticipant) {
      try {
        await room.localParticipant.setScreenShareEnabled(true);
        setIsScreenShareEnabled(true);
      } catch (err) {
        console.error("Failed to enable screen share:", err);
        setError("Failed to enable screen share");
      }
    }
  }, [room]);

  const unpublishScreenShare = useCallback(() => {
    if (room && room.localParticipant) {
      room.localParticipant.setScreenShareEnabled(false);
      setIsScreenShareEnabled(false);
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
    error,
  };
};
