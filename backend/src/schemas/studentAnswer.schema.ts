import { gql } from "graphql-tag";

export const StudentAnswerTypeDefs = gql`
  type StudentAnswerItem {
    questionId: ID!
    score: Int!
    description: String!
  }

  type StudentAnswer {
    id: ID!
    studentId: ID!
    classTypeId: ID!
    answers: [StudentAnswerItem!]!
    totalScoreofOlympiad: Int
    createdAt: String!
    updatedAt: String!
    image: [String!]!
  }

  input StudentAnswerItemInput {
    questionId: ID!
    score: Int!
    description: String!
  }

  input CreateStudentAnswerInput {
    studentId: ID!
    classTypeId: ID!
    answers: [StudentAnswerItemInput!]!
    image: [String!]!
  }

  input UpdateStudentAnswerInput {
    studentId: ID
    classTypeId: ID
    answers: [StudentAnswerItemInput!]
    totalScoreofOlympiad: Int
    image: [String!]
  }

  type Mutation {
    createStudentAnswer(input: CreateStudentAnswerInput!): StudentAnswer!
    updateStudentAnswer(
      id: ID!
      input: UpdateStudentAnswerInput!
    ): StudentAnswer!
    updateStudentAnswerScore(
      studentAnswerId: ID!
      questionId: ID!
      score: Int!
    ): StudentAnswer!
    deleteStudentAnswer(id: ID!): Boolean!
  }

  type Query {
    studentAnswer(id: ID!): StudentAnswer
    allStudentAnswers: [StudentAnswer!]!
    studentAnswersByClassType(classTypeId: ID!): [StudentAnswer!]!
    getStudentsByOlympiadId(olympiadId: ID!): [StudentAnswer!]!
    getStudentsByStudentId(studentId: ID!): [StudentAnswer!]!
  }
`;
