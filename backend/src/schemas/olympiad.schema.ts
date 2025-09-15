import { gql } from "graphql-tag";

export const OlympiadTypeDefs = gql`
  type Olympiad {
    id: ID!
    name: String!
    description: String!
    date: String!
    location: String!
    organizer: ID!
    classtypes: [ClassType!]!
    scoreOfAward: Int
    status: String!
  }

  input CreateOlympiadRequestInput {
    organizerId: ID!
    name: String!
    description: String!
    date: String!
    location: String!
    classtypes: [CreateClassTypeInput!]!
  }

  input ApproveOlympiadInput {
    scoreOfAward: Int!
  }

  input UpdateOlympiadInput {
    description: String
    date: String
    location: String
  }

  type Mutation {
    requestOlympiad(input: CreateOlympiadRequestInput!): Olympiad!
    approveOlympiad(id: ID!, input: ApproveOlympiadInput!): Olympiad!
    updateOlympiad(id: ID!, input: UpdateOlympiadInput!): Olympiad!
    deleteOlympiad(id: ID!): Boolean!
  }

  type Query {
    olympiad(id: ID!): Olympiad!
    allOlympiads: [Olympiad!]!
    getPendingOlympiads: [Olympiad!]!
    getAllApprovedOlympiads: [Olympiad!]!
    getOlympiadByClassYear(classYear: ClassYear!): [Olympiad!]!
  }
`;
