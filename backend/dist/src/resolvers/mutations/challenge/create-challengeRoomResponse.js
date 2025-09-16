import { GraphQLError } from "graphql";
import { ChallengeRoomResponseModel } from "@/models/ChallengeRoomResponse.model";
export const createChallengeRoomResponse = async (_, { input }) => {
    try {
        const challengeRoomResponse = await ChallengeRoomResponseModel.create(input);
        return {
            id: challengeRoomResponse._id.toString(),
            challengeRoomId: challengeRoomResponse.challengeRoomId.toString(),
            studentId: challengeRoomResponse.studentId.toString(),
            submittedAnswer: challengeRoomResponse.submittedAnswer,
            isCorrect: challengeRoomResponse.isCorrect,
            points: challengeRoomResponse.points,
            submittedAt: challengeRoomResponse.submittedAt,
            createdAt: challengeRoomResponse.createdAt,
            updatedAt: challengeRoomResponse.updatedAt,
        };
    }
    catch (error) {
        throw new GraphQLError("Failed to create challenge room response");
    }
};
