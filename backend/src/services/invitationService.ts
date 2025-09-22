import { StudentModel } from "@/models";
import { OlympiadModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { StudentAnswerModel } from "@/models";
import { Types } from "mongoose";

export interface InvitationResult {
  success: boolean;
  message: string;
  invitedStudents: number;
  targetOlympiadId?: string;
  targetOlympiadName?: string;
  errors?: string[];
}

export interface TopPerformer {
  studentId: string;
  studentName: string;
  totalScore: number;
  classYear: string;
  region: string;
  province: string;
}

export class InvitationService {
  /**
   * Process invitations for top performers after an olympiad is finished
   */
  static async processInvitations(
    finishedOlympiadId: string
  ): Promise<InvitationResult[]> {
    try {
      console.log(
        `🎯 Processing invitations for finished olympiad: ${finishedOlympiadId}`
      );

      // Validate olympiad ID format
      if (!finishedOlympiadId || finishedOlympiadId.length !== 24) {
        console.log(`⚠️ Invalid olympiad ID format: ${finishedOlympiadId}`);
        return [];
      }

      const finishedOlympiad = await OlympiadModel.findById(finishedOlympiadId);
      if (!finishedOlympiad) {
        console.log(`⚠️ Finished olympiad not found: ${finishedOlympiadId}`);
        return [];
      }

      // Only process invitations for olympiads that have next levels (SCHOOL, DISTRICT, REGIONAL)
      if (
        !this.shouldProcessInvitations(finishedOlympiad.rankingType as string)
      ) {
        console.log(
          `ℹ️ Skipping invitations for olympiad without next level: ${finishedOlympiad.rankingType}`
        );
        return [];
      }

      const results: InvitationResult[] = [];

      // Get all class types for this olympiad
      const classTypes = await ClassTypeModel.find({
        olympiadId: finishedOlympiadId,
      });

      if (classTypes.length === 0) {
        console.log(
          `ℹ️ No class types found for olympiad: ${finishedOlympiadId}`
        );
        return [];
      }

      for (const classType of classTypes) {
        const topPerformers = await this.getTopPerformers(
          classType._id.toString(),
          finishedOlympiad.rankingType as string
        );

        if (topPerformers.length === 0) {
          console.log(
            `ℹ️ No top performers found for class type: ${classType._id}`
          );
          continue;
        }

        // Find the target olympiad for invitations
        const targetOlympiad = await this.findTargetOlympiad(
          finishedOlympiad.rankingType as string,
          classType.classYear
        );

        if (!targetOlympiad) {
          console.log(
            `⚠️ No target olympiad found for ${
              finishedOlympiad.rankingType as string
            } -> ${this.getNextLevel(finishedOlympiad.rankingType as string)}`
          );
          results.push({
            success: false,
            message: `No target olympiad found for ${this.getNextLevel(
              finishedOlympiad.rankingType as string
            )} level`,
            invitedStudents: 0,
            errors: [
              `No ${this.getNextLevel(
                finishedOlympiad.rankingType as string
              )} olympiad found for class ${classType.classYear}`,
            ],
          });
          continue;
        }

        // Register top performers to the target olympiad
        const invitationResult = await this.registerTopPerformers(
          topPerformers,
          targetOlympiad._id.toString(),
          classType.classYear
        );

        results.push({
          success: invitationResult.success,
          message: invitationResult.message,
          invitedStudents: invitationResult.invitedStudents,
          targetOlympiadId: targetOlympiad._id.toString(),
          targetOlympiadName: targetOlympiad.name,
          errors: invitationResult.errors,
        });
      }

      return results;
    } catch (error: any) {
      console.error("❌ Error processing invitations:", error);
      // Return empty array instead of throwing error to prevent breaking the system
      return [];
    }
  }

  /**
   * Check if an olympiad type should process invitations (has a next level)
   */
  private static shouldProcessInvitations(rankingType: string): boolean {
    return ["SCHOOL", "DISTRICT", "REGIONAL"].includes(rankingType);
  }

  /**
   * Get the next level olympiad type
   */
  private static getNextLevel(currentLevel: string): string {
    switch (currentLevel) {
      case "SCHOOL":
        return "DISTRICT";
      case "DISTRICT":
        return "REGIONAL";
      case "REGIONAL":
        return "NATIONAL";
      default:
        return "";
    }
  }

  /**
   * Get top performers for a specific class type
   */
  private static async getTopPerformers(
    classTypeId: string,
    rankingType: string
  ): Promise<TopPerformer[]> {
    const limit = this.getInvitationLimit(rankingType);

    // Get student answers sorted by total score (highest first)
    const studentAnswers = await StudentAnswerModel.find({ classTypeId })
      .populate("studentId", "name class region province")
      .sort({ totalScoreofOlympiad: -1 })
      .limit(limit);

    return studentAnswers
      .filter(
        (answer) =>
          answer.studentId &&
          typeof answer.studentId === "object" &&
          answer.totalScoreofOlympiad !== undefined
      )
      .map((answer) => ({
        studentId: (answer.studentId as any)._id.toString(),
        studentName: (answer.studentId as any).name,
        totalScore: answer.totalScoreofOlympiad || 0,
        classYear: (answer.studentId as any).class,
        region: (answer.studentId as any).region,
        province: (answer.studentId as any).province,
      }));
  }

  /**
   * Get the number of students to invite based on olympiad type
   */
  private static getInvitationLimit(rankingType: string): number {
    switch (rankingType) {
      case "SCHOOL":
        return 5; // Top 5 from SCHOOL -> DISTRICT
      case "DISTRICT":
        return 5; // Top 5 from DISTRICT -> REGIONAL
      case "REGIONAL":
        return 15; // Top 15 from REGIONAL -> NATIONAL
      default:
        return 0;
    }
  }
  /**
   * Find the target olympiad for invitations
   */
  private static async findTargetOlympiad(
    currentLevel: string,
    classYear: string
  ): Promise<any> {
    const nextLevel = this.getNextLevel(currentLevel);
    if (!nextLevel) {
      return null;
    }

    // Find an open olympiad of the next level for the same class year
    const targetOlympiad = await OlympiadModel.findOne({
      rankingType: nextLevel,
      status: "OPEN",
      classtypes: {
        $in: await ClassTypeModel.find({ classYear }).distinct("_id"),
      },
    }).populate("classtypes");

    return targetOlympiad;
  }

  /**
   * Register top performers to the target olympiad
   */
  private static async registerTopPerformers(
    topPerformers: TopPerformer[],
    targetOlympiadId: string,
    classYear: string
  ): Promise<{
    success: boolean;
    message: string;
    invitedStudents: number;
    errors?: string[];
  }> {
    const errors: string[] = [];
    let invitedCount = 0;

    // Find the class type in the target olympiad for the same class year
    const targetClassType = await ClassTypeModel.findOne({
      olympiadId: targetOlympiadId,
      classYear: classYear,
    });

    if (!targetClassType) {
      return {
        success: false,
        message: `No class type found for ${classYear} in target olympiad`,
        invitedStudents: 0,
        errors: [`No class type found for ${classYear} in target olympiad`],
      };
    }

    for (const performer of topPerformers) {
      try {
        // Check if student is already registered for this olympiad
        const student = await StudentModel.findById(performer.studentId);
        if (!student) {
          errors.push(`Student ${performer.studentName} not found`);
          continue;
        }

        if (student.participatedOlympiads.includes(targetOlympiadId as any)) {
          console.log(
            `ℹ️ Student ${performer.studentName} already registered for target olympiad`
          );
          continue;
        }

        // Register student for the olympiad
        await StudentModel.findByIdAndUpdate(performer.studentId, {
          $addToSet: { participatedOlympiads: targetOlympiadId },
        });

        // Add student to class type participants
        await ClassTypeModel.findByIdAndUpdate(targetClassType._id, {
          $addToSet: { participants: performer.studentId },
        });

        invitedCount++;
        console.log(
          `✅ Invited ${performer.studentName} (${performer.totalScore} points) to ${targetOlympiadId}`
        );
      } catch (error: any) {
        console.error(`❌ Error inviting ${performer.studentName}:`, error);
        errors.push(
          `Failed to invite ${performer.studentName}: ${error.message}`
        );
      }
    }

    return {
      success: invitedCount > 0,
      message: `Successfully invited ${invitedCount} out of ${topPerformers.length} top performers`,
      invitedStudents: invitedCount,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * Get invitation statistics for an olympiad
   */
  static async getInvitationStats(olympiadId: string): Promise<{
    totalInvited: number;
    byClass: { [classYear: string]: number };
    byRegion: { [region: string]: number };
  }> {
    try {
      // Validate olympiad ID format
      if (!olympiadId || olympiadId.length !== 24) {
        console.log(`⚠️ Invalid olympiad ID format: ${olympiadId}`);
        return {
          totalInvited: 0,
          byClass: {},
          byRegion: {},
        };
      }

      const olympiad = await OlympiadModel.findById(olympiadId);
      if (!olympiad) {
        console.log(`⚠️ Olympiad not found: ${olympiadId}`);
        return {
          totalInvited: 0,
          byClass: {},
          byRegion: {},
        };
      }

      const participants = await StudentModel.find({
        participatedOlympiads: olympiadId,
      }).select("class region");

      const stats = {
        totalInvited: participants.length,
        byClass: {} as { [classYear: string]: number },
        byRegion: {} as { [region: string]: number },
      };

      participants.forEach((student) => {
        // Count by class
        stats.byClass[student.class] = (stats.byClass[student.class] || 0) + 1;

        // Count by region
        stats.byRegion[student.region] =
          (stats.byRegion[student.region] || 0) + 1;
      });

      return stats;
    } catch (error: any) {
      console.error("❌ Error getting invitation stats:", error);
      // Return empty stats instead of throwing error
      return {
        totalInvited: 0,
        byClass: {},
        byRegion: {},
      };
    }
  }
}
