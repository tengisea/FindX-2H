import { ClassTypeModel } from "@/models";

export const bestMaterialsByClassType = async (
  _: any,
  { classTypeId }: any
) => {
  const classType = await ClassTypeModel.findById(classTypeId).select(
    "bestMaterials"
  );

  if (!classType) {
    throw new Error("ClassType not found");
  }

  return classType.bestMaterials?.map((bestMaterial: any) => ({
    studentId: bestMaterial.studentId.toString(),
    materialImages: bestMaterial.materialImages,
    description: bestMaterial.description,
  }));
};
