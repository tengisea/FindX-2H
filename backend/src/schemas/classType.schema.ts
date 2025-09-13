import { gql } from "graphql-tag";

export const ClassTypeTypeDefs = gql`
  type ClassType {
    id: ID!
    classYear: ClassYear!
    maxScore: Int!
    questions: [ID!]!
    medalists: Int!
    participants: [ID!]!
    studentsResults: [ID!]!
    olympiadId: ID!
  }

  input CreateClassTypeInput {
    classYear: ClassYear!
    maxScore: Int!
    questions: [ID!]!
    medalists: Int!
    participants: [ID!]!
    studentsResults: [ID!]!
    olympiadId: ID!
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