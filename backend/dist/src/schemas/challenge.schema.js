import { gql } from "graphql-tag";
export const challengeTypeDefs = gql `
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

  enum ChallengeAnswerFormat {
    MULTIPLE_CHOICE
    SHORT_TEXT
  }

  # New input types for multiple answer formats
  input AnswerFormatDistribution {
    easy: ChallengeAnswerFormat
    medium: ChallengeAnswerFormat
    hard: ChallengeAnswerFormat
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
    tasks: [Task!]!
    classType: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input ChallengeInput {
    challenger: ID!
    opponent: ID!
    topic: String!
    difficulty: Difficulty!
    classType: String!
    taskCount: Int!
    answerFormatDistribution: AnswerFormatDistribution
    taskDifficultyDistribution: AnswerFormatDistribution
    piPoints: Int
  }

  input AssignTasksToChallengeInput {
    challengeId: ID!
    taskIds: [ID!]!
  }

  type Query {
    getChallenge(id: ID!): Challenge
    listChallenges(studentId: ID!): [Challenge!]!
  }

  type Mutation {
    createChallenge(input: ChallengeInput!): ID!
    assignTasksToChallenge(input: AssignTasksToChallengeInput!): Challenge!
  }
`;
