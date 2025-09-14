import { gql } from "graphql-tag";

export const challengeRoomTypeDefs = gql`
  enum Status {
    WAITING
    ACTIVE
    FINISHED
  }

  type ChallengeRoom {
    id: ID!
    challengeId: ID!
    challengerId: ID!
    opponentId: ID!
    status: Status!
    winnerId: ID
    challengerScore: Int!
    opponentScore: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input ChallengeRoomInput {
    challengeId: ID!
    challengerId: ID!
    opponentId: ID!
  }

  input UpdateChallengeRoomInput {
    roomId: ID!
    status: Status
    winnerId: ID
    challengerScore: Int
    opponentScore: Int
  }

  type Query {
    getChallengeRoom(id: ID!): ChallengeRoom!
    listChallengeRoomsByStudent(studentId: ID!): [ChallengeRoom!]!
  }

  type Mutation {
    createChallengeRoom(input: ChallengeRoomInput!): ChallengeRoom!
    updateChallengeRoom(input: UpdateChallengeRoomInput!): ChallengeRoom!
  }
`;
