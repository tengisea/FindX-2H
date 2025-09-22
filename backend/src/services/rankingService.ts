import { StudentAnswerModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { StudentModel } from "@/models";
import { OlympiadModel } from "@/models";
import { RankingServiceV2 } from "./rankingServiceV2";
import {
  RankingResult,
  OlympiadRankingResult,
  ClassTypeRankingStats,
  RankingProcessingOptions,
} from "@/types/ranking.types";

/**
 * @deprecated Use RankingServiceV2 instead. This class is kept for backward compatibility.
 * The new implementation provides:
 * - Proper TypeScript types
 * - Database transaction support
 * - Centralized medal calculation logic
 * - Standardized error handling
 * - Performance optimizations
 */
export class RankingService {
  /**
   * Process rankings for a specific ClassType
   * @deprecated Use RankingServiceV2.processClassTypeRankings instead
   */
  static async processClassTypeRankings(
    classTypeId: string,
    options?: RankingProcessingOptions
  ): Promise<RankingResult> {
    console.warn(
      "⚠️ RankingService.processClassTypeRankings is deprecated. Use RankingServiceV2 instead."
    );
    return RankingServiceV2.processClassTypeRankings(classTypeId, options);
  }

  /**
   * Process rankings for all ClassTypes in an Olympiad
   * @deprecated Use RankingServiceV2.processOlympiadRankings instead
   */
  static async processOlympiadRankings(
    olympiadId: string,
    options?: RankingProcessingOptions
  ): Promise<OlympiadRankingResult> {
    console.warn(
      "⚠️ RankingService.processOlympiadRankings is deprecated. Use RankingServiceV2 instead."
    );
    return RankingServiceV2.processOlympiadRankings(olympiadId, options);
  }

  /**
   * Get ranking statistics for a ClassType
   * @deprecated Use RankingServiceV2.getClassTypeRankingStats instead
   */
  static async getClassTypeRankingStats(
    classTypeId: string
  ): Promise<ClassTypeRankingStats> {
    console.warn(
      "⚠️ RankingService.getClassTypeRankingStats is deprecated. Use RankingServiceV2 instead."
    );
    return RankingServiceV2.getClassTypeRankingStats(classTypeId);
  }
}
