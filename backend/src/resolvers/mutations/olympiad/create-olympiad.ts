import { OlympiadModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { CreateOlympiadRequestInput } from "@/types/generated";
import { QuestionModel } from "@/models";
import { OrganizerModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToDB,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";
import { sendNewOlympiadNotificationToMatchingStudents } from "@/utils/email-services";

import { ClassYear } from "@/models/ClassType.model";

// import { extractClassYearsFromOlympiad } from "@/utils/class-year-mappers";

export const createOlympiad = async (
  _: unknown,
  { input }: { input: CreateOlympiadRequestInput }
) => {
  const {
    organizerId,
    name,
    description,
    closeDay,
    location,
    classtypes,
    rankingType,
    invitation,
    occurringDay,
  } = input;

  const olympiad = new OlympiadModel({
    organizer: organizerId,
    name,
    description,
    closeDay,
    location,
    classtypes: [],
    status: "DRAFT",
    rankingType,
    invitation,
    occurringDay,
  });
  await olympiad.save();

  const classTypeIds = [];
  const classYears = [];

  for (const classTypeInput of classtypes) {
    const { classYear, maxScore, medalists, questions } = classTypeInput;

    const classType = new ClassTypeModel({
      olympiadId: olympiad._id,
      classYear: mapClassYearToDB(classYear),
      maxScore,
      medalists,
    });
    await classType.save();

    classYears.push(mapClassYearToDB(classYear));

    for (const q of questions) {
      const question = new QuestionModel({
        classTypeId: classType._id,
        questionName: q.questionName,
        maxScore: q.maxScore,
      });
      await question.save();
      classType.questions.push(question._id as any);
    }
    await classType.save();
    classTypeIds.push(classType._id as any);
  }

  olympiad.classtypes = classTypeIds;
  await olympiad.save();

  await OrganizerModel.findByIdAndUpdate(
    organizerId,
    { $push: { Olympiads: olympiad._id } },
    { new: true }
  );

  try {
    const emailResult = await sendNewOlympiadNotificationToMatchingStudents(
      name,
      description,
      classYears as ClassYear[],
      occurringDay ? new Date(occurringDay).toLocaleDateString() : undefined,
      location
    );

    console.log(
      `📧 Email notifications sent: ${emailResult.sentCount}/${emailResult.totalStudents}`
    );
  } catch (emailError) {
    console.error(
      "Failed to send new olympiad email notifications:",
      emailError
    );
  }

  const populatedOlympiad = await OlympiadModel.findById(olympiad._id)
    .populate({
      path: "classtypes",
      populate: [
        {
          path: "questions",
          model: "Question",
        },
        {
          path: "classRoom",
          model: "ClassRoom",
          populate: {
            path: "mandatNumber",
            model: "StudentAnswer",
          },
        },
      ],
    })
    .populate({
      path: "organizer",
      select: "organizationName email",
    });

  if (!populatedOlympiad) {
    throw new Error("Failed to populate olympiad data");
  }

  const transformed = transformDocument(populatedOlympiad);

  if (transformed.classtypes) {
    transformed.classtypes = transformed.classtypes.map((classType: any) => ({
      ...transformDocument(classType),
      classYear: mapClassYearToGraphQL(classType.classYear),
      questions: transformNestedObject(classType.questions),
    }));
  }

  if (transformed.organizer) {
    transformed.organizer = transformDocument(transformed.organizer);
    delete transformed.organizer.Olympiads;
  }

  return transformed;
};
