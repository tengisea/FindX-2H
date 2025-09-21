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

    return await withTransaction(async (session) => {
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
      const classYears = [];

      for (const classTypeInput of classtypes) {
        const { classYear, maxScore, medalists, questions } = classTypeInput;

        const classType = new ClassTypeModel({
          olympiadId: olympiad._id,
          classYear: mapClassYearToDB(classYear),
          maxScore,
          medalists,
        });
        await classType.save({ session });

        classYears.push(mapClassYearToDB(classYear));

        for (const q of questions) {
          const question = new QuestionModel({
            classTypeId: classType._id,
            questionName: q.questionName,
            maxScore: q.maxScore,
          });
          await question.save({ session });
          classType.questions.push(question._id as any);
        }
        await classType.save({ session });
        classTypeIds.push(classType._id as any);
      }

      olympiad.classtypes = classTypeIds;
      await olympiad.save({ session });

      await OrganizerModel.findByIdAndUpdate(
        organizerId,
        { $push: { Olympiads: olympiad._id } },
        { session }
      );

      // Send email notifications (outside transaction to avoid blocking)
      try {
        const emailResult = await sendNewOlympiadNotificationToMatchingStudents(
          name,
          description,
          classYears as ClassYear[],
          occurringDay
            ? new Date(occurringDay).toLocaleDateString()
            : undefined,
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
              path: "rooms",
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
        throw createGraphQLError(
          "Failed to populate olympiad data",
          ErrorCodes.INTERNAL_ERROR
        );
      }

      const transformed = transformDocument(populatedOlympiad);

      if (transformed.classtypes) {
        transformed.classtypes = transformed.classtypes.map(
          (classType: any) => ({
            ...transformDocument(classType),
            classYear: mapClassYearToGraphQL(classType.classYear),
            questions: transformNestedObject(classType.questions),
          })
        );
      }

      if (transformed.organizer) {
        transformed.organizer = transformDocument(transformed.organizer);
        delete transformed.organizer.Olympiads;
      }

      return transformed;
    });
  }, "Failed to create olympiad");
};
