import { ClassTypeModel } from "@/models";
import { transformDocument, mapClassYearToGraphQL } from "@/lib/enumUtils";

export const createBestMaterial = async (_: unknown, { input }: any) => {
  const { classTypeId, studentId, materialImages, description } = input;

  const bestMaterial = {
    studentId,
    materialImages,
    description,
  };

  const updatedClassType = await ClassTypeModel.findByIdAndUpdate(
    classTypeId,
    { $push: { bestMaterials: bestMaterial } },
    { new: true }
  )
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "olympiadId",
      select: "name",
    });

  if (!updatedClassType) {
    throw new Error("ClassType not found");
  }

  const transformed = transformDocument(updatedClassType);

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

  // Return the newly created bestMaterial
  const newBestMaterial =
    updatedClassType.bestMaterials?.[updatedClassType.bestMaterials.length - 1];
  return {
    studentId: newBestMaterial?.studentId.toString(),
    materialImages: newBestMaterial?.materialImages,
    description: newBestMaterial?.description,
  };
};
