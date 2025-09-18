import { gql } from "graphql-tag";

export const StudentTypeDefs = gql`
  enum MedalType {
    GOLD
    SILVER
    BRONZE
    TOP10
  }

  enum StudentClass {
    GRADE_1
    GRADE_2
    GRADE_3
    GRADE_4
    GRADE_5
    GRADE_6
    GRADE_7
    GRADE_8
    GRADE_9
    GRADE_10
    GRADE_11
    GRADE_12
  }

  type RankingHistory {
    changedBy: Int!
    changedTo: Int!
    reason: String!
    olympiadId: ID!
    date: String!
    pointsGained: Int
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    province: String!
    district: String!
    school: String!
    class: StudentClass!
    profilePicture: String!
    ranking: Int!
    participatedOlympiads: [ID!]!
    gold: [ID!]!
    silver: [ID!]!
    bronze: [ID!]!
    top10: [ID!]!
    rankingHistory: [RankingHistory!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateStudentInput {
    name: String!
    email: String!
    province: String!
    district: String!
    school: String!
    class: StudentClass!
    profilePicture: String!
  }

  input UpdateStudentInput {
    email: String
    school: String
    class: StudentClass
    profilePicture: String
    province: String
    district: String
  }

  input RegisterForOlympiadInput {
    studentId: ID!
    classTypeId: ID!
    olympiadId: ID!
  }

  input RankingHistoryInput {
    changedBy: ID!
    changedTo: Int!
    reason: String!
    olympiadId: ID!
  }

  type Mutation {
    createStudent(input: CreateStudentInput!): Student!
    updateStudent(id: ID!, input: UpdateStudentInput!): Student!
    deleteStudent(id: ID!): Boolean!

    registerForOlympiad(input: RegisterForOlympiadInput!): Student!

    updateMedals(id: ID!, olympiadId: ID!, medal: MedalType!): Student!

    updateRanking(
      id: ID!
      change: Int!
      reason: String!
      olympiadId: ID
    ): Student!
  }

  type Query {
    getStudent(id: ID!): Student
    getAllStudent: [Student!]!
    students(
      class: StudentClass
      school: String
      province: String
      district: String
      olympiadId: ID
      medal: MedalType
    ): [Student!]!
  }
`;
