import { StudentModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { OlympiadModel } from "@/models";
import { StudentAnswerModel } from "@/models";
import { GraphQLError } from "graphql";
import { generateMandatNumber } from "@/utils/mandat-number-generator";

export const registerForOlympiad = async (
  _: unknown,
  {
    input,
  }: { input: { studentId: string; classTypeId: string; olympiadId: string } }
) => {
  const { studentId, classTypeId, olympiadId } = input;
  try {
    // For now, we'll use the olympiadId directly since the schema changed
    // You may need to adjust this logic based on your business requirements

    console.log(
      "🎯 Registering student:",
      studentId,
      "for olympiad:",
      olympiadId
    );

    // Check if student exists
    const student = await StudentModel.findById(studentId);
    if (!student) {
      throw new GraphQLError("Student not found");
    }

    // Check if student is already registered for this olympiad
    if (student.participatedOlympiads.includes(olympiadId as any)) {
      throw new GraphQLError("Student is already registered for this olympiad");
    }

    // Verify that the classType belongs to the olympiad
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new GraphQLError("ClassType not found");
    }
    if (classType.olympiadId.toString() !== olympiadId) {
      throw new GraphQLError("ClassType does not belong to this olympiad");
    }

    // Add the olympiad to student's participatedOlympiads array
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      { $addToSet: { participatedOlympiads: olympiadId } },
      { new: true }
    ).lean();

    if (!updatedStudent) {
      throw new GraphQLError("Failed to register student for olympiad");
    }

    // Add the student to the olympiad's participants array
    await OlympiadModel.findByIdAndUpdate(
      olympiadId,
      { $addToSet: { participants: studentId } },
      { new: true }
    );

    // Add the student to the ClassType's participants array
    const updatedClassType = await ClassTypeModel.findByIdAndUpdate(
      classTypeId,
      { $addToSet: { participants: studentId } },
      { new: true }
    );

    if (!updatedClassType) {
      throw new GraphQLError("Failed to add student to class type");
    }

    // Generate mandat number based on class year and participant index
    const participantIndex = updatedClassType.participants.length;
    const mandatNumber = generateMandatNumber(
      updatedClassType.classYear,
      participantIndex
    );

    // Create StudentAnswer record
    const studentAnswer = new StudentAnswerModel({
      studentId,
      classTypeId,
      mandatNumber,
      answers: [], // Empty initially, will be filled after olympiad
      totalScoreofOlympiad: 0,
      image: [], // Empty initially, will be filled after olympiad
    });

    const savedStudentAnswer = await studentAnswer.save();

    // Add the StudentAnswer to the ClassType's studentsAnswers array
    await ClassTypeModel.findByIdAndUpdate(
      classTypeId,
      { $addToSet: { studentsAnswers: savedStudentAnswer._id } },
      { new: true }
    );

    console.log(
      "✅ Added olympiad to student. Total participated olympiads:",
      updatedStudent?.participatedOlympiads.length
    );

    const { _id, ...rest } = updatedStudent as any;
    return {
      id: String(_id),
      ...rest,
      participatedOlympiads:
        rest.participatedOlympiads?.map((id: any) => String(id)) || [],
      gold: rest.gold?.map((id: any) => String(id)) || [],
      silver: rest.silver?.map((id: any) => String(id)) || [],
      bronze: rest.bronze?.map((id: any) => String(id)) || [],
      top10: rest.top10?.map((id: any) => String(id)) || [],
      rankingHistory:
        rest.rankingHistory?.map((entry: any) => ({
          ...entry,
          changedBy: String(entry.changedBy),
          olympiadId: entry.olympiadId ? String(entry.olympiadId) : null,
        })) || [],
    };
  } catch (error: any) {
    console.error("❌ Registration error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(
      error.message || "Failed to register student for olympiad"
    );
  }
};
