import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  scalar DateTime

  enum Response {
    Success
    NOT_FOUND
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
    limit: Int!
    offset: Int!
  }

  input PaginationInput {
    limit: Int
    offset: Int
    page: Int
  }
`;
