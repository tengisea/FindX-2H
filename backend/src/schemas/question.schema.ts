import { gql } from "graphql-tag";

export const QuestionTypeDefs = gql`
  type Question {
    id: ID!
    classTypeId: ID
    questionName: String!
    maxScore: Int!
  }

  input CreateQuestionInput {
    questionName: String!
    maxScore: Int!
    classTypeId: ID
  }

  input UpdateQuestionInput {
    questionName: String!
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
