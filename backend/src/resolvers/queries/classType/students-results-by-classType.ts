import { ClassTypeModel } from "@/models";

export const studentsResultsByClassType = async (
  _: any,
  { classTypeId }: any
) => {
  const classType = await ClassTypeModel.findById(classTypeId).select(
    "studentsAnswers"
  );

  if (!classType) {
    throw new Error("ClassType not found");
  }

  return classType.studentsAnswers?.map((answerId: any) => answerId.toString());
};
