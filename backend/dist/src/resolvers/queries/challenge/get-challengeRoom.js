import { GraphQLError } from "graphql";
import { ChallengeRoomModel } from "@/models";
export const getChallengeRoom = async (_, { id }) => {
    var _a;
    try {
        const challengeRoom = await ChallengeRoomModel.findById(id);
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
        throw new GraphQLError("Failed to get challenge room");
    }
};
