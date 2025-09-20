import { GraphQLError } from "graphql";
import { InvitationService } from "@/services/invitationService";

export const processInvitations = async (
  _: unknown,
  { olympiadId }: { olympiadId: string }
) => {
  try {
    console.log(`🎯 Processing invitations for olympiad: ${olympiadId}`);

    const results = await InvitationService.processInvitations(olympiadId);

    console.log(
      `✅ Invitation processing completed: ${results.length} class types processed`
    );

    return results;
  } catch (error: any) {
    console.error("❌ Error processing invitations:", error);
    // Return empty array instead of throwing error to prevent breaking the system
    return [];
  }
};
