import { ClassTypeModel, StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";

export const debugOlympiadData = async (
  _: unknown,
  { olympiadId }: { olympiadId: string }
) => {
  try {
    const olympiadObjectId = new Types.ObjectId(olympiadId);

    // Check ClassTypes
    const classTypes = await ClassTypeModel.find({
      olympiadId: olympiadObjectId,
    });
    const classTypeIds = classTypes.map((ct) => ct._id);

    // Check StudentAnswers
    const studentAnswers = await StudentAnswerModel.find({
      classTypeId: { $in: classTypeIds },
    });

    // Check all StudentAnswers (to see if any exist at all)
    const allStudentAnswers = await StudentAnswerModel.find({}).limit(5);

    return JSON.stringify(
      {
        olympiadId: olympiadId,
        olympiadObjectId: olympiadObjectId.toString(),
        classTypesCount: classTypes.length,
        classTypeIds: classTypeIds.map((id) => id.toString()),
        studentAnswersCount: studentAnswers.length,
        studentAnswerIds: studentAnswers.map((sa) => sa._id.toString()),
        sampleStudentAnswers: allStudentAnswers.map((sa) => ({
          id: sa._id.toString(),
          classTypeId: sa.classTypeId.toString(),
          studentId: sa.studentId.toString(),
        })),
      },
      null,
      2
    );
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
