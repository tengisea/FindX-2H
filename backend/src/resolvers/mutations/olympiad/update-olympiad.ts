import { OlympiadModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const updateOlympiad = async (_: unknown, { id, input }: any) => {
  // If rankingType is being updated, we need to use save() to trigger pre-save middleware
  if (input.rankingType) {
    const olympiad = await OlympiadModel.findById(id);
    if (!olympiad) {
      throw new Error("Olympiad not found");
    }

    // Update the fields
    Object.assign(olympiad, input);
    await olympiad.save(); // This will trigger the pre-save middleware

    // Now populate and return
    const populatedOlympiad = await OlympiadModel.findById(id)
      .populate({
        path: "classtypes",
        populate: {
          path: "questions",
          model: "Question",
        },
      })
      .populate({
        path: "organizer",
        select: "organizationName email",
      });

    if (!populatedOlympiad) {
      throw new Error("Failed to populate olympiad data");
    }

    const transformed = transformDocument(populatedOlympiad);

    // Handle ClassTypes manually since transformDocument is not working properly for populated objects
    if (populatedOlympiad.classtypes) {
      transformed.classtypes = populatedOlympiad.classtypes.map(
        (classType: any) => {
          const classTypeId = classType._id?.toString() || classType.id;
          return {
            id: classTypeId,
            classYear: mapClassYearToGraphQL(classType.classYear),
            maxScore: classType.maxScore,
            occurringTime: classType.occurringTime,
            rooms: transformNestedObject(classType.rooms),
            questions: classType.questions
              ? classType.questions.map((question: any) => {
                  const questionId = question._id?.toString() || question.id;
                  return {
                    id: questionId,
                    classTypeId: classTypeId,
                    questionName: question.questionName,
                    maxScore: question.maxScore,
                  };
                })
              : [],
            medalists: classType.medalists,
            participants: classType.participants || [],
            studentsAnswers: classType.studentsAnswers || [],
            olympiadId:
              classType.olympiadId?.toString() || classType.olympiadId,
            bestMaterials: classType.bestMaterials || [],
            gold: classType.gold || [],
            silver: classType.silver || [],
            bronze: classType.bronze || [],
            top10: classType.top10 || [],
          };
        }
      );
    }

    if (transformed.organizer) {
      transformed.organizer = transformDocument(transformed.organizer);
      delete transformed.organizer.Olympiads;
    }

    return transformed;
  } else {
    // For updates without rankingType, use findByIdAndUpdate
    const updatedOlympiad = await OlympiadModel.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true }
    )
      .populate({
        path: "classtypes",
        populate: {
          path: "questions",
          model: "Question",
        },
      })
      .populate({
        path: "organizer",
        select: "organizationName email",
      });

    if (!updatedOlympiad) {
      throw new Error("Olympiad not found");
    }

    const transformed = transformDocument(updatedOlympiad);

    // Handle ClassTypes manually since transformDocument is not working properly for populated objects
    if (updatedOlympiad.classtypes) {
      transformed.classtypes = updatedOlympiad.classtypes.map(
        (classType: any) => {
          const classTypeId = classType._id?.toString() || classType.id;
          return {
            id: classTypeId,
            classYear: mapClassYearToGraphQL(classType.classYear),
            maxScore: classType.maxScore,
            occurringTime: classType.occurringTime,
            rooms: transformNestedObject(classType.rooms),
            questions: classType.questions
              ? classType.questions.map((question: any) => {
                  const questionId = question._id?.toString() || question.id;
                  return {
                    id: questionId,
                    classTypeId: classTypeId,
                    questionName: question.questionName,
                    maxScore: question.maxScore,
                  };
                })
              : [],
            medalists: classType.medalists,
            participants: classType.participants || [],
            studentsAnswers: classType.studentsAnswers || [],
            olympiadId:
              classType.olympiadId?.toString() || classType.olympiadId,
            bestMaterials: classType.bestMaterials || [],
            gold: classType.gold || [],
            silver: classType.silver || [],
            bronze: classType.bronze || [],
            top10: classType.top10 || [],
          };
        }
      );
    }

    if (transformed.organizer) {
      transformed.organizer = transformDocument(transformed.organizer);
      delete transformed.organizer.Olympiads;
    }

    return transformed;
  }
};
