import { gql } from "graphql-tag";

export const OrganizerTypeDefs = gql`
  type Organizer {
    id: ID!
    organizationName: String!
    email: String!
    Olympiads: [ID!]
  }

  input CreateOrganizerInput {
    organizationName: String!
    email: String!
  }

  type Mutation {
    createOrganizer(input: CreateOrganizerInput!): Organizer!
    updateOrganizer(id: ID!, input: CreateOrganizerInput!): Organizer!
  }

  type Query {
    getOrganizer(id: ID!): Organizer!
    getAllOrganizer: [Organizer!]!
  }
`;