import { gql } from "graphql-tag";

export const taskTypeDefs = gql`
  enum TaskType {
    CHALLENGE
    TOURNAMENT
  }

  enum Difficulty {
    EASY
    MEDIUM
    HARD
  }

  enum Topic {
    ALGORITHMS
    DATA_STRUCTURES
    MATH
    STRING
    GRAPH
    DYNAMIC_PROGRAMMING
    GREEDY
    ENGLISH
    TEXT_PROCESSING
    CHEMISTRY
    BIOLOGY
    PHYSICS
    COMPUTER_SCIENCE
    ASTRONOMY
    EARTH_SCIENCE
    LINGUISTICS
    PHILOSOPHY
    HISTORY
    GEOGRAPHY
    ECONOMICS
  }

  type TestCase {
    input: String!
    expectedOutput: String!
    explanation: String
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    topic: Topic!
    difficulty: Difficulty!
    type: TaskType!
    piPoints: Int!
    problemStatement: String!
    aiGenerated: Boolean!
    generatedAt: DateTime!
    usageCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Answer {
    id: ID!
    taskId: ID!
    answer: String!
    solution: String!
    testCases: [TestCase!]!
    aiGenerated: Boolean!
    generatedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input GenerateTaskInput {
    topic: Topic!
    difficulty: Difficulty!
    type: TaskType!
    piPoints: Int!
    taskCount: Int
  }

  input DifficultyDistribution {
    easy: Int
    medium: Int
    hard: Int
  }

  input GenerateMultipleTasksInput {
    topic: Topic!
    type: TaskType!
    piPoints: Int!
    taskCount: Int!
    difficultyDistribution: DifficultyDistribution
  }

  type Query {
    task(id: ID!): Task
    tasks: [Task!]!
    tasksByTopic(topic: Topic!): [Task!]!
    tasksByDifficulty(difficulty: Difficulty!): [Task!]!
    answer(taskId: ID!): Answer
  }

  type Mutation {
    generateTask(input: GenerateTaskInput!): Task!
    generateMultipleTasks(input: GenerateMultipleTasksInput!): [Task!]!
    generateTaskAnswer(taskId: ID!): Answer!
  }
`;