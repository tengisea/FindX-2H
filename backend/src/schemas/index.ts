import { commonTypeDefs } from "./common.schema";
import { taskTypeDefs } from "./task.schema";
import { challengeTypeDefs } from "./challenge.schema";
import { challengeRoomTypeDefs } from "./challengeRoom.schema";
import { challengeRoomResponseTypeDefs } from "./challengeRoomResponse.schema";

export const typeDefs = [
  commonTypeDefs,
  challengeTypeDefs,
  challengeRoomTypeDefs,
  challengeRoomResponseTypeDefs,
  taskTypeDefs,
];
