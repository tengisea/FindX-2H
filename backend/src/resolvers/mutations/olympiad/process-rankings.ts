import { RankingServiceV2 } from "@/services/rankingServiceV2";
import { GraphQLError } from "graphql";
import { RankingError, RANKING_ERROR_CODES } from "@/types/ranking.types";

export const processClassTypeRankings = async (
  _: unknown,
  {
    classTypeId,
    options,
  }: {
    classTypeId: string;
    options?: {
      batchSize?: number;
      useTransactions?: boolean;
      retryCount?: number;
      skipValidation?: boolean;
    };
  }
) => {
  try {
    const result = await RankingServiceV2.processClassTypeRankings(
      classTypeId,
      options
    );

    return {
      success: true,
      message: `Processed ${result.processedStudents} students`,
      gold: result.gold,
      silver: result.silver,
      bronze: result.bronze,
      top10: result.top10,
      processedStudents: result.processedStudents,
      medalDistribution: result.medalDistribution,
      studentRankings: result.studentRankings,
      processingTime: result.processingTime || 0,
    };
  } catch (error: any) {
    if (error instanceof RankingError) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.code,
          context: error.context,
        },
      });
    }
    throw new GraphQLError(error.message || "Unknown error occurred");
  }
};

export const processOlympiadRankings = async (
  _: unknown,
  {
    olympiadId,
    options,
  }: {
    olympiadId: string;
    options?: {
      batchSize?: number;
      useTransactions?: boolean;
      retryCount?: number;
      skipValidation?: boolean;
    };
  }
) => {
  try {
    const result = await RankingServiceV2.processOlympiadRankings(
      olympiadId,
      options
    );

    return {
      success: true,
      message: `Processed ${result.classTypesProcessed} class types and ${result.totalStudentsProcessed} students`,
      classTypesProcessed: result.classTypesProcessed,
      totalStudentsProcessed: result.totalStudentsProcessed,
      results: result.results,
      processingTime: result.processingTime,
    };
  } catch (error: any) {
    if (error instanceof RankingError) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.code,
          context: error.context,
        },
      });
    }
    throw new GraphQLError(error.message || "Unknown error occurred");
  }
};

export const getClassTypeRankingStats = async (
  _: unknown,
  { classTypeId }: { classTypeId: string }
) => {
  try {
    const stats = await RankingServiceV2.getClassTypeRankingStats(classTypeId);
    return stats;
  } catch (error: any) {
    if (error instanceof RankingError) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.code,
          context: error.context,
        },
      });
    }
    throw new GraphQLError(error.message || "Unknown error occurred");
  }
};
