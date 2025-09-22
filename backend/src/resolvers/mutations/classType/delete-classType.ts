import { ClassTypeModel, QuestionModel, OlympiadModel } from "@/models";

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

    // Remove the classtype from all olympiads that reference it
    await OlympiadModel.updateMany(
      { classtypes: id },
      { $pull: { classtypes: id } }
    );

    // Delete the classType
    const result = await ClassTypeModel.findByIdAndDelete(id);

    return !!result;
  } catch (error) {
    console.error("Error deleting classType:", error);
    throw new Error("Failed to delete classType and its associated questions");
  }
};
