import { ClassTypeModel } from "@/models";
import { StudentAnswerModel } from "@/models";
import { StudentModel } from "@/models";
import { GraphQLError } from "graphql";

export const finalizeClassTypeRankings = async (
  _: unknown,
  { classTypeId }: { classTypeId: string }
) => {
  try {
    // Find the class type
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new GraphQLError("Class type not found");
    }

    // Get all student answers for this class type, sorted by total score (descending)
    const studentAnswers = await StudentAnswerModel.find({
      classTypeId,
      totalScoreofOlympiad: { $gt: 0 }, // Only students with results
    })
      .sort({ totalScoreofOlympiad: -1 })
      .populate("studentId");

    if (studentAnswers.length === 0) {
      throw new GraphQLError("No student results found for this class type");
    }

    // Clear existing medal assignments
    await ClassTypeModel.findByIdAndUpdate(classTypeId, {
      $set: {
        gold: [],
        silver: [],
        bronze: [],
        top10: [],
      },
    });

    // Clear student medal assignments for this class type
    const studentIds = studentAnswers.map((sa) => sa.studentId);
    await StudentModel.updateMany(
      { _id: { $in: studentIds } },
      {
        $pull: {
          gold: classTypeId,
          silver: classTypeId,
          bronze: classTypeId,
          top10: classTypeId,
        },
      }
    );

    // Assign medals based on rankings
    const goldWinners = studentAnswers.slice(0, Math.min(classType.medalists, studentAnswers.length));
    const silverWinners = studentAnswers.slice(
      classType.medalists,
      Math.min(classType.medalists * 2, studentAnswers.length)
    );
    const bronzeWinners = studentAnswers.slice(
      classType.medalists * 2,
      Math.min(classType.medalists * 3, studentAnswers.length)
    );
    const top10Winners = studentAnswers.slice(0, Math.min(10, studentAnswers.length));

    // Update class type with medal winners
    await ClassTypeModel.findByIdAndUpdate(classTypeId, {
      $set: {
        gold: goldWinners.map((sa) => sa.studentId),
        silver: silverWinners.map((sa) => sa.studentId),
        bronze: bronzeWinners.map((sa) => sa.studentId),
        top10: top10Winners.map((sa) => sa.studentId),
      },
    });

    // Update students with their medals
    const updates = [];

    // Gold medalists
    for (const winner of goldWinners) {
      updates.push({
        updateOne: {
          filter: { _id: winner.studentId },
          update: { $addToSet: { gold: classTypeId } },
        },
      });
    }

    // Silver medalists
    for (const winner of silverWinners) {
      updates.push({
        updateOne: {
          filter: { _id: winner.studentId },
          update: { $addToSet: { silver: classTypeId } },
        },
      });
    }

    // Bronze medalists
    for (const winner of bronzeWinners) {
      updates.push({
        updateOne: {
          filter: { _id: winner.studentId },
          update: { $addToSet: { bronze: classTypeId } },
        },
      });
    }

    // Top 10
    for (const winner of top10Winners) {
      updates.push({
        updateOne: {
          filter: { _id: winner.studentId },
          update: { $addToSet: { top10: classTypeId } },
        },
      });
    }

    if (updates.length > 0) {
      await StudentModel.bulkWrite(updates);
    }

    // Get updated class type
    const updatedClassType = await ClassTypeModel.findById(classTypeId)
      .populate("questions")
      .populate("classRoom");

    if (!updatedClassType) {
      throw new GraphQLError("Failed to retrieve updated class type");
    }

    console.log(
      `✅ Class type rankings finalized: ${classTypeId} - Gold: ${goldWinners.length}, Silver: ${silverWinners.length}, Bronze: ${bronzeWinners.length}, Top10: ${top10Winners.length}`
    );

    return {
      id: updatedClassType._id.toString(),
      classYear: updatedClassType.classYear,
      maxScore: updatedClassType.maxScore,
      occurringTime: updatedClassType.occurringTime,
      classRoom: updatedClassType.classRoom,
      questions: updatedClassType.questions,
      medalists: updatedClassType.medalists,
      participants: updatedClassType.participants.map((id) => id.toString()),
      studentsAnswers: updatedClassType.studentsAnswers.map((id) => id.toString()),
      olympiadId: updatedClassType.olympiadId?.toString(),
      bestMaterials: updatedClassType.bestMaterials,
      gold: updatedClassType.gold.map((id) => id.toString()),
      silver: updatedClassType.silver.map((id) => id.toString()),
      bronze: updatedClassType.bronze.map((id) => id.toString()),
      top10: updatedClassType.top10.map((id) => id.toString()),
    };
  } catch (error: any) {
    console.error("❌ Finalize rankings error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(
      error.message || "Failed to finalize class type rankings"
    );
  }
};
