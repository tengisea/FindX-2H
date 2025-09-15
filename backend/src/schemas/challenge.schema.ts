import { gql } from "graphql-tag";

export const challengeTypeDefs = gql`
  enum Difficulty {
    EASY
    MEDIUM
    HARD
  }

  enum Status {
    PENDING
    COMPLETED
    CANCELLED
  }

  type Challenge {
    id: ID!
    topic: String!
    difficulty: Difficulty!
    challenger: ID!
    opponent: ID!
    participants: [ID!]!
    winner: ID
    piPoints: Int!
    status: Status!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input ChallengeInput {
    challenger: ID!
    opponent: ID!
    topic: String!
    difficulty: Difficulty!
  }

  type Query {
    getChallenge(id: ID!): Challenge
    listChallenges(studentId: ID!): [Challenge!]!
  }

  type Mutation {
    createChallenge(input: ChallengeInput!): ID!
  }
`;
