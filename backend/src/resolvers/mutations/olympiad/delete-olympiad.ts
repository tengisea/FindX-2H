import { OlympiadModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { QuestionModel } from "@/models";
import { OrganizerModel } from "@/models";

export const deleteOlympiad = async (_: unknown, { id }: any) => {
  try {
    const olympiad = await OlympiadModel.findById(id);
    
    if (!olympiad) {
      return false;
    }

    // Remove the olympiad ID from the organizer's Olympiads array
    await OrganizerModel.findByIdAndUpdate(
      olympiad.organizer,
      { $pull: { Olympiads: id } },
      { new: true }
    );

    const classTypes = await ClassTypeModel.find({ olympiadId: id });
    const questionIds = classTypes.flatMap(classType => classType.questions);
    
    if (questionIds.length > 0) {
      await QuestionModel.deleteMany({ _id: { $in: questionIds } });
    }
    
    await ClassTypeModel.deleteMany({ olympiadId: id });

    const result = await OlympiadModel.findByIdAndDelete(id);
    
    return !!result;
  } catch (error) {
    console.error("Error deleting olympiad:", error);
    throw new Error("Failed to delete olympiad and its associated data");
  }
};
