import {
  MutationResolvers,
  CreateExampleInput,
  Response,
} from "@/types/generated";
import { GraphQLError } from "graphql";
import { ExampleModel } from "@/models";

export const createExample: MutationResolvers["createExample"] = async (
  _: unknown,
  { input }: { input: CreateExampleInput }
) => {
  try {
    await ExampleModel.create(input);
    return Response.Success;
  } catch (error) {
    throw new GraphQLError("Cannot create example");
  }
};
