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
import { withTransaction } from "@/utils/transactionHelper";
import {
  createGraphQLError,
  ErrorCodes,
  handleAsyncError,
} from "@/utils/errorHandler";
import { validateOlympiadInput } from "@/utils/validationHelper";

// import { extractClassYearsFromOlympiad } from "@/utils/class-year-mappers";

export const createOlympiad = async (
  _: unknown,
  { input }: { input: CreateOlympiadRequestInput }
) => {
  return await handleAsyncError(async () => {
    // Validate input
    validateOlympiadInput(input);

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

    let classYears: ClassYear[] = [];

    const result = await withTransaction(async (session) => {
      // Starting olympiad creation
      // Creating ClassTypes

      // Verify organizer exists
      const organizer = await OrganizerModel.findById(organizerId).session(
        session
      );
      if (!organizer) {
        throw createGraphQLError("Organizer not found", ErrorCodes.NOT_FOUND);
      }

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
      await olympiad.save({ session });

      const classTypeIds = [];
      const transactionClassYears = [];

      for (const classTypeInput of classtypes) {
        const { classYear, maxScore, medalists, questions } = classTypeInput;

        // Creating ClassType

        const classType = new ClassTypeModel({
          olympiadId: olympiad._id,
          classYear: mapClassYearToDB(classYear),
          maxScore,
          medalists,
          rooms: [],
        });
        await classType.save({ session });
        // ClassType created

        transactionClassYears.push(mapClassYearToDB(classYear));

        for (const q of questions) {
          // Creating Question
          const question = new QuestionModel({
            classTypeId: classType._id,
            questionName: q.questionName,
            maxScore: q.maxScore,
          });
          await question.save({ session });
          classType.questions.push(question._id as any);
          // Question created
        }
        await classType.save({ session });
        // ClassType updated with questions
        classTypeIds.push(classType._id as any);
      }

      olympiad.classtypes = classTypeIds;
      await olympiad.save({ session });
      // Olympiad updated with ClassTypes

      await OrganizerModel.findByIdAndUpdate(
        organizerId,
        { $push: { Olympiads: olympiad._id } },
        { session }
      );

      // Set the classYears for use outside the transaction
      classYears = transactionClassYears as ClassYear[];

      // Return the olympiad ID to populate outside the transaction
      return { olympiadId: olympiad._id.toString() };
    });

    // Now populate the olympiad outside the transaction
    const populatedOlympiad = await OlympiadModel.findById(result.olympiadId)
      .populate({
        path: "classtypes",
        populate: [
          {
            path: "questions",
            model: "Question",
          },
          {
            path: "rooms",
            model: "ClassRoom",
          },
        ],
      })
      .populate({
        path: "organizer",
        select: "organizationName email logo",
      });

    // Populated olympiad result

    if (!populatedOlympiad) {
      throw createGraphQLError(
        "Failed to populate olympiad data",
        ErrorCodes.INTERNAL_ERROR
      );
    }

    // Populated olympiad classtypes

    // Transform the main olympiad document
    const transformed = transformDocument(populatedOlympiad);

    // Handle ClassTypes manually since transformDocument is not working properly for populated objects
    if (populatedOlympiad.classtypes) {
      transformed.classtypes = populatedOlympiad.classtypes.map(
        (classType: any, index: number) => {
          // Get the ID from the original populated object
          const classTypeId = classType._id?.toString() || classType.id;
          if (!classTypeId) {
            throw createGraphQLError(
              "ClassType missing ID",
              ErrorCodes.INTERNAL_ERROR
            );
          }

          const transformedClassType = {
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
          return transformedClassType;
        }
      );
    }

    if (transformed.organizer) {
      transformed.organizer = transformDocument(transformed.organizer);
      delete transformed.organizer.Olympiads;
    }

    // Send email notifications (outside transaction to avoid blocking)
    try {
      const emailResult = await sendNewOlympiadNotificationToMatchingStudents(
        name,
        description,
        classYears as ClassYear[],
        occurringDay ? new Date(occurringDay).toLocaleDateString() : undefined,
        location
      );

      // Email notifications sent
    } catch (emailError) {
      console.error(
        "Failed to send new olympiad email notifications:",
        emailError
      );
    }

    return transformed;
  }, "Failed to create olympiad");
};
