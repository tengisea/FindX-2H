import {
  OlympiadModel,
  ClassTypeModel,
  QuestionModel,
  ClassRoomModel,
} from "@/models";
import {
  transformDocument,
  mapClassYearToDB,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";
import { GraphQLError } from "graphql";

export const updateOlympiadComprehensive = async (
  _: unknown,
  { id, input }: any
) => {
  console.log(`🔄 Starting comprehensive update for olympiad: ${id}`);
  try {
    const olympiad = await OlympiadModel.findById(id);
    if (!olympiad) {
      throw new GraphQLError("Olympiad not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    // Update top-level Olympiad fields
    if (input.name) olympiad.name = input.name;
    if (input.description) olympiad.description = input.description;
    if (input.closeDay !== undefined) olympiad.closeDay = input.closeDay;
    if (input.location !== undefined) olympiad.location = input.location;
    if (input.rankingType) olympiad.rankingType = input.rankingType;
    if (input.invitation !== undefined) olympiad.invitation = input.invitation;
    if (input.occurringDay !== undefined)
      olympiad.occurringDay = input.occurringDay;
    if (input.status) olympiad.status = input.status;

    await olympiad.save(); // Save to trigger any pre-save middleware

    // Update ClassTypes
    if (input.classTypes && input.classTypes.length > 0) {
      for (const classTypeInput of input.classTypes) {
        if (classTypeInput.id) {
          const classType = await ClassTypeModel.findById(classTypeInput.id);
          if (classType) {
            if (classTypeInput.classYear)
              classType.classYear = mapClassYearToDB(
                classTypeInput.classYear
              ) as any;
            if (classTypeInput.maxScore !== undefined)
              classType.maxScore = classTypeInput.maxScore;
            if (classTypeInput.occurringTime !== undefined)
              classType.occurringTime = classTypeInput.occurringTime;
            if (classTypeInput.medalists !== undefined)
              classType.medalists = classTypeInput.medalists;
            await classType.save();
            console.log(`✅ Updated ClassType: ${classType.id}`);

            // Update Questions within this ClassType
            if (
              classTypeInput.questions &&
              classTypeInput.questions.length > 0
            ) {
              for (const questionInput of classTypeInput.questions) {
                if (questionInput.id) {
                  const question = await QuestionModel.findById(
                    questionInput.id
                  );
                  if (question) {
                    if (questionInput.questionName)
                      question.questionName = questionInput.questionName;
                    if (questionInput.maxScore !== undefined)
                      question.maxScore = questionInput.maxScore;
                    await question.save();
                    console.log(`✅ Updated Question: ${question.id}`);
                  }
                } else {
                  // Handle new questions if needed (create new QuestionModel)
                  const newQuestion = new QuestionModel({
                    classTypeId: classType.id,
                    questionName: questionInput.questionName,
                    maxScore: questionInput.maxScore,
                  });
                  await newQuestion.save();
                  classType.questions.push(newQuestion._id as any);
                  await classType.save();
                  console.log(`➕ Created new Question: ${newQuestion.id}`);
                }
              }
            }
          }
        } else {
          // Handle new ClassTypes if needed (create new ClassTypeModel)
          const newClassType = new ClassTypeModel({
            olympiadId: olympiad.id,
            classYear: mapClassYearToDB(classTypeInput.classYear),
            maxScore: classTypeInput.maxScore,
            occurringTime: classTypeInput.occurringTime,
            rooms: classTypeInput.rooms || [],
            medalists: classTypeInput.medalists,
          });
          await newClassType.save();
          olympiad.classtypes.push(newClassType._id as any);
          await olympiad.save();
          console.log(`➕ Created new ClassType: ${newClassType.id}`);

          if (classTypeInput.questions && classTypeInput.questions.length > 0) {
            for (const questionInput of classTypeInput.questions) {
              const newQuestion = new QuestionModel({
                classTypeId: newClassType._id,
                questionName: questionInput.questionName,
                maxScore: questionInput.maxScore,
              });
              await newQuestion.save();
              newClassType.questions.push(newQuestion._id as any);
            }
            await newClassType.save();
          }
        }
      }
    }

    // Update ClassRooms
    if (input.classRooms && input.classRooms.length > 0) {
      for (const classRoomInput of input.classRooms) {
        if (classRoomInput.id) {
          const classRoom = await ClassRoomModel.findById(classRoomInput.id);
          if (classRoom) {
            if (classRoomInput.roomNumber)
              classRoom.roomNumber = classRoomInput.roomNumber;
            await classRoom.save();
            console.log(`✅ Updated ClassRoom: ${classRoom.id}`);
          }
        } else {
          // Handle new ClassRooms if needed (create new ClassRoomModel)
          const newClassRoom = new ClassRoomModel({
            roomNumber: classRoomInput.roomNumber,
          });
          await newClassRoom.save();
          console.log(`➕ Created new ClassRoom: ${newClassRoom.id}`);
        }
      }
    }

    const populatedOlympiad = await OlympiadModel.findById(id)
      .populate({
        path: "classtypes",
        populate: [
          { path: "questions", model: "Question" },
          { path: "rooms", model: "ClassRoom" },
        ],
      })
      .populate({
        path: "organizer",
        select: "organizationName email",
      });

    if (!populatedOlympiad) {
      throw new GraphQLError("Failed to retrieve updated olympiad data", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
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
            rooms: classType.rooms
              ? classType.rooms.map((room: any) => ({
                  id: room._id?.toString() || room.id,
                  roomNumber: room.roomNumber,
                  maxStudents: room.maxStudents,
                  mandatNumber: room.mandatNumber || [],
                  classTypeId: room.classTypeId?.toString() || room.classTypeId,
                }))
              : [],
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
    console.log(`✅ Comprehensive update completed for olympiad: ${id}`);
    return transformed;
  } catch (error: any) {
    console.error("❌ Comprehensive update error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(
      error.message || "Failed to perform comprehensive olympiad update",
      {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      }
    );
  }
};
