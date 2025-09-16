import { commonTypeDefs } from "./common.schema";
import { ClassTypeTypeDefs } from "./classType.schema";
import { StudentAnswerTypeDefs } from "./studentAnswer.schema";
import { QuestionTypeDefs } from "./question.schema";
import { StudentTypeDefs } from "./student.schema";
import { OlympiadTypeDefs } from "./olympiad.schema";
import { OrganizerTypeDefs } from "./organizer.schema";
import { taskTypeDefs } from "./task.schema";
import { challengeTypeDefs } from "./challenge.schema";
import { challengeRoomTypeDefs } from "./challengeRoom.schema";
import { challengeRoomResponseTypeDefs } from "./challengeRoomResponse.schema";
import { matchRoomTypeDefs, piWardTypeDefs, tournamentTypeDefs } from "./tournement";


export const typeDefs = [
  commonTypeDefs,  
  ClassTypeTypeDefs,
  QuestionTypeDefs,
  StudentTypeDefs,
  StudentAnswerTypeDefs,
  OlympiadTypeDefs,
  OrganizerTypeDefs,
  challengeTypeDefs,
  challengeRoomTypeDefs,
  challengeRoomResponseTypeDefs,
  taskTypeDefs,
   matchRoomTypeDefs, 
   tournamentTypeDefs,
   piWardTypeDefs
];
