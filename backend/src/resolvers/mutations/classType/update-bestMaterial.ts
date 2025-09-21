import { ClassTypeModel } from "@/models";
import { transformDocument, mapClassYearToGraphQL } from "@/lib/enumUtils";

export const updateBestMaterial = async (_: unknown, { id, input }: any) => {
  const { classTypeId, studentId, materialImages, description } = input;

  // Find the classType and update the specific bestMaterial
  const classType = await ClassTypeModel.findById(classTypeId);

  if (!classType) {
    throw new Error("ClassType not found");
  }

  // Find and update the bestMaterial by studentId (assuming id is studentId)
  const bestMaterialIndex = classType.bestMaterials?.findIndex(
    (bm: any) => bm.studentId.toString() === id
  );

  if (bestMaterialIndex === -1) {
    throw new Error("BestMaterial not found");
  }

  // Update the bestMaterial
  if (
    classType.bestMaterials &&
    bestMaterialIndex !== -1 &&
    bestMaterialIndex !== undefined
  ) {
    classType.bestMaterials[bestMaterialIndex] = {
      studentId,
      materialImages,
      description,
    };
  }

  await classType.save();

  // Populate and return updated classType
  const populatedClassType = await ClassTypeModel.findById(classTypeId)
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "olympiadId",
      select: "name",
    });

  if (!populatedClassType) {
    throw new Error("Failed to populate classType data");
  }

  const transformed = transformDocument(populatedClassType);

  if (transformed.questions) {
    transformed.questions = transformed.questions.map((question: any) => ({
      ...question,
      id: question._id?.toString() || question.id,
      _id: undefined,
    }));
  }

  if (transformed.classYear) {
    transformed.classYear = mapClassYearToGraphQL(transformed.classYear);
  }

  // Return the updated bestMaterial
  const updatedBestMaterial =
    classType.bestMaterials?.[bestMaterialIndex as any];
  return {
    studentId: updatedBestMaterial?.studentId.toString(),
    materialImages: updatedBestMaterial?.materialImages,
    description: updatedBestMaterial?.description,
  };
};
