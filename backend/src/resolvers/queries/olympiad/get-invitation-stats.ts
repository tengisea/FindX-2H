import { GraphQLError } from "graphql";
import { InvitationService } from "@/services/invitationService";

export const getInvitationStats = async (
  _: unknown,
  { olympiadId }: { olympiadId: string }
) => {
  try {
    console.log(`📊 Getting invitation stats for olympiad: ${olympiadId}`);

    const stats = await InvitationService.getInvitationStats(olympiadId);

    // Transform the stats to match the GraphQL schema
    const transformedStats = {
      totalInvited: stats.totalInvited,
      byClass: Object.entries(stats.byClass).map(([classYear, count]) => ({
        classYear,
        count,
      })),
      byRegion: Object.entries(stats.byRegion).map(([region, count]) => ({
        region,
        count,
      })),
    };

    console.log(
      `✅ Invitation stats retrieved: ${stats.totalInvited} total invited`
    );

    return transformedStats;
  } catch (error: any) {
    console.error("❌ Error getting invitation stats:", error);
    // Return empty stats instead of throwing error to prevent breaking the system
    return {
      totalInvited: 0,
      byClass: [],
      byRegion: [],
    };
  }
};
