import { GraphQLError } from "graphql";
import { ChallengeRoomResponseModel } from "@/models/ChallengeRoomResponse.model";
import { QueryResolvers, ChallengeRoomResponse } from "@/types/generated";

export const listChallengeRoomResponses: QueryResolvers["listChallengeRoomResponses"] =
  async (_: unknown, { roomId }: { roomId: string }) => {
    try {
      const challengeRoomResponses = await ChallengeRoomResponseModel.find({
        challengeRoomId: roomId,
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
      throw new GraphQLError("Failed to get list challenge room responses");
    }
  };
