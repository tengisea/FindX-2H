import { ChallengeRoomModel } from "@/models/ChallengeRoom.model";
import { GraphQLError } from "graphql";
export const updateChallengeRoom = async (_, { input }) => {
    var _a;
    try {
        const challengeRoom = await ChallengeRoomModel.findByIdAndUpdate(input.roomId, input);
        if (!challengeRoom) {
            throw new GraphQLError("Challenge room not found");
        }
        return {
            id: challengeRoom._id.toString(),
            challengeId: challengeRoom.challengeId.toString(),
            challengerId: challengeRoom.challengerId.toString(),
            opponentId: challengeRoom.opponentId.toString(),
            status: challengeRoom.status,
            winnerId: (_a = challengeRoom.winnerId) === null || _a === void 0 ? void 0 : _a.toString(),
            challengerScore: challengeRoom.challengerScore,
            opponentScore: challengeRoom.opponentScore,
            createdAt: challengeRoom.createdAt,
            updatedAt: challengeRoom.updatedAt,
        };
    }
    catch (error) {
        throw new GraphQLError("Failed to update challenge room");
    }
};
