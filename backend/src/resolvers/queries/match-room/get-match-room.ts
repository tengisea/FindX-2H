import { MatchRoomModel } from "../../../models/tournement/MatchRoom.model";

export const getMatchRoom = async (
    _: any,
    { id }: { id: string }
) => {
    try {
        const matchRoom = await MatchRoomModel.findById(id);
        if (!matchRoom) {
            throw new Error("Match room not found");
        }
        return matchRoom;
    } catch (error) {
        console.error("Error fetching match room:", error);
        throw new Error("Failed to fetch match room");
    }
};