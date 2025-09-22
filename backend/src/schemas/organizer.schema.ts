import { gql } from "graphql-tag";

export const OrganizerTypeDefs = gql`
  type Olympiad {
    id: ID!
    name: String!
  }

  type Organizer {
    id: ID!
    organizationName: String!
    email: String!
    logo: String!
    Olympiads: [Olympiad!]
  }

  input CreateOrganizerInput {
    organizationName: String!
    email: String!
    logo: String!
  }

  input UpdateOrganizerInput {
    organizationName: String
    email: String
    logo: String
  }

  type Mutation {
    createOrganizer(input: CreateOrganizerInput!): Organizer!
    updateOrganizer(id: ID!, input: UpdateOrganizerInput!): Organizer!
  }

  type Query {
    getOrganizer(id: ID!): Organizer!
    getAllOrganizers: [Organizer!]!
  }
`;
