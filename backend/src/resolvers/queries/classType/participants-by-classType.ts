import { ClassTypeModel } from "@/models";

export const participantsByClassType = async (_: any, { classTypeId }: any) => {
  const classType = await ClassTypeModel.findById(classTypeId).select(
    "participants"
  );

  if (!classType) {
    throw new Error("ClassType not found");
  }

  return classType.participants?.map((participantId: any) =>
    participantId.toString()
  );
};
