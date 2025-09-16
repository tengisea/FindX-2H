import { StudentModel, StudentAnswerModel } from "../../../models";
import { GraphQLError } from "graphql";
import { QueryResolvers } from "@/types/generated";
import { Types } from "mongoose";

export const studentsByClassType: QueryResolvers["studentsByClassType"] =
  async (_, { classTypeId }) => {
    try {
      console.log(
        "🔍 studentsByClassType called with classTypeId:",
        classTypeId
      );

      const classTypeObjectId = new Types.ObjectId(classTypeId);

      // Find all StudentAnswers for this classType
      const studentAnswers = await StudentAnswerModel.find({
        classTypeId: classTypeObjectId,
      }).lean();

      console.log("📝 Found StudentAnswers:", studentAnswers.length);

      if (studentAnswers.length === 0) {
        console.log("❌ No StudentAnswers found for this classType");
        return [];
      }

      // Get unique student IDs from the StudentAnswers
      const studentIds = [...new Set(studentAnswers.map((sa) => sa.studentId))];
      console.log("👥 Unique student IDs:", studentIds.length);

      // Find all students with these IDs
      const students = await StudentModel.find({
        _id: { $in: studentIds },
      }).lean();

      console.log("📊 Found students:", students.length);

      const result = students.map((doc: any) => {
        const { _id, ...rest } = doc;
        return { id: String(_id), ...rest };
      });

      console.log("✅ Returning", result.length, "students");
      return result as any;
    } catch (error: any) {
      console.error("❌ Error in studentsByClassType:", error);
      throw new GraphQLError(error.message);
    }
  };
