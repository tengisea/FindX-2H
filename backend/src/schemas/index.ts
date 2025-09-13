import { commonTypeDefs } from "./common.schema";
import { ClassTypeTypeDefs } from "./classType.schema";
import { StudentAnswerTypeDefs } from "./studentAnswer.schema";
import { QuestionTypeDefs } from "./question.schema";
import { StudentTypeDefs } from "./student.schema";
import { OlympiadTypeDefs } from "./olympiad.schema";
import { OrganizerTypeDefs } from "./organizer.schema";


export const typeDefs = [
  commonTypeDefs,  
  ClassTypeTypeDefs,
  QuestionTypeDefs,
  StudentTypeDefs,
  StudentAnswerTypeDefs,
  OlympiadTypeDefs,
  OrganizerTypeDefs,
];
