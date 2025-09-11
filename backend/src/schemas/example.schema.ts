import { gql } from "graphql-tag";

export const exampleTypeDefs = gql`
  type Example {
    id: String
    age: Int
    phoneNumber: String
  }

  input CreateExampleInput {
    age: Int
    phoneNumber: String
  }

  type Query {
    example: Example
  }

  type Mutation {
    createExample(input: CreateExampleInput!): Response!
  }
`;
