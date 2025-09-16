import { StudentModel, ClassTypeModel } from "../../../models";
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

      // Find the ClassType and get its participants
      const classType = await ClassTypeModel.findById(classTypeObjectId).lean();

      if (!classType) {
        console.log("❌ ClassType not found");
        return [];
      }

      console.log(
        "📝 Found ClassType with participants:",
        classType.participants?.length || 0
      );

      if (!classType.participants || classType.participants.length === 0) {
        console.log("❌ No participants found for this classType");
        return [];
      }

      // Find all students who are participants in this class type
      const students = await StudentModel.find({
        _id: { $in: classType.participants },
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
