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
    SCIENCE
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

  enum ClassType {
    GRADE_1
    GRADE_2
    GRADE_3
    GRADE_4
    GRADE_5
    GRADE_6
    GRADE_7
    GRADE_8
    GRADE_9
    GRADE_10
    GRADE_11
    GRADE_12
  }

  enum AnswerFormat {
    SINGLE_NUMBER
    SINGLE_WORD
    MULTIPLE_CHOICE
    SHORT_TEXT
    LONG_TEXT
    CODE_SOLUTION
    DRAWING
    TRUE_FALSE
  }

  type TestCase {
    input: String!
    expectedOutput: String!
    explanation: String
  }

  type MultipleChoiceOption {
    letter: String!
    text: String!
    isCorrect: Boolean!
  }

  type AnswerValidation {
    format: AnswerFormat!
    correctAnswers: [String!]!
    multipleChoiceOptions: [MultipleChoiceOption!]
    partialCreditAnswers: [String!]
    validationRules: String
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    topic: Topic!
    difficulty: Difficulty!
    type: TaskType!
    classType: ClassType!
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
    testCases: [TestCase!]
    answerValidation: AnswerValidation!
    aiGenerated: Boolean!
    generatedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input GenerateTaskInput {
    topic: Topic!
    difficulty: Difficulty!
    type: TaskType!
    classType: ClassType!
    piPoints: Int!
    taskCount: Int
    answerFormat: AnswerFormat
  }

  input DifficultyDistribution {
    easy: Int
    medium: Int
    hard: Int
  }

  input GenerateMultipleTasksInput {
    topic: Topic!
    type: TaskType!
    classType: ClassType!
    piPoints: Int!
    taskCount: Int!
    difficultyDistribution: DifficultyDistribution
    answerFormat: AnswerFormat
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