import { gql } from "graphql-tag";

export const StudentTypeDefs = gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    school: String!
    class: String!
    location: String!
    profilePicture: String!
    totalScore: Int!
    piPoints: Int!
    participatedOlympiads: [ID!]!
    createdAt: String!
    updatedAt: String!
  }

input CreateStudentInput {
    name: String!
    email: String!
    school: String!
    class: String!
    location: String!
    profilePicture: String!
  }

  input UpdateStudentInput {
    email: String
    school: String
    class: String
    location: String 
    profilePicture: String
  }

  type Mutation {
    createStudent(input: CreateStudentInput!): Student!
    updateStudent(id: ID!, input: UpdateStudentInput!): Student!
    deleteStudent(id: ID!): Boolean!
    addOlympiad(id: ID!, olympiadId: ID!): Student!
    updateTotalScore(id: ID!, totalScore: Int!): Student!
    updatePiPoints(id: ID!, piPoints: Int!): Student!
  }

  type Query {
    student(id: ID!): Student
    studentsByOlympiad(olympiadId: ID!): [Student!]!
    studentsByClassType(classTypeId: ID!): [Student!]!
    studentsByClass(class: String!): [Student!]!
    studentsBySchool(school: String!): [Student!]!
    studentsByLocation(location: String!): [Student!]!
    getAllStudent: [Student!]!
  }
`;
