import { Types } from "mongoose";

/**
 * Configuration constants for ranking calculations
 */
export const RANKING_CONFIG = {
  GOLD_PERCENTAGE: 0.1,
  SILVER_PERCENTAGE: 0.2,
  BRONZE_PERCENTAGE: 0.3,
  TOP10_LIMIT: 10,
  BATCH_SIZE: 1000,
  MAX_RETRIES: 3,
} as const;

/**
 * Medal distribution result
 */
export interface MedalDistribution {
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
  top10Count: number;
  totalMedalists: number;
}

/**
 * Student ranking information
 */
export interface StudentRankingInfo {
  studentId: string;
  studentName: string;
  score: number;
  rank: number;
  medalType?: "gold" | "silver" | "bronze" | "top10";
}

/**
 * Ranking result with proper typing
 */
export interface RankingResult {
  gold: string[];
  silver: string[];
  bronze: string[];
  top10: string[];
  processedStudents: number;
  medalDistribution: MedalDistribution;
  studentRankings: StudentRankingInfo[];
  processingTime?: number;
}

/**
 * Olympiad ranking processing result
 */
export interface OlympiadRankingResult {
  classTypesProcessed: number;
  totalStudentsProcessed: number;
  results: RankingResult[];
  processingTime: number;
}

/**
 * Class type ranking statistics
 */
export interface ClassTypeRankingStats {
  totalParticipants: number;
  medalists: number;
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
  top10Count: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  processingTime: number;
}

/**
 * Custom error class for ranking operations
 */
export class RankingError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = "RankingError";
  }
}

/**
 * Error codes for ranking operations
 */
export const RANKING_ERROR_CODES = {
  CLASS_TYPE_NOT_FOUND: "CLASS_TYPE_NOT_FOUND",
  OLYMPIAD_NOT_FOUND: "OLYMPIAD_NOT_FOUND",
  INVALID_MEDAL_DISTRIBUTION: "INVALID_MEDAL_DISTRIBUTION",
  PROCESSING_FAILED: "PROCESSING_FAILED",
  TRANSACTION_FAILED: "TRANSACTION_FAILED",
  VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

/**
 * Processing options for ranking operations
 */
export interface RankingProcessingOptions {
  batchSize?: number;
  useTransactions?: boolean;
  retryCount?: number;
  skipValidation?: boolean;
}
