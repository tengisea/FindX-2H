import { GraphQLError } from "graphql";
import { ChallengeRoomResponseModel } from "@/models/challengeRoomResponse.model";
import { QueryResolvers, ChallengeRoomResponse } from "@/types/generated";

export const getListStudentChallengeResponses: QueryResolvers["listStudentChallengeResponses"] =
  async (_: unknown, { studentId }: { studentId: string }) => {
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
        createdAt: (challengeRoomResponse as any).createdAt,
        updatedAt: (challengeRoomResponse as any).updatedAt,
      })) as ChallengeRoomResponse[];
    } catch (error) {
      throw new GraphQLError("Failed to get list student challenge responses");
    }
  };
