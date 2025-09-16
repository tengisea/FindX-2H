import { GraphQLError } from "graphql";
import { ChallengeRoomResponseModel } from "@/models/ChallengeRoomResponse.model";
export const getChallengeRoomResponse = async (_, { id }) => {
    try {
        const challengeRoomResponse = await ChallengeRoomResponseModel.findById(id);
        if (!challengeRoomResponse) {
            throw new GraphQLError("Challenge room response not found");
        }
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
        throw new GraphQLError("Failed to get challenge room response");
    }
};
