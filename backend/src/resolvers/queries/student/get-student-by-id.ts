import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";

export const getStudent = async (_: any, { id }: { id: string }) => {
  try {
    console.log('🔍 getStudent called with ID:', id);
    const student = await StudentModel.findById(id);
    console.log('📊 Student found:', student ? 'YES' : 'NO');
    if (student) {
      console.log('👤 Student details:', {
        id: student._id,
        name: student.name,
        email: student.email
      });
      return {
        ...student.toObject(),
        id: student._id.toString()
      };
    }
    return null;
  } catch (error: any) {
    console.error('❌ Error in getStudent:', error);
    throw new GraphQLError(error.message);
  }
};