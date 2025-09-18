import { ClassTypeModel } from "@/models";

export const getAllBestMaterials = async () => {
  const classTypes = await ClassTypeModel.find().select("bestMaterials");

  const allBestMaterials: any[] = [];

  classTypes.forEach((classType) => {
    classType.bestMaterials.forEach((bestMaterial: any) => {
      allBestMaterials.push({
        studentId: bestMaterial.studentId.toString(),
        materialImages: bestMaterial.materialImages,
        description: bestMaterial.description,
      });
    });
  });

  return allBestMaterials;
};
