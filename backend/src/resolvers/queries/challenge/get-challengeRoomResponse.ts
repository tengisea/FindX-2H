import { GraphQLError } from "graphql";
import { QueryResolvers, ChallengeRoomResponse } from "@/types/generated";
import { ChallengeRoomResponseModel } from "@/models/ChallengeRoomResponse.model";

export const getChallengeRoomResponse: QueryResolvers["getChallengeRoomResponse"] =
  async (_: unknown, { id }: { id: string }) => {
    try {
      const challengeRoomResponse = await ChallengeRoomResponseModel.findById(
        id
      );
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
        createdAt: (challengeRoomResponse as any).createdAt,
        updatedAt: (challengeRoomResponse as any).updatedAt,
      } as ChallengeRoomResponse;
    } catch (error) {
      throw new GraphQLError("Failed to get challenge room response");
    }
  };
