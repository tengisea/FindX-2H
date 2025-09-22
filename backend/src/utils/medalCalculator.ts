import {
  RANKING_CONFIG,
  MedalDistribution,
  RankingError,
  RANKING_ERROR_CODES,
} from "@/types/ranking.types";

/**
 * Utility class for calculating medal distributions
 * Centralizes all medal calculation logic to prevent duplication
 */
export class MedalCalculator {
  /**
   * Calculate medal distribution based on total students and medalists
   *
   * Business Rules:
   * 1. Gold medals: 10% of participants (minimum 1 if participants > 0)
   * 2. Silver medals: 20% of participants
   * 3. Bronze medals: 30% of participants
   * 4. Total medals cannot exceed the medalists limit
   * 5. If total medals < medalists limit, remaining medals go to bronze
   * 6. Top 10 is limited to 10 students or total participants, whichever is smaller
   *
   * @param totalStudents - Total number of students participating
   * @param totalMedalists - Maximum number of medals that can be awarded
   * @returns MedalDistribution object with calculated counts
   */
  static calculateMedalDistribution(
    totalStudents: number,
    totalMedalists: number
  ): MedalDistribution {
    // Validate inputs
    if (totalStudents < 0) {
      throw new RankingError(
        "Total students cannot be negative",
        RANKING_ERROR_CODES.VALIDATION_ERROR,
        { totalStudents }
      );
    }

    if (totalMedalists < 0) {
      throw new RankingError(
        "Total medalists cannot be negative",
        RANKING_ERROR_CODES.VALIDATION_ERROR,
        { totalMedalists }
      );
    }

    if (totalStudents === 0) {
      return {
        goldCount: 0,
        silverCount: 0,
        bronzeCount: 0,
        top10Count: 0,
        totalMedalists,
      };
    }

    // Calculate initial medal counts based on percentages
    let goldCount = Math.ceil(totalStudents * RANKING_CONFIG.GOLD_PERCENTAGE);
    let silverCount = Math.ceil(
      totalStudents * RANKING_CONFIG.SILVER_PERCENTAGE
    );
    let bronzeCount = Math.ceil(
      totalStudents * RANKING_CONFIG.BRONZE_PERCENTAGE
    );

    // Ensure minimum 1 gold medal if there are participants
    if (totalStudents > 0 && goldCount === 0) {
      goldCount = 1;
    }

    // Adjust counts to not exceed totalMedalists limit
    if (goldCount > totalMedalists) {
      goldCount = totalMedalists;
    }

    if (goldCount + silverCount > totalMedalists) {
      silverCount = Math.max(0, totalMedalists - goldCount);
    }

    if (goldCount + silverCount + bronzeCount > totalMedalists) {
      bronzeCount = Math.max(0, totalMedalists - goldCount - silverCount);
    }

    // Check if we have leftover medals and assign them to bronze
    const totalGiven = goldCount + silverCount + bronzeCount;
    if (totalGiven < totalMedalists) {
      bronzeCount += totalMedalists - totalGiven;
    }

    // Calculate top 10 count
    const top10Count = Math.min(RANKING_CONFIG.TOP10_LIMIT, totalStudents);

    // Validate the distribution
    const finalTotal = goldCount + silverCount + bronzeCount;
    if (finalTotal > totalMedalists) {
      throw new RankingError(
        `Calculated medal distribution exceeds limit: ${finalTotal} > ${totalMedalists}`,
        RANKING_ERROR_CODES.INVALID_MEDAL_DISTRIBUTION,
        {
          goldCount,
          silverCount,
          bronzeCount,
          totalMedalists,
          totalStudents,
        }
      );
    }

    return {
      goldCount,
      silverCount,
      bronzeCount,
      top10Count,
      totalMedalists,
    };
  }

  /**
   * Calculate ranking points based on position and olympiad score
   *
   * Formula: (scoreOfAward * positionMultiplier) / 10
   * Where positionMultiplier = max(0, 11 - position)
   *
   * @param position - Student's rank position (1-based)
   * @param scoreOfAward - Base score for the olympiad
   * @returns Calculated ranking points
   */
  static calculateRankingPoints(
    position: number,
    scoreOfAward: number
  ): number {
    if (position < 1) {
      throw new RankingError(
        "Position must be at least 1",
        RANKING_ERROR_CODES.VALIDATION_ERROR,
        { position }
      );
    }

    if (scoreOfAward < 0) {
      throw new RankingError(
        "Score of award cannot be negative",
        RANKING_ERROR_CODES.VALIDATION_ERROR,
        { scoreOfAward }
      );
    }

    const positionMultiplier = Math.max(0, 11 - position);
    return Math.round((scoreOfAward * positionMultiplier) / 10);
  }

  /**
   * Validate medal distribution for consistency
   *
   * @param distribution - Medal distribution to validate
   * @param totalStudents - Total number of students
   * @returns true if valid, throws error if invalid
   */
  static validateMedalDistribution(
    distribution: MedalDistribution,
    totalStudents: number
  ): boolean {
    const { goldCount, silverCount, bronzeCount, top10Count, totalMedalists } =
      distribution;

    // Check for negative values
    if (goldCount < 0 || silverCount < 0 || bronzeCount < 0 || top10Count < 0) {
      throw new RankingError(
        "Medal counts cannot be negative",
        RANKING_ERROR_CODES.INVALID_MEDAL_DISTRIBUTION,
        distribution
      );
    }

    // Check if total medals exceed limit
    const totalMedals = goldCount + silverCount + bronzeCount;
    if (totalMedals > totalMedalists) {
      throw new RankingError(
        `Total medals (${totalMedals}) exceed limit (${totalMedalists})`,
        RANKING_ERROR_CODES.INVALID_MEDAL_DISTRIBUTION,
        distribution
      );
    }

    // Check if medal counts exceed student count
    if (
      goldCount > totalStudents ||
      silverCount > totalStudents ||
      bronzeCount > totalStudents
    ) {
      throw new RankingError(
        "Medal counts cannot exceed total students",
        RANKING_ERROR_CODES.INVALID_MEDAL_DISTRIBUTION,
        { distribution, totalStudents }
      );
    }

    // Check top10 count
    if (top10Count > Math.min(RANKING_CONFIG.TOP10_LIMIT, totalStudents)) {
      throw new RankingError(
        "Top10 count exceeds maximum allowed",
        RANKING_ERROR_CODES.INVALID_MEDAL_DISTRIBUTION,
        { top10Count, totalStudents }
      );
    }

    return true;
  }

  /**
   * Get medal type for a given position
   *
   * @param position - Student's position (1-based)
   * @param distribution - Medal distribution
   * @returns Medal type or null if no medal
   */
  static getMedalTypeForPosition(
    position: number,
    distribution: MedalDistribution
  ): "gold" | "silver" | "bronze" | "top10" | null {
    const { goldCount, silverCount, bronzeCount, top10Count } = distribution;

    if (position <= goldCount) {
      return "gold";
    } else if (position <= goldCount + silverCount) {
      return "silver";
    } else if (position <= goldCount + silverCount + bronzeCount) {
      return "bronze";
    } else if (position <= top10Count) {
      return "top10";
    }

    return null;
  }
}
