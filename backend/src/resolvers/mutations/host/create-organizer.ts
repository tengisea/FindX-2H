import { OrganizerModel } from "../../../models";
import { GraphQLError } from "graphql";
import { CreateOrganizerInput } from "@/types/generated";

export const createOrganizer = async (_: unknown, { input }: { input: CreateOrganizerInput }) => {
  try {
    const { organizationName, email, logo } = input;
    const existingOrganizer = await OrganizerModel.findOne({ email });
    if (existingOrganizer) {
      throw new GraphQLError("Organizer with this email already exists");
    }
    const organizer = new OrganizerModel({ organizationName, email, logo });
    await organizer.save();
    return organizer;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};