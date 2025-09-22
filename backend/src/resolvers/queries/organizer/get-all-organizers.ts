import { OrganizerModel } from "@/models";
import { GraphQLError } from "graphql";

export const getAllOrganizers = async () => {
  try {
    const organizers = await OrganizerModel.find().populate("Olympiads", "id name");

    return organizers.map((organizer) => ({
      id: organizer._id.toString(),
      organizationName: organizer.organizationName,
      email: organizer.email,
      logo: organizer.logo,
      Olympiads: organizer.Olympiads.map((olympiad: any) => ({
        id: olympiad._id.toString(),
        name: olympiad.name,
      })),
    }));
  } catch (error: any) {
    console.error("❌ Get all organizers error:", error);
    throw new GraphQLError(error.message || "Failed to get all organizers");
  }
};
