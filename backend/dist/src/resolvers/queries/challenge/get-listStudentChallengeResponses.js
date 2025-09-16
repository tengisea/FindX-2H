import { GraphQLError } from "graphql";
import { ChallengeRoomResponseModel } from "@/models/ChallengeRoomResponse.model";
export const listStudentChallengeResponses = async (_, { studentId }) => {
    try {
        const challengeRoomResponses = await ChallengeRoomResponseModel.find({
            studentId: studentId,
        });
        return challengeRoomResponses.map((challengeRoomResponse) => ({
            id: challengeRoomResponse._id.toString(),
            challengeRoomId: challengeRoomResponse.challengeRoomId.toString(),
            studentId: challengeRoomResponse.studentId.toString(),
            submittedAnswer: challengeRoomResponse.submittedAnswer,
            isCorrect: challengeRoomResponse.isCorrect,
            points: challengeRoomResponse.points,
            submittedAt: challengeRoomResponse.submittedAt,
            createdAt: challengeRoomResponse.createdAt,
            updatedAt: challengeRoomResponse.updatedAt,
        }));
    }
    catch (error) {
        throw new GraphQLError("Failed to get list student challenge responses");
    }
};
