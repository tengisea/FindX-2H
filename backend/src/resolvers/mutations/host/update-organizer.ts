import { OrganizerModel } from "@/models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const updateOrganizer = async (
  _: unknown,
  { id, input }: { id: string; input: any }
) => {
  try {
    if (input.email) {
      const existingOrganizer = await OrganizerModel.findOne({
        email: input.email,
        _id: { $ne: id },
      });
      if (existingOrganizer) {
        throw new GraphQLError("Organizer with this email already exists");
      }
    }

    const organizer = await OrganizerModel.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true }
    );

    if (!organizer) {
      throw new GraphQLError("Organizer not found");
    }

    return transformDocument(organizer);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
