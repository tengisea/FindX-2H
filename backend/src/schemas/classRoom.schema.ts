import { gql } from "graphql-tag";

export const ClassRoomTypeDefs = gql`
  type ClassRoom {
    id: ID!
    roomNumber: String!
    mandatNumber: [StudentAnswer!]!
  }

  input CreateClassRoomInput {
    roomNumber: String!
  }

  input UpdateClassRoomInput {
    roomNumber: String
  }

  type Mutation {
    createClassRoom(input: CreateClassRoomInput!): ClassRoom!
    updateClassRoom(id: ID!, input: UpdateClassRoomInput!): ClassRoom!
    deleteClassRoom(id: ID!): Boolean!
  }

  type Query {
    classRoom(id: ID!): ClassRoom
    allClassRooms: [ClassRoom!]!
  }
`;
