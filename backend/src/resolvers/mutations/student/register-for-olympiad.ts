import { StudentModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { OlympiadModel } from "@/models";
import { StudentAnswerModel } from "@/models";
import { generateMandatNumber } from "@/utils/mandat-number-generator";
import { withTransaction } from "@/utils/transactionHelper";
import {
  createGraphQLError,
  ErrorCodes,
  handleAsyncError,
} from "@/utils/errorHandler";
import { validateRegistrationInput } from "@/utils/validationHelper";

export const registerForOlympiad = async (
  _: unknown,
  {
    input,
  }: { input: { studentId: string; classTypeId: string; olympiadId: string } }
) => {
  const { studentId, classTypeId, olympiadId } = input;

  return await handleAsyncError(async () => {
    // Validate input
    validateRegistrationInput(input);

    console.log(
      "🎯 Registering student:",
      studentId,
      "for olympiad:",
      olympiadId
    );

    return await withTransaction(async (session) => {
      // Check if student exists
      const student = await StudentModel.findById(studentId).session(session);
      if (!student) {
        throw createGraphQLError("Student not found", ErrorCodes.NOT_FOUND);
      }

      // Check if student is already registered for this olympiad
      if (student.participatedOlympiads.includes(olympiadId as any)) {
        throw createGraphQLError(
          "Student is already registered for this olympiad",
          ErrorCodes.CONFLICT
        );
      }

      // Verify that the classType belongs to the olympiad
      const classType = await ClassTypeModel.findById(classTypeId).session(
        session
      );
      if (!classType) {
        throw createGraphQLError("ClassType not found", ErrorCodes.NOT_FOUND);
      }
      if (classType.olympiadId.toString() !== olympiadId) {
        throw createGraphQLError(
          "ClassType does not belong to this olympiad",
          ErrorCodes.VALIDATION_ERROR
        );
      }

      // Check if olympiad is still open for registration
      const olympiad = await OlympiadModel.findById(olympiadId).session(
        session
      );
      if (!olympiad) {
        throw createGraphQLError("Olympiad not found", ErrorCodes.NOT_FOUND);
      }
      if (olympiad.status !== "OPEN" && olympiad.status !== "DRAFT") {
        throw createGraphQLError(
          "Olympiad is not open for registration",
          ErrorCodes.VALIDATION_ERROR
        );
      }

      // Add the olympiad to student's participatedOlympiads array
      const updatedStudent = await StudentModel.findByIdAndUpdate(
        studentId,
        { $addToSet: { participatedOlympiads: olympiadId } },
        { new: true, session }
      ).lean();

      if (!updatedStudent) {
        throw createGraphQLError(
          "Failed to register student for olympiad",
          ErrorCodes.INTERNAL_ERROR
        );
      }

      // Add the student to the ClassType's participants array
      const updatedClassType = await ClassTypeModel.findByIdAndUpdate(
        classTypeId,
        { $addToSet: { participants: studentId } },
        { new: true, session }
      );

      if (!updatedClassType) {
        throw createGraphQLError(
          "Failed to add student to class type",
          ErrorCodes.INTERNAL_ERROR
        );
      }

      // Generate mandat number based on class year and participant index
      const participantIndex = updatedClassType.participants?.length;
      const mandatNumber = generateMandatNumber(
        updatedClassType.classYear,
        participantIndex as number
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

      const savedStudentAnswer = await studentAnswer.save({ session });

      // Add the StudentAnswer to the ClassType's studentsAnswers array
      await ClassTypeModel.findByIdAndUpdate(
        classTypeId,
        { $addToSet: { studentsAnswers: savedStudentAnswer._id } },
        { session }
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
    });
  }, "Failed to register student for olympiad");
};
