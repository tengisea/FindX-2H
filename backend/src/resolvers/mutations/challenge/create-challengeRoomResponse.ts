import {
  MutationResolvers,
  ChallengeRoomResponseInput,
} from "@/types/generated";
import { GraphQLError } from "graphql";
import { ChallengeRoomResponseModel } from "@/models/ChallengeRoomResponse.model";

export const createChallengeRoomResponse: MutationResolvers["createChallengeRoomResponse"] =
  async (_: unknown, { input }: { input: ChallengeRoomResponseInput }) => {
    try {
      const challengeRoomResponse = await ChallengeRoomResponseModel.create(
        input
      );
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
      };
    } catch (error) {
      throw new GraphQLError("Failed to create challenge room response");
    }
  };
