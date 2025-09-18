import { ClassTypeModel } from "@/models";
import { QuestionModel } from "@/models";

export const deleteClassType = async (_: unknown, { id }: any) => {
  try {
    const classType = await ClassTypeModel.findById(id);

    if (!classType) {
      return false;
    }

    // Delete associated questions
    if (classType.questions.length > 0) {
      await QuestionModel.deleteMany({ _id: { $in: classType.questions } });
    }

    // Delete the classType
    const result = await ClassTypeModel.findByIdAndDelete(id);

    return !!result;
  } catch (error) {
    console.error("Error deleting classType:", error);
    throw new Error("Failed to delete classType and its associated questions");
  }
};
