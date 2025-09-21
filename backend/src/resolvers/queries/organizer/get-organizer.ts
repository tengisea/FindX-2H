import { OrganizerModel } from "@/models";
import { GraphQLError } from "graphql";

export const getOrganizer = async (_: unknown, { id }: { id: string }) => {
  try {
    const organizer = await OrganizerModel.findById(id).populate(
      "Olympiads",
      "id name"
    );
    if (!organizer) {
      throw new GraphQLError("Organizer not found");
    }

    return {
      id: organizer._id.toString(),
      organizationName: organizer.organizationName,
      email: organizer.email,
      Olympiads: organizer.Olympiads.map((olympiad: any) => ({
        id: olympiad._id.toString(),
        name: olympiad.name,
      })),
    };
  } catch (error: any) {
    console.error("❌ Get organizer error:", error);
    throw new GraphQLError(error.message || "Failed to get organizer");
  }
};
