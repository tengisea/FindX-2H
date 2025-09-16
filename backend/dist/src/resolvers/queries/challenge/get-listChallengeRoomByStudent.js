import { GraphQLError } from "graphql";
import { ChallengeRoomModel } from "@/models";
export const listChallengeRoomsByStudent = async (_, { studentId }) => {
    try {
        const challengeRooms = await ChallengeRoomModel.find({
            $or: [{ challengerId: studentId }, { opponentId: studentId }],
        });
        return challengeRooms.map((challengeRoom) => {
            var _a;
            return ({
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
            });
        });
    }
    catch (error) {
        throw new GraphQLError("Failed to get list challenge room by student");
    }
};
