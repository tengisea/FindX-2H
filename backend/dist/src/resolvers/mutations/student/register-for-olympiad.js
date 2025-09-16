import { StudentModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { GraphQLError } from "graphql";
export const registerForOlympiad = async (_, { input }) => {
    try {
        const { studentId, classTypeId } = input;
        console.log('🎯 Registering student:', studentId, 'for class type:', classTypeId);
        // Check if student exists
        const student = await StudentModel.findById(studentId);
        if (!student) {
            throw new GraphQLError("Student not found");
        }
        // Check if class type exists
        const classType = await ClassTypeModel.findById(classTypeId);
        if (!classType) {
            throw new GraphQLError("Class type not found");
        }
        console.log('📊 Student:', student.name, 'Grade:', student.class);
        console.log('📚 Class Type:', classType.classYear, 'Olympiad:', classType.olympiadId);
        // Check if student is already registered for this class type
        if (classType.participants.includes(studentId)) {
            throw new GraphQLError("Student is already registered for this class type");
        }
        // Add student to participants array
        const updatedClassType = await ClassTypeModel.findByIdAndUpdate(classTypeId, { $push: { participants: studentId } }, { new: true });
        console.log('✅ Added student to participants. Total participants:', updatedClassType === null || updatedClassType === void 0 ? void 0 : updatedClassType.participants.length);
        // Also add the olympiad to student's participatedOlympiads array
        const updatedStudent = await StudentModel.findByIdAndUpdate(studentId, { $addToSet: { participatedOlympiads: classType.olympiadId } }, { new: true });
        console.log('✅ Added olympiad to student. Total participated olympiads:', updatedStudent === null || updatedStudent === void 0 ? void 0 : updatedStudent.participatedOlympiads.length);
        return true;
    }
    catch (error) {
        console.error('❌ Registration error:', error);
        if (error instanceof GraphQLError) {
            throw error;
        }
        throw new GraphQLError(error.message || "Failed to register student for olympiad");
    }
};
