import { ClassTypeModel } from "@/models";

export const deleteBestMaterial = async (
  _: unknown,
  { id, classTypeId }: any
) => {
  try {
    const classType = await ClassTypeModel.findById(classTypeId);

    if (!classType) {
      throw new Error("ClassType not found");
    }

    // Remove the bestMaterial by studentId (assuming id is studentId)
    const initialLength = classType.bestMaterials?.length;
    classType.bestMaterials = classType.bestMaterials?.filter(
      (bm: any) => bm.studentId.toString() !== id
    );

    if (classType.bestMaterials?.length === initialLength) {
      throw new Error("BestMaterial not found");
    }

    await classType.save();

    return true;
  } catch (error) {
    console.error("Error deleting bestMaterial:", error);
    throw new Error("Failed to delete bestMaterial");
  }
};
