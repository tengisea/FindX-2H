import axios from "axios";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface LiveKitTokenResponse {
  token: string;
}

export const getLiveKitToken = async (
  studentId: string,
  roomName: string
): Promise<string> => {
  try {
    const response = await axios.post<LiveKitTokenResponse>(
      `${BACKEND_URL}/api/livekit/token`,
      {
        studentId,
        roomName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.token;
  } catch (error) {
    console.error("Failed to get LiveKit token:", error);
    throw new Error("Failed to get LiveKit token");
  }
};

export const getLiveKitWsUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_LIVEKIT_WS_URL || "wss://your-livekit-server.com"
  );
};

export const getLiveKitHttpUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_LIVEKIT_HTTP_URL ||
    "https://your-livekit-server.com"
  );
};
