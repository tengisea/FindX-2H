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
      logo: organizer.logo,
      Olympiads: organizer.Olympiads.map((olympiad: any) => ({
        id: olympiad._id.toString(),
        name: olympiad.name,
        occurringDay: olympiad.occurringDay,
        closeDay: olympiad.closeDay,
        location: olympiad.location,
        rankingType: olympiad.rankingType,
        invitation: olympiad.invitation,
        status: olympiad.status,
        classTypes: olympiad.classTypes.map((classType: any) => ({
          id: classType._id.toString(),
          name: classType.name,
          occurringTime: classType.occurringTime,
        })),
        questions: olympiad.questions.map((question: any) => ({
          id: question._id.toString(),
          name: question.name,
          maxScore: question.maxScore,
        })),
      })),
    };
  } catch (error: any) {
    console.error("❌ Get organizer error:", error);
    throw new GraphQLError(error.message || "Failed to get organizer");
  }
};
 