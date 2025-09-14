import { GraphQLError } from "graphql";
import { ChallengeModel } from "@/models";
import { MutationResolvers, ChallengeInput } from "@/types/generated";

export const createChallenge: MutationResolvers["createChallenge"] = async (
  _: unknown,
  { input }: { input: ChallengeInput }
) => {
  try {
    const challenge = await ChallengeModel.create({
      ...input,
      participants: [input.challenger, input.opponent],
    });

    return challenge._id.toString();
  } catch (error) {
    throw new GraphQLError("Failed to create challenge");
  }
};
