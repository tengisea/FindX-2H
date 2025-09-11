import {
  MutationResolvers,
  CreateExampleInput,
  Response,
} from "@/types/generated";
import { GraphQLError } from "graphql";

export const createExample: MutationResolvers["createExample"] = (
  _: unknown,
  { input }: { input: CreateExampleInput }
) => {
  try {
    return Response.Success;
  } catch (error) {
    throw new GraphQLError("Cannot create customer");
  }
};
