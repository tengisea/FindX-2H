import { gql } from "graphql-tag";
export const challengeRoomResponseTypeDefs = gql `
  type ChallengeRoomResponse {
    id: ID!
    challengeRoomId: ID!
    studentId: ID!
    submittedAnswer: String!
    isCorrect: Boolean!
    points: Int!
    submittedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input ChallengeRoomResponseInput {
    challengeRoomId: ID!
    studentId: ID!
    submittedAnswer: String!
  }

  type Mutation {
    createChallengeRoomResponse(
      input: ChallengeRoomResponseInput!
    ): ChallengeRoomResponse!
  }

  type Query {
    getChallengeRoomResponse(id: ID!): ChallengeRoomResponse
    listChallengeRoomResponses(roomId: ID!): [ChallengeRoomResponse!]!
    listStudentChallengeResponses(studentId: ID!): [ChallengeRoomResponse!]!
  }
`;
