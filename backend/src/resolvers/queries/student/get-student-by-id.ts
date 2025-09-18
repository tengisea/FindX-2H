import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";

export const getStudent = async (_: any, { id }: { id: string }) => {
  try {
    console.log("🔍 getStudent called with ID:", id);
    const student = await StudentModel.findById(id);
    console.log("📊 Student found:", student ? "YES" : "NO");
    if (student) {
      console.log("👤 Student details:", {
        id: student._id,
        name: student.name,
        email: student.email,
      });
      const { _id, ...rest } = student.toObject() as any;
      return {
        id: String(_id),
        ...rest,
        participatedOlympiads:
          rest.participatedOlympiads?.map((id: any) => String(id)) || [],
        gold: rest.gold?.map((id: any) => String(id)) || [],
        silver: rest.silver?.map((id: any) => String(id)) || [],
        bronze: rest.bronze?.map((id: any) => String(id)) || [],
        top10: rest.top10?.map((id: any) => String(id)) || [],
      };
    }
    return null;
  } catch (error: any) {
    console.error("❌ Error in getStudent:", error);
    throw new GraphQLError(error.message);
  }
};
