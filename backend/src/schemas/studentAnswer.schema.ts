import { gql } from "graphql-tag";

export const StudentAnswerTypeDefs = gql`
  type StudentAnswerItem {
    questionId: ID!
    score: Int!
  }

  type StudentAnswer {
    id: ID!
    studentId: ID!
    classTypeId: ID!
    answers: [StudentAnswerItem!]!
    totalScoreofOlympiad: Int!
    createdAt: String!
    updatedAt: String!
  }

  input StudentAnswerItemInput {
    questionId: ID!
    score: Int!
  }

  input CreateStudentAnswerInput {
    studentId: ID!
    classTypeId: ID!
    answers: [StudentAnswerItemInput!]!
  }

  input UpdateStudentAnswerInput {
    studentId: ID
    classTypeId: ID
    answers: [StudentAnswerItemInput!]
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
    debugOlympiadData(olympiadId: ID!): String!
  }
`;
