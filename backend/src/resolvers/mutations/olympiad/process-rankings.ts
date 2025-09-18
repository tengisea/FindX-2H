import { RankingService } from "@/services/rankingService";
import { GraphQLError } from "graphql";

export const processClassTypeRankings = async (
  _: unknown,
  { classTypeId }: { classTypeId: string }
) => {
  try {
    const result = await RankingService.processClassTypeRankings(classTypeId);

    return {
      success: true,
      message: `Processed ${result.processedStudents} students`,
      gold: result.gold,
      silver: result.silver,
      bronze: result.bronze,
      top10: result.top10,
      processedStudents: result.processedStudents,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export const processOlympiadRankings = async (
  _: unknown,
  { olympiadId }: { olympiadId: string }
) => {
  try {
    const result = await RankingService.processOlympiadRankings(olympiadId);

    return {
      success: true,
      message: `Processed ${result.classTypesProcessed} class types and ${result.totalStudentsProcessed} students`,
      classTypesProcessed: result.classTypesProcessed,
      totalStudentsProcessed: result.totalStudentsProcessed,
      results: result.results,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export const getClassTypeRankingStats = async (
  _: unknown,
  { classTypeId }: { classTypeId: string }
) => {
  try {
    const stats = await RankingService.getClassTypeRankingStats(classTypeId);
    return stats;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
