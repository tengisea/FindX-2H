import { gql } from "graphql-tag";

export const StudentAnswerTypeDefs = gql`
  type Answer {
    questionId: ID!
    score: Int!
  }

  type StudentAnswer {
    id: ID!
    studentId: ID!
    classTypeId: ID!
    answers: [Answer!]!
    totalScoreofOlympiad: Int!
    createdAt: String!
    updatedAt: String!
  }

  input AnswerInput {
    score: Int!
  }

  input CreateStudentAnswerInput {
    studentId: ID!
    classTypeId: ID!
    answers: [AnswerInput!]!
  }

  input UpdateStudentAnswerInput {
    studentId: ID
    classTypeId: ID
    answers: [AnswerInput!]
  }

  type Mutation {
    createStudentAnswer(input: CreateStudentAnswerInput!): StudentAnswer!
    updateStudentAnswer(id: ID!, input: UpdateStudentAnswerInput!): StudentAnswer!
    deleteStudentAnswer(id: ID!): Boolean!
  }

  type Query {
    studentAnswer(id: ID!): StudentAnswer
    allStudentAnswers: [StudentAnswer!]!
    studentAnswersByClassType(classTypeId: ID!): [StudentAnswer!]!
  }
`;
