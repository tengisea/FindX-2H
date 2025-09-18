import { StudentAnswerModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { StudentModel } from "@/models";
import { OlympiadModel } from "@/models";

export interface RankingResult {
  gold: string[];
  silver: string[];
  bronze: string[];
  top10: string[];
  processedStudents: number;
}

export class RankingService {
  /**
   * Process rankings for a specific ClassType
   */
  static async processClassTypeRankings(
    classTypeId: string
  ): Promise<RankingResult> {
    try {
      console.log(`🔍 Processing rankings for ClassType: ${classTypeId}`);

      const classType = await ClassTypeModel.findById(classTypeId);
      if (!classType) {
        throw new Error("ClassType not found");
      }

      const studentAnswers = await StudentAnswerModel.find({ classTypeId })
        .populate("studentId", "name email ranking")
        .sort({ totalScoreofOlympiad: -1 });

      console.log(
        `📊 Found ${studentAnswers.length} student answers for ClassType ${classTypeId}`
      );

      if (studentAnswers.length === 0) {
        return {
          gold: [],
          silver: [],
          bronze: [],
          top10: [],
          processedStudents: 0,
        };
      }

      const medalists = classType.medalists;
      const totalStudents = studentAnswers.length;

      const goldCount = Math.min(Math.ceil(totalStudents * 0.1), medalists);
      const silverCount = Math.min(
        Math.ceil(totalStudents * 0.2),
        medalists - goldCount
      );
      const bronzeCount = Math.min(
        Math.ceil(totalStudents * 0.3),
        medalists - goldCount - silverCount
      );
      const top10Count = Math.min(10, totalStudents);

      console.log(
        `🏆 Medal counts - Gold: ${goldCount}, Silver: ${silverCount}, Bronze: ${bronzeCount}, Top10: ${top10Count}`
      );

      const gold: string[] = [];
      const silver: string[] = [];
      const bronze: string[] = [];
      const top10: string[] = [];

      studentAnswers.forEach((answer, index) => {
        const studentId = answer.studentId.toString();

        if (index < top10Count) top10.push(studentId);

        if (index < goldCount) gold.push(studentId);
        else if (index < goldCount + silverCount) silver.push(studentId);
        else if (index < goldCount + silverCount + bronzeCount)
          bronze.push(studentId);
      });

      await ClassTypeModel.findByIdAndUpdate(classTypeId, {
        gold,
        silver,
        bronze,
        top10,
      });

      await this.updateStudentRankings(
        studentAnswers,
        classType.olympiadId.toString(),
        { goldCount, silverCount, bronzeCount, top10Count }
      );

      return {
        gold,
        silver,
        bronze,
        top10,
        processedStudents: studentAnswers.length,
      };
    } catch (error) {
      console.error(
        "Error processing ClassType rankings:",
        error instanceof Error ? error.stack : error
      );
      throw error;
    }
  }

  /**
   * Update student rankings based on their performance
   */
  private static async updateStudentRankings(
    studentAnswers: any[],
    olympiadId: string,
    medalCounts: {
      goldCount: number;
      silverCount: number;
      bronzeCount: number;
      top10Count: number;
    }
  ): Promise<void> {
    try {
      const olympiad = await OlympiadModel.findById(olympiadId);
      if (!olympiad) throw new Error("Olympiad not found");

      const scoreOfAward = olympiad.scoreOfAward || 0;
      const { goldCount, silverCount, bronzeCount, top10Count } = medalCounts;

      // First, get current rankings for all students
      const studentIds = studentAnswers.map(
        (answer) => answer.studentId._id || answer.studentId
      );
      const currentStudents = await StudentModel.find(
        { _id: { $in: studentIds } },
        { _id: 1, ranking: 1 }
      );
      const currentRankings = new Map(
        currentStudents.map((s) => [s._id.toString(), s.ranking])
      );

      const bulkOps = studentAnswers.map((answer, i) => {
        const studentId = answer.studentId._id || answer.studentId;
        const position = i + 1;
        const rankingPoints = this.calculateRankingPoints(
          position,
          scoreOfAward
        );

        const currentRanking = currentRankings.get(studentId.toString()) || 0;
        const newRanking = currentRanking + rankingPoints;

        // Determine medal type based on position
        let medalType = null;
        if (i < goldCount) medalType = "gold";
        else if (i < goldCount + silverCount) medalType = "silver";
        else if (i < goldCount + silverCount + bronzeCount)
          medalType = "bronze";

        const isTop10 = i < top10Count;

        // Build update object
        const updateObj: any = {
          $inc: { ranking: rankingPoints },
          $addToSet: { participatedOlympiads: olympiadId },
          $push: {
            rankingHistory: {
              changedBy: newRanking - currentRanking, // System update (null for automatic ranking changes)
              changedTo: newRanking, // Show the new total ranking score
              reason: `Olympiad performance - Position ${position} (${currentRanking} → ${newRanking}, +${rankingPoints})`,
              olympiadId,
              date: new Date(),
              pointsGained: rankingPoints, // Show how many points were gained
            },
          },
        };

        // Add medal to student's medal array
        if (medalType) {
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

      if (bulkOps.length > 0) {
        console.log(`💾 Updating ${bulkOps.length} student rankings`);
        const result = await StudentModel.bulkWrite(bulkOps);
        console.log(`✅ Bulk write result:`, result);
      } else {
        console.log(`⚠️ No student ranking updates to perform`);
      }
    } catch (error) {
      console.error(
        "Error updating student rankings:",
        error instanceof Error ? error.stack : error
      );
      throw error;
    }
  }

  /**
   * Calculate ranking points based on position and olympiad score
   */
  private static calculateRankingPoints(
    position: number,
    scoreOfAward: number
  ): number {
    const positionMultiplier = Math.max(0, 11 - position);
    return Math.round((scoreOfAward * positionMultiplier) / 10);
  }

  /**
   * Process rankings for all ClassTypes in an Olympiad
   */
  static async processOlympiadRankings(olympiadId: string): Promise<{
    classTypesProcessed: number;
    totalStudentsProcessed: number;
    results: RankingResult[];
  }> {
    try {
      console.log(`🏆 Starting olympiad ranking processing for: ${olympiadId}`);

      const classTypes = await ClassTypeModel.find({ olympiadId });
      console.log(
        `📚 Found ${classTypes.length} class types for olympiad ${olympiadId}`
      );

      const results = await Promise.all(
        classTypes.map((classType) =>
          this.processClassTypeRankings(classType._id.toString())
        )
      );

      const totalStudentsProcessed = results.reduce(
        (sum, r) => sum + r.processedStudents,
        0
      );

      return {
        classTypesProcessed: classTypes.length,
        totalStudentsProcessed,
        results,
      };
    } catch (error) {
      console.error(
        "Error processing Olympiad rankings:",
        error instanceof Error ? error.stack : error
      );
      throw error;
    }
  }

  /**
   * Get ranking statistics for a ClassType
   */
  static async getClassTypeRankingStats(classTypeId: string): Promise<{
    totalParticipants: number;
    medalists: number;
    goldCount: number;
    silverCount: number;
    bronzeCount: number;
    top10Count: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
  }> {
    try {
      const classType = await ClassTypeModel.findById(classTypeId);
      if (!classType) throw new Error("ClassType not found");

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
        goldCount: classType.gold.length,
        silverCount: classType.silver.length,
        bronzeCount: classType.bronze.length,
        top10Count: classType.top10.length,
        averageScore: Math.round(averageScore * 100) / 100,
        highestScore: Math.max(...scores),
        lowestScore: Math.min(...scores),
      };
    } catch (error) {
      console.error(
        "Error getting ClassType ranking stats:",
        error instanceof Error ? error.stack : error
      );
      throw error;
    }
  }
}
