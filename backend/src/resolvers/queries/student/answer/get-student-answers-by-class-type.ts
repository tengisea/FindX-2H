import { StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { QueryResolvers } from "@/types/generated";
import { Types } from "mongoose";

export const studentAnswersByClassType: QueryResolvers["studentAnswersByClassType"] =
  async (_, { classTypeId }) => {
    try {
      console.log(
        "🔍 studentAnswersByClassType called with classTypeId:",
        classTypeId
      );

      const classTypeObjectId = new Types.ObjectId(classTypeId);

      // Find all StudentAnswers for this classType
      const studentAnswers = await StudentAnswerModel.find({
        classTypeId: classTypeObjectId,
      }).lean();

      console.log("📝 Found StudentAnswers:", studentAnswers.length);

      const result = studentAnswers.map((doc: any) => {
        const { _id, ...rest } = doc;
        const convertedId = String(_id);
        console.log("🆔 Converting ID:", _id, "to:", convertedId);

        // Convert ObjectIds in answers array to strings
        const convertedAnswers =
          rest.answers?.map((answer: any) => ({
            questionId: String(answer.questionId),
            score: answer.score,
          })) || [];

        return {
          id: convertedId,
          studentId: String(rest.studentId),
          classTypeId: String(rest.classTypeId),
          answers: convertedAnswers,
          totalScoreofOlympiad: rest.totalScoreofOlympiad,
          createdAt: rest.createdAt,
          updatedAt: rest.updatedAt,
        };
      });

      console.log("✅ Returning", result.length, "student answers");
      console.log("📋 Sample result:", result[0]);
      return result as any;
    } catch (error: any) {
      console.error("❌ Error in studentAnswersByClassType:", error);
      throw new GraphQLError(error.message);
    }
  };
