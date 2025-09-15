import { gql } from "graphql-tag";

export const ClassTypeTypeDefs = gql`
  enum ClassYear {
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

  type ClassType {
    id: ID!
    classYear: ClassYear!
    maxScore: Int!
    questions: [Question!]!
    medalists: Int!
    participants: [ID!]!
    studentsResults: [ID!]!
    olympiadId: ID
  }

  type Question {
    id: ID!
    classTypeId: ID!
    questionName: String!
    maxScore: Int!
  }

  input CreateClassTypeInput {
    classYear: ClassYear!
    maxScore: Int!
    questions: [CreateQuestionInput!]!
    medalists: Int!
  }

  input CreateQuestionInput {
    questionName: String!
    maxScore: Int!
  }

  input UpdateClassTypeInput {
    classYear: ClassYear!
    maxScore: Int!
    medalists: Int!
  }

  type Mutation {
    createClassType(input: CreateClassTypeInput!): ClassType!
    updateClassType(id: ID!, input: UpdateClassTypeInput!): ClassType!
    deleteClassType(id: ID!): Boolean!
  }

  type Query {
    classType(id: ID!): ClassType!
    allClassTypes: [ClassType!]!
    classTypesByOlympiad(olympiadId: ID!): [ClassType!]!
    classTypesByClassYear(classYear: ClassYear!): [ClassType!]!
    participantsByClassType(classTypeId: ID!): [ID!]!
    studentsResultsByClassType(classTypeId: ID!): [ID!]!
  }
`;