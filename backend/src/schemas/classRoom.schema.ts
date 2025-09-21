import { gql } from "graphql-tag";

export const ClassRoomTypeDefs = gql`

  type ClassRoom {
    id: ID!
    roomNumber: String!
    maxStudents: Int!
    mandatNumber: [String!]!
  }

  input CreateClassRoomInput {
    roomNumber: String!
    classTypeId: ID!
    maxStudents: Int!
  }

  input UpdateClassRoomInput {
    roomNumber: String
    maxStudents: Int
    mandatNumber: [String!]
  }

  type Mutation {
    createClassRoom(input: CreateClassRoomInput!): ClassRoom!
    updateClassRoom(id: ID!, input: UpdateClassRoomInput!): ClassRoom!
    deleteClassRoom(id: ID!): Boolean!
  }

  type Query {
    classRoom(id: ID!): ClassRoom
    allClassRooms: [ClassRoom!]!
    getClassRoomByClassTypeId(classTypeId: ID!): [ClassRoom!]!
    getClassRoomByMandatNumber(mandatNumber: String!): ClassRoom!
  }
`;
