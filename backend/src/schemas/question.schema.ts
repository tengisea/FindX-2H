import { gql } from "graphql-tag";

export const QuestionTypeDefs = gql`
  type Question {
    id: ID!
    classTypeId: ID!
    questionNumber: Int!
    maxScore: Int!
  }

  input CreateQuestionInput {
    questionNumber: Int!
    maxScore: Int!
  }

  input UpdateQuestionInput {
    questionNumber: Int!
    maxScore: Int!
  }
  
  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question!
    updateQuestion(id: ID!, input: UpdateQuestionInput!): Question!
    deleteQuestion(id: ID!): Boolean!
  }

  type Query {
    questionsByClassType(classTypeId: ID!): [Question!]!
    question(id: ID!): Question!
  }
`;