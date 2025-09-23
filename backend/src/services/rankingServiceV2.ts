import { StudentAnswerModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { StudentModel } from "@/models";
import { OlympiadModel } from "@/models";
import { MedalCalculator } from "@/utils/medalCalculator";
import { TransactionHelper } from "@/utils/transactionHelper";
import {
  RankingResult,
  OlympiadRankingResult,
  ClassTypeRankingStats,
  RankingError,
  RANKING_ERROR_CODES,
  RankingProcessingOptions,
  StudentRankingInfo,
  MedalDistribution,
} from "@/types/ranking.types";
import { Context } from "@/types/context";
import mongoose from "mongoose";

/**
 * Improved RankingService with proper error handling, transactions, and performance optimizations
 *
 * Key improvements:
 * - Proper TypeScript types
 * - Database transaction support
 * - Centralized medal calculation logic
 * - Standardized error handling
 * - Performance optimizations with batching
 * - Comprehensive logging
 * - Input validation
 */
export class RankingServiceV2 {
  /**
   * Process rankings for a specific ClassType with full transaction support
   *
   * @param classTypeId - ID of the class type to process
   * @param options - Processing options
   * @returns Promise<RankingResult>
   */
  static async processClassTypeRankings(
    classTypeId: string,
    options: RankingProcessingOptions = {},
    context?: Context
  ): Promise<RankingResult> {
    const startTime = Date.now();
    const {
      batchSize = 1000,
      useTransactions = true,
      retryCount = 3,
      skipValidation = false,
    } = options;

    console.log(
      `🔍 Processing rankings for ClassType: ${classTypeId} at ${new Date().toISOString()}`,
      {
        batchSize,
        useTransactions,
        retryCount,
      }
    );

    try {
      // Validate input
      if (!mongoose.Types.ObjectId.isValid(classTypeId)) {
        throw new RankingError(
          "Invalid ClassType ID format",
          RANKING_ERROR_CODES.VALIDATION_ERROR,
          { classTypeId }
        );
      }

      // Get class type with validation
      const classType = await ClassTypeModel.findById(classTypeId);
      if (!classType) {
        throw new RankingError(
          "ClassType not found",
          RANKING_ERROR_CODES.CLASS_TYPE_NOT_FOUND,
          { classTypeId }
        );
      }

      // Get student answers with pagination support
      const studentAnswers = await this.getStudentAnswersPaginated(
        classTypeId,
        batchSize
      );

      console.log(
        `📊 Found ${studentAnswers.length} student answers for ClassType ${classTypeId}`
      );

      if (studentAnswers.length === 0) {
        return this.createEmptyRankingResult(classType.medalists);
      }

      // Calculate medal distribution
      const medalDistribution = MedalCalculator.calculateMedalDistribution(
        studentAnswers.length,
        classType.medalists
      );

      // Validate distribution if not skipped
      if (!skipValidation) {
        MedalCalculator.validateMedalDistribution(
          medalDistribution,
          studentAnswers.length
        );
      }

      console.log("🏆 Medal distribution calculated:", medalDistribution);

      // Process rankings with or without transactions
      if (useTransactions) {
        return await this.processRankingsWithTransaction(
          classTypeId,
          studentAnswers,
          medalDistribution,
          classType.olympiadId.toString(),
          startTime,
          context
        );
      } else {
        return await this.processRankingsWithoutTransaction(
          classTypeId,
          studentAnswers,
          medalDistribution,
          classType.olympiadId.toString(),
          startTime,
          context
        );
      }
    } catch (error) {
      console.error(
        "Error processing ClassType rankings:",
        error instanceof Error ? error.stack : error
      );

      if (error instanceof RankingError) {
        throw error;
      }

      throw new RankingError(
        `Failed to process rankings: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        RANKING_ERROR_CODES.PROCESSING_FAILED,
        { classTypeId, error }
      );
    }
  }

  /**
   * Process rankings for all ClassTypes in an Olympiad
   *
   * @param olympiadId - ID of the olympiad to process
   * @param options - Processing options
   * @returns Promise<OlympiadRankingResult>
   */
  static async processOlympiadRankings(
    olympiadId: string,
    options: RankingProcessingOptions = {},
    context?: Context
  ): Promise<OlympiadRankingResult> {
    const startTime = Date.now();

    console.log(`🏆 Starting olympiad ranking processing for: ${olympiadId}`);

    try {
      // Validate input
      if (!mongoose.Types.ObjectId.isValid(olympiadId)) {
        throw new RankingError(
          "Invalid Olympiad ID format",
          RANKING_ERROR_CODES.VALIDATION_ERROR,
          { olympiadId }
        );
      }

      // Get class types
      const classTypes = await ClassTypeModel.find({ olympiadId });
      console.log(
        `📚 Found ${classTypes.length} class types for olympiad ${olympiadId}`
      );

      if (classTypes.length === 0) {
        return {
          classTypesProcessed: 0,
          totalStudentsProcessed: 0,
          results: [],
          processingTime: Date.now() - startTime,
        };
      }

      // Process all class types in parallel with error handling
      const results = await Promise.allSettled(
        classTypes.map((classType) =>
          this.processClassTypeRankings(
            classType._id.toString(),
            options,
            context
          )
        )
      );

      // Separate successful and failed results
      const successfulResults: RankingResult[] = [];
      const failedResults: { classTypeId: string; error: string }[] = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          successfulResults.push(result.value);
        } else {
          failedResults.push({
            classTypeId: classTypes[index]._id.toString(),
            error:
              result.reason instanceof Error
                ? result.reason.message
                : "Unknown error",
          });
        }
      });

      // Log failed results
      if (failedResults.length > 0) {
        console.error("❌ Some class types failed to process:", failedResults);
      }

      const totalStudentsProcessed = successfulResults.reduce(
        (sum, r) => sum + r.processedStudents,
        0
      );

      const processingTime = Date.now() - startTime;

      console.log(
        `✅ Olympiad ranking processing completed: ${successfulResults.length}/${classTypes.length} class types, ${totalStudentsProcessed} students processed in ${processingTime}ms`
      );

      return {
        classTypesProcessed: successfulResults.length,
        totalStudentsProcessed,
        results: successfulResults,
        processingTime,
      };
    } catch (error) {
      console.error(
        "Error processing Olympiad rankings:",
        error instanceof Error ? error.stack : error
      );

      if (error instanceof RankingError) {
        throw error;
      }

      throw new RankingError(
        `Failed to process olympiad rankings: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        RANKING_ERROR_CODES.PROCESSING_FAILED,
        { olympiadId, error }
      );
    }
  }

  /**
   * Get ranking statistics for a ClassType
   *
   * @param classTypeId - ID of the class type
   * @returns Promise<ClassTypeRankingStats>
   */
  static async getClassTypeRankingStats(
    classTypeId: string
  ): Promise<ClassTypeRankingStats> {
    const startTime = Date.now();

    try {
      // Validate input
      if (!mongoose.Types.ObjectId.isValid(classTypeId)) {
        throw new RankingError(
          "Invalid ClassType ID format",
          RANKING_ERROR_CODES.VALIDATION_ERROR,
          { classTypeId }
        );
      }

      const classType = await ClassTypeModel.findById(classTypeId);
      if (!classType) {
        throw new RankingError(
          "ClassType not found",
          RANKING_ERROR_CODES.CLASS_TYPE_NOT_FOUND,
          { classTypeId }
        );
      }

      const studentAnswers = await StudentAnswerModel.find({ classTypeId });

      if (studentAnswers.length === 0) {
        return {
          totalParticipants: 0,
          medalists: classType.medalists,
          goldCount: 0,
          silverCount: 0,
          bronzeCount: 0,
          top10Count: 0,
          averageScore: 0,
          highestScore: 0,
          lowestScore: 0,
          processingTime: Date.now() - startTime,
        };
      }

      const scores = studentAnswers.map(
        (answer) => answer.totalScoreofOlympiad || 0
      );
      const averageScore =
        scores.reduce((sum, score) => sum + score, 0) / scores.length;

      return {
        totalParticipants: studentAnswers.length,
        medalists: classType.medalists,
        goldCount: classType.gold?.length || 0,
        silverCount: classType.silver?.length || 0,
        bronzeCount: classType.bronze?.length || 0,
        top10Count: classType.top10?.length || 0,
        averageScore: Math.round(averageScore * 100) / 100,
        highestScore: Math.max(...scores),
        lowestScore: Math.min(...scores),
        processingTime: Date.now() - startTime,
      };
    } catch (error) {
      console.error(
        "Error getting ClassType ranking stats:",
        error instanceof Error ? error.stack : error
      );

      if (error instanceof RankingError) {
        throw error;
      }

      throw new RankingError(
        `Failed to get ranking stats: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        RANKING_ERROR_CODES.PROCESSING_FAILED,
        { classTypeId, error }
      );
    }
  }

  /**
   * Get student answers with pagination support
   *
   * @param classTypeId - Class type ID
   * @param batchSize - Batch size for pagination
   * @returns Promise<any[]>
   */
  private static async getStudentAnswersPaginated(
    classTypeId: string,
    batchSize: number
  ): Promise<any[]> {
    // For now, we'll load all data, but this can be extended for true pagination
    // In a real implementation, you might want to process in batches
    return StudentAnswerModel.find({ classTypeId })
      .populate("studentId", "name email ranking")
      .sort({ totalScoreofOlympiad: -1 })
      .lean(); // Use lean() for better performance
  }

  /**
   * Create empty ranking result
   *
   * @param totalMedalists - Total medalists limit
   * @returns RankingResult
   */
  private static createEmptyRankingResult(
    totalMedalists: number
  ): RankingResult {
    return {
      gold: [],
      silver: [],
      bronze: [],
      top10: [],
      processedStudents: 0,
      medalDistribution: {
        goldCount: 0,
        silverCount: 0,
        bronzeCount: 0,
        top10Count: 0,
        totalMedalists,
      },
      studentRankings: [],
    };
  }

  /**
   * Process rankings with transaction support
   *
   * @param classTypeId - Class type ID
   * @param studentAnswers - Student answers
   * @param medalDistribution - Medal distribution
   * @param olympiadId - Olympiad ID
   * @param startTime - Processing start time
   * @returns Promise<RankingResult>
   */
  private static async processRankingsWithTransaction(
    classTypeId: string,
    studentAnswers: any[],
    medalDistribution: MedalDistribution,
    olympiadId: string,
    startTime: number,
    context?: Context
  ): Promise<RankingResult> {
    // Get current class type to preserve existing medal assignments BEFORE starting transaction
    const currentClassType = await ClassTypeModel.findById(classTypeId);

    return TransactionHelper.withTransaction(async (session) => {
      // Check if there are any manual medal assignments
      const hasManualAssignments = !!(
        (currentClassType?.gold && currentClassType.gold.length > 0) ||
        (currentClassType?.silver && currentClassType.silver.length > 0) ||
        (currentClassType?.bronze && currentClassType.bronze.length > 0) ||
        (currentClassType?.top10 && currentClassType.top10.length > 0)
      );

      // Use existing medal assignments if they exist, otherwise use automatic assignments
      const medalAssignments: any = {};

      if (hasManualAssignments) {
        // If there are ANY manual assignments, use ONLY manual assignments (no automatic)
        console.log(
          `🎯 Manual assignments detected - using ONLY manual assignments, no automatic assignments`
        );

        medalAssignments.gold = currentClassType?.gold || [];
        medalAssignments.silver = currentClassType?.silver || [];
        medalAssignments.bronze = currentClassType?.bronze || [];
        medalAssignments.top10 = currentClassType?.top10 || [];

        console.log(`✅ Using ONLY manual assignments:`, {
          gold: medalAssignments.gold.length,
          silver: medalAssignments.silver.length,
          bronze: medalAssignments.bronze.length,
          top10: medalAssignments.top10.length,
        });
      } else {
        // Only use automatic assignments if there are NO manual assignments at all
        console.log(
          `🔄 No manual assignments found - using automatic assignments`
        );

        medalAssignments.gold = this.extractStudentIds(
          studentAnswers,
          0,
          medalDistribution.goldCount
        );
        medalAssignments.silver = this.extractStudentIds(
          studentAnswers,
          medalDistribution.goldCount,
          medalDistribution.goldCount + medalDistribution.silverCount
        );
        medalAssignments.bronze = this.extractStudentIds(
          studentAnswers,
          medalDistribution.goldCount + medalDistribution.silverCount,
          medalDistribution.goldCount +
            medalDistribution.silverCount +
            medalDistribution.bronzeCount
        );
        medalAssignments.top10 = this.extractStudentIds(
          studentAnswers,
          0,
          medalDistribution.top10Count
        );

        console.log(`🔄 Using automatic assignments:`, {
          gold: medalAssignments.gold.length,
          silver: medalAssignments.silver.length,
          bronze: medalAssignments.bronze.length,
          top10: medalAssignments.top10.length,
        });
      }

      console.log(`🏆 Using medal assignments for ClassType ${classTypeId}:`, {
        gold: medalAssignments.gold.length,
        silver: medalAssignments.silver.length,
        bronze: medalAssignments.bronze.length,
        top10: medalAssignments.top10.length,
        source: hasManualAssignments ? "manual" : "automatic",
      });

      console.log(`🔍 Current ClassType medal data:`, {
        gold: currentClassType?.gold || "undefined",
        silver: currentClassType?.silver || "undefined",
        bronze: currentClassType?.bronze || "undefined",
        top10: currentClassType?.top10 || "undefined",
        goldLength: currentClassType?.gold?.length || 0,
        silverLength: currentClassType?.silver?.length || 0,
        bronzeLength: currentClassType?.bronze?.length || 0,
        top10Length: currentClassType?.top10?.length || 0,
      });

      console.log(`🔍 Manual assignment check:`, {
        hasGold: !!(currentClassType?.gold && currentClassType.gold.length > 0),
        hasSilver: !!(
          currentClassType?.silver && currentClassType.silver.length > 0
        ),
        hasBronze: !!(
          currentClassType?.bronze && currentClassType.bronze.length > 0
        ),
        hasTop10: !!(
          currentClassType?.top10 && currentClassType.top10.length > 0
        ),
        hasManualAssignments: hasManualAssignments,
      });

      // Update class type with medal assignments (preserving manual assignments if they exist)
      await ClassTypeModel.findByIdAndUpdate(classTypeId, medalAssignments, {
        session,
        new: true,
      });

      // Update student rankings
      await this.updateStudentRankingsWithSession(
        studentAnswers,
        olympiadId,
        medalDistribution,
        session,
        context
      );

      return this.createRankingResult(
        studentAnswers,
        medalDistribution,
        Date.now() - startTime
      );
    });
  }

  /**
   * Process rankings without transaction support (legacy mode)
   *
   * @param classTypeId - Class type ID
   * @param studentAnswers - Student answers
   * @param medalDistribution - Medal distribution
   * @param olympiadId - Olympiad ID
   * @param startTime - Processing start time
   * @returns Promise<RankingResult>
   */
  private static async processRankingsWithoutTransaction(
    classTypeId: string,
    studentAnswers: any[],
    medalDistribution: MedalDistribution,
    olympiadId: string,
    startTime: number,
    context?: Context
  ): Promise<RankingResult> {
    // Get current class type to preserve existing medal assignments
    const currentClassType = await ClassTypeModel.findById(classTypeId);

    // Check if there are any manual medal assignments
    const hasManualAssignments = !!(
      (currentClassType?.gold && currentClassType.gold.length > 0) ||
      (currentClassType?.silver && currentClassType.silver.length > 0) ||
      (currentClassType?.bronze && currentClassType.bronze.length > 0) ||
      (currentClassType?.top10 && currentClassType.top10.length > 0)
    );

    // Use existing medal assignments if they exist, otherwise use automatic assignments
    const medalAssignments: any = {};

    if (hasManualAssignments) {
      // If there are ANY manual assignments, use ONLY manual assignments (no automatic)
      console.log(
        `🎯 Manual assignments detected (no transaction) - using ONLY manual assignments, no automatic assignments`
      );

      medalAssignments.gold = currentClassType?.gold || [];
      medalAssignments.silver = currentClassType?.silver || [];
      medalAssignments.bronze = currentClassType?.bronze || [];
      medalAssignments.top10 = currentClassType?.top10 || [];

      console.log(`✅ Using ONLY manual assignments (no transaction):`, {
        gold: medalAssignments.gold.length,
        silver: medalAssignments.silver.length,
        bronze: medalAssignments.bronze.length,
        top10: medalAssignments.top10.length,
      });
    } else {
      // Only use automatic assignments if there are NO manual assignments at all
      console.log(
        `🔄 No manual assignments found (no transaction) - using automatic assignments`
      );

      medalAssignments.gold = this.extractStudentIds(
        studentAnswers,
        0,
        medalDistribution.goldCount
      );
      medalAssignments.silver = this.extractStudentIds(
        studentAnswers,
        medalDistribution.goldCount,
        medalDistribution.goldCount + medalDistribution.silverCount
      );
      medalAssignments.bronze = this.extractStudentIds(
        studentAnswers,
        medalDistribution.goldCount + medalDistribution.silverCount,
        medalDistribution.goldCount +
          medalDistribution.silverCount +
          medalDistribution.bronzeCount
      );
      medalAssignments.top10 = this.extractStudentIds(
        studentAnswers,
        0,
        medalDistribution.top10Count
      );

      console.log(`🔄 Using automatic assignments (no transaction):`, {
        gold: medalAssignments.gold.length,
        silver: medalAssignments.silver.length,
        bronze: medalAssignments.bronze.length,
        top10: medalAssignments.top10.length,
      });
    }

    console.log(
      `🏆 Using medal assignments for ClassType ${classTypeId} (no transaction):`,
      {
        gold: medalAssignments.gold.length,
        silver: medalAssignments.silver.length,
        bronze: medalAssignments.bronze.length,
        top10: medalAssignments.top10.length,
        source: hasManualAssignments ? "manual" : "automatic",
      }
    );

    console.log(`🔍 Current ClassType medal data (no transaction):`, {
      gold: currentClassType?.gold || "undefined",
      silver: currentClassType?.silver || "undefined",
      bronze: currentClassType?.bronze || "undefined",
      top10: currentClassType?.top10 || "undefined",
      goldLength: currentClassType?.gold?.length || 0,
      silverLength: currentClassType?.silver?.length || 0,
      bronzeLength: currentClassType?.bronze?.length || 0,
      top10Length: currentClassType?.top10?.length || 0,
    });

    console.log(`🔍 Manual assignment check (no transaction):`, {
      hasGold: !!(currentClassType?.gold && currentClassType.gold.length > 0),
      hasSilver: !!(
        currentClassType?.silver && currentClassType.silver.length > 0
      ),
      hasBronze: !!(
        currentClassType?.bronze && currentClassType.bronze.length > 0
      ),
      hasTop10: !!(
        currentClassType?.top10 && currentClassType.top10.length > 0
      ),
      hasManualAssignments: hasManualAssignments,
    });

    // Update class type with medal assignments (preserving manual assignments if they exist)
    await ClassTypeModel.findByIdAndUpdate(classTypeId, medalAssignments);

    // Update student rankings
    await this.updateStudentRankingsWithoutSession(
      studentAnswers,
      olympiadId,
      medalDistribution,
      context
    );

    return this.createRankingResult(
      studentAnswers,
      medalDistribution,
      Date.now() - startTime
    );
  }

  /**
   * Update student rankings with session support
   *
   * @param studentAnswers - Student answers
   * @param olympiadId - Olympiad ID
   * @param medalDistribution - Medal distribution
   * @param session - Database session
   */
  private static async updateStudentRankingsWithSession(
    studentAnswers: any[],
    olympiadId: string,
    medalDistribution: MedalDistribution,
    session: mongoose.ClientSession,
    context?: Context
  ): Promise<void> {
    const olympiad = await OlympiadModel.findById(olympiadId);
    if (!olympiad) {
      throw new RankingError(
        "Olympiad not found",
        RANKING_ERROR_CODES.OLYMPIAD_NOT_FOUND,
        { olympiadId }
      );
    }

    const scoreOfAward = olympiad.scoreOfAward || 0;

    // Get current student rankings to calculate new totals
    const studentIds = studentAnswers.map(
      (answer) => (answer.studentId as any)?._id || answer.studentId
    );

    const currentStudents = await StudentModel.find(
      { _id: { $in: studentIds } },
      { _id: 1, ranking: 1 },
      { session }
    );

    const currentRankings = new Map(
      currentStudents.map((student) => [
        student._id.toString(),
        student.ranking,
      ])
    );

    const bulkOps = this.createBulkOperations(
      studentAnswers,
      olympiadId,
      medalDistribution,
      scoreOfAward,
      context,
      currentRankings
    );

    if (bulkOps.length > 0) {
      console.log(
        `💾 Updating ${bulkOps.length} student rankings with transaction`
      );
      await StudentModel.bulkWrite(bulkOps, { session });
    }
  }

  /**
   * Update student rankings without session support
   *
   * @param studentAnswers - Student answers
   * @param olympiadId - Olympiad ID
   * @param medalDistribution - Medal distribution
   */
  private static async updateStudentRankingsWithoutSession(
    studentAnswers: any[],
    olympiadId: string,
    medalDistribution: MedalDistribution,
    context?: Context
  ): Promise<void> {
    const olympiad = await OlympiadModel.findById(olympiadId);
    if (!olympiad) {
      throw new RankingError(
        "Olympiad not found",
        RANKING_ERROR_CODES.OLYMPIAD_NOT_FOUND,
        { olympiadId }
      );
    }

    const scoreOfAward = olympiad.scoreOfAward || 0;

    // Get current student rankings to calculate new totals
    const studentIds = studentAnswers.map(
      (answer) => (answer.studentId as any)?._id || answer.studentId
    );

    const currentStudents = await StudentModel.find(
      { _id: { $in: studentIds } },
      { _id: 1, ranking: 1 }
    );

    const currentRankings = new Map(
      currentStudents.map((student) => [
        student._id.toString(),
        student.ranking,
      ])
    );

    const bulkOps = this.createBulkOperations(
      studentAnswers,
      olympiadId,
      medalDistribution,
      scoreOfAward,
      context,
      currentRankings
    );

    if (bulkOps.length > 0) {
      console.log(
        `💾 Updating ${bulkOps.length} student rankings without transaction`
      );
      await StudentModel.bulkWrite(bulkOps);
    }
  }

  /**
   * Create bulk operations for student ranking updates
   *
   * @param studentAnswers - Student answers
   * @param olympiadId - Olympiad ID
   * @param medalDistribution - Medal distribution
   * @param scoreOfAward - Score of award
   * @returns Array of bulk operations
   */
  private static createBulkOperations(
    studentAnswers: any[],
    olympiadId: string,
    medalDistribution: MedalDistribution,
    scoreOfAward: number,
    context?: Context,
    currentRankings?: Map<string, number>
  ): mongoose.AnyBulkWriteOperation<any>[] {
    return studentAnswers.map((answer, index) => {
      const studentId = (answer.studentId as any)?._id || answer.studentId;
      const position = index + 1;

      const medalType = MedalCalculator.getMedalTypeForPosition(
        position,
        medalDistribution
      );

      const rankingPoints = MedalCalculator.calculateRankingPoints(
        medalType,
        scoreOfAward
      );

      const isTop10 = position <= medalDistribution.top10Count;

      // Get current ranking and calculate new total
      const currentRanking = currentRankings?.get(studentId.toString()) || 0;
      const newTotalRanking = currentRanking + rankingPoints;

      const updateObj: any = {
        $inc: { ranking: rankingPoints },
        $addToSet: { participatedOlympiads: olympiadId },
        $push: {
          rankingHistory: {
            changedBy: rankingPoints, // Points gained (the difference)
            changedTo: newTotalRanking, // New total ranking (current + points gained)
            reason: `Olympiad performance - ${
              medalType ? medalType.toUpperCase() + " medal" : "No medal"
            } (+${rankingPoints} points)`,
            olympiadId,
            date: new Date(),
            pointsGained: rankingPoints,
          },
        },
      };

      // Add medal to student's medal array
      if (medalType && medalType !== "top10") {
        updateObj.$addToSet = {
          ...updateObj.$addToSet,
          [medalType]: olympiadId,
        };
      }

      // Add to top10 if applicable
      if (isTop10) {
        updateObj.$addToSet = {
          ...updateObj.$addToSet,
          top10: olympiadId,
        };
      }

      return {
        updateOne: {
          filter: { _id: studentId },
          update: updateObj,
        },
      };
    });
  }

  /**
   * Extract student IDs from a range of student answers
   *
   * @param studentAnswers - Student answers
   * @param startIndex - Start index
   * @param endIndex - End index
   * @returns Array of student IDs
   */
  private static extractStudentIds(
    studentAnswers: any[],
    startIndex: number,
    endIndex: number
  ): string[] {
    return studentAnswers.slice(startIndex, endIndex).map((answer) => {
      const studentId = (answer.studentId as any)?._id || answer.studentId;
      return studentId.toString();
    });
  }

  /**
   * Create ranking result from processed data
   *
   * @param studentAnswers - Student answers
   * @param medalDistribution - Medal distribution
   * @param processingTime - Processing time in milliseconds
   * @returns RankingResult
   */
  private static createRankingResult(
    studentAnswers: any[],
    medalDistribution: MedalDistribution,
    processingTime: number
  ): RankingResult {
    const studentRankings: StudentRankingInfo[] = studentAnswers.map(
      (answer, index) => {
        const studentId = (answer.studentId as any)?._id || answer.studentId;
        const studentName = (answer.studentId as any)?.name || "Unknown";
        const score = answer.totalScoreofOlympiad || 0;
        const position = index + 1;
        const medalType = MedalCalculator.getMedalTypeForPosition(
          position,
          medalDistribution
        );

        return {
          studentId: studentId.toString(),
          studentName,
          score,
          rank: position,
          medalType: medalType || undefined,
        };
      }
    );

    return {
      gold: this.extractStudentIds(
        studentAnswers,
        0,
        medalDistribution.goldCount
      ),
      silver: this.extractStudentIds(
        studentAnswers,
        medalDistribution.goldCount,
        medalDistribution.goldCount + medalDistribution.silverCount
      ),
      bronze: this.extractStudentIds(
        studentAnswers,
        medalDistribution.goldCount + medalDistribution.silverCount,
        medalDistribution.goldCount +
          medalDistribution.silverCount +
          medalDistribution.bronzeCount
      ),
      top10: this.extractStudentIds(
        studentAnswers,
        0,
        medalDistribution.top10Count
      ),
      processedStudents: studentAnswers.length,
      medalDistribution,
      studentRankings,
    };
  }
}
