import { OlympiadModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { QuestionModel } from "@/models";

export const requestOlympiad = async (_: unknown, { input }: any) => {
  const { organizerId, name, description, date, location, classtypes } = input;

  const classTypeIds = [];
  for (const classTypeInput of classtypes) {
    const { classYear, maxScore, medalists, questions } = classTypeInput;

    const classType = new ClassTypeModel({
      classYear,
      maxScore,
      medalists,
    });
    await classType.save();

    for (const q of questions) {
      const question = new QuestionModel({
        classTypeId: classType._id,
        questionNumber: q.questionNumber,
        maxScore: q.maxScore,
      });
      await question.save();
      classType.questions.push(question._id as any);
    }
    await classType.save();
    classTypeIds.push(classType._id as any);
  }

  const olympiad = new OlympiadModel({
    organizer: organizerId,
    name,
    description,
    date,
    location,
    classtypes: classTypeIds,
    status: "PENDING",
  });
  await olympiad.save();

  await ClassTypeModel.updateMany(
    { _id: { $in: classTypeIds } },
    { $set: { olympiadId: olympiad._id } }
  );

  return olympiad.populate("classtypes");
};
