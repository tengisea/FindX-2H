import {
  OlympiadModel,
  ClassTypeModel,
  StudentAnswerModel,
  StudentModel,
} from "@/models";
import { GraphQLError } from "graphql";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";
import { sendOlympiadFinishedNotification } from "@/utils/email-services";
import { RankingServiceV2 } from "@/services/rankingServiceV2";
import { InvitationService } from "@/services/invitationService";
import {
  createGraphQLError,
  ErrorCodes,
  handleAsyncError,
} from "@/utils/errorHandler";

export const finalizeMedals = async (_: unknown, { id }: { id: string }) => {
  return await handleAsyncError(async () => {
    console.log(`🏆 Finalizing medals for Olympiad: ${id}`);

    // Get the olympiad
    const olympiad = await OlympiadModel.findById(id);
    if (!olympiad) {
      throw createGraphQLError("Olympiad not found", ErrorCodes.NOT_FOUND);
    }

    if (olympiad.status !== "MEDALS_PREVIEW") {
      throw createGraphQLError(
        "Olympiad must be in MEDALS_PREVIEW status to finalize medals",
        ErrorCodes.BAD_REQUEST
      );
    }

    // Update status to FINISHED (skip automatic processing since we handle it explicitly)
    const updatedOlympiad = await OlympiadModel.findByIdAndUpdate(
      id,
      { $set: { status: "FINISHED" } },
      { new: true }
    )
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

    // Set flag to skip automatic processing in post-save middleware
    if (updatedOlympiad) {
      (updatedOlympiad as any).$locals = { skipAutomaticProcessing: true };
    }

    if (!updatedOlympiad) {
      throw createGraphQLError(
        "Failed to update olympiad status",
        ErrorCodes.INTERNAL_ERROR
      );
    }

    // Process rankings to give students their points based on medal assignments
    console.log(`🎯 Processing rankings to give students their points...`);
    let totalEmailsSent = 0;

    try {
      const rankingResult = await RankingServiceV2.processOlympiadRankings(id, {
        useTransactions: true,
        batchSize: 1000,
      });

      console.log(
        `✅ Rankings processed: ${rankingResult.classTypesProcessed} class types, ${rankingResult.totalStudentsProcessed} students received points`
      );
    } catch (rankingError) {
      console.error("❌ Error processing rankings:", rankingError);
      throw createGraphQLError(
        "Failed to process student rankings",
        ErrorCodes.INTERNAL_ERROR
      );
    }

    // Process invitations for private olympiads
    try {
      const invitationResults = await InvitationService.processInvitations(id);

      if (invitationResults.length > 0) {
        console.log(
          `🎯 Invitation processing completed for ${updatedOlympiad.name}:`
        );
        invitationResults.forEach((result, index) => {
          if (result.success) {
            console.log(
              `  ✅ Class ${index + 1}: ${
                result.invitedStudents
              } students invited to ${result.targetOlympiadName}`
            );
          } else {
            console.log(`  ⚠️ Class ${index + 1}: ${result.message}`);
          }
        });
      } else {
        console.log(
          `ℹ️ No invitations processed for ${updatedOlympiad.name} (not a private olympiad or no target olympiads found)`
        );
      }
    } catch (invitationError) {
      console.error("❌ Error processing invitations:", invitationError);
      // Don't throw error to avoid breaking the finalization
    }

    // Send thank you emails to all participants
    console.log(
      `📧 Sending thank you emails to participants of Olympiad: ${updatedOlympiad.name}`
    );
    try {
      const emailResult = await sendOlympiadFinishedNotification(
        id,
        updatedOlympiad.name
      );
      totalEmailsSent = emailResult.sentCount;
      console.log(
        `✅ Thank you emails sent: ${emailResult.sentCount}/${emailResult.totalParticipants} participants notified`
      );
    } catch (emailError) {
      console.error("❌ Error sending thank you emails:", emailError);
      // Don't throw error to avoid breaking the finalization
    }

    // Transform the olympiad data
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

    console.log(`✅ Medals finalized for Olympiad: ${updatedOlympiad.name}`);

    return {
      success: true,
      message:
        "Medals have been finalized successfully. Thank you emails have been sent to all participants.",
      olympiad: transformed,
      emailsSent: totalEmailsSent,
    };
  }, "Failed to finalize medals");
};
