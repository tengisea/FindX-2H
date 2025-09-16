const LIVEKIT_API_URL =
  process.env.NEXT_PUBLIC_LIVEKIT_API_URL || "http://localhost:8000";

export const getLiveKitToken = async (
  studentId: string,
  roomName: string
): Promise<string> => {
  const response = await fetch(`${LIVEKIT_API_URL}/api/livekit/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentId,
      roomName,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Token request failed:", response.status, errorText);
    throw new Error(
      `Failed to get LiveKit token: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();
  return data.token;
};

export const getLiveKitWsUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_LIVEKIT_WS_URL ||
    "wss://findx-nxwehhao.livekit.cloud"
  );
};
