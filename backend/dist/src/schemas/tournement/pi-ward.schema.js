import { gql } from "graphql-tag";
export const piWardTypeDefs = gql `
  type PiWardStudent {
    studentId: ID!
    points: Int!
    place: Int!
  }

  type PiWard {
    id: ID!
    tournamentId: ID!
    students: [PiWardStudent!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getPiWard(tournamentId: ID!): PiWard
    getAllPiWards: [PiWard!]!
  }

  type Mutation {
    # Автоматаар оноо тооцоолж хадгална
    createPiWard(tournamentId: ID!): Response!
  }
`;
