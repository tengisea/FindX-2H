import { gql } from "graphql-tag";

export const OlympiadTypeDefs = gql`
  enum OlympiadRankingType {
    NATIONAL
    REGIONAL
    DISTRICT
    SCHOOL
    A_TIER
    B_TIER
    C_TIER
  }

  enum OlympiadStatus {
    OPEN
    CLOSED
    FINISHED
    CANCELLED
    DRAFT
    UNDER_REVIEW
  }

  type Olympiad {
    id: ID!
    name: String!
    description: String!
    closeDay: DateTime
    location: String!
    organizer: Organizer
    classtypes: [ClassType!]!
    participants: [ID!]
    scoreOfAward: Int
    status: OlympiadStatus!
    rankingType: OlympiadRankingType
    invitation: Boolean
    occurringDay: DateTime
  }

  type Organizer {
    id: ID!
    organizationName: String!
    email: String!
    Olympiads: [Olympiad!]
  }

  input CreateOlympiadRequestInput {
    organizerId: ID!
    name: String!
    description: String!
    closeDay: DateTime
    location: String!
    classtypes: [CreateClassTypeInput!]!
    rankingType: OlympiadRankingType
    invitation: Boolean
    occurringDay: DateTime
  }

  input UpdateOlympiadInput {
    description: String
    closeDay: DateTime
    location: String
    rankingType: OlympiadRankingType
    invitation: Boolean
    occurringDay: DateTime
    status: OlympiadStatus
  }

  input UpdateQuestionInput {
    id: ID
    questionName: String
    maxScore: Int
    classTypeId: ID
  }

  input UpdateClassTypeComprehensiveInput {
    id: ID
    classYear: ClassYear
    maxScore: Int
    occurringTime: String
    classRoom: ID
    medalists: Int
    questions: [UpdateQuestionInput!]
  }

  input UpdateClassRoomInput {
    id: ID
    roomNumber: String
  }

  input UpdateOlympiadComprehensiveInput {
    name: String
    description: String
    closeDay: DateTime
    location: String
    rankingType: OlympiadRankingType
    invitation: Boolean
    occurringDay: DateTime
    status: OlympiadStatus
    classTypes: [UpdateClassTypeComprehensiveInput!]
    classRooms: [UpdateClassRoomInput!]
  }

  type RankingResult {
    gold: [ID!]!
    silver: [ID!]!
    bronze: [ID!]!
    top10: [ID!]!
    processedStudents: Int!
  }

  type ProcessRankingResponse {
    success: Boolean!
    message: String!
    gold: [ID!]!
    silver: [ID!]!
    bronze: [ID!]!
    top10: [ID!]!
    processedStudents: Int!
  }

  type ProcessOlympiadRankingResponse {
    success: Boolean!
    message: String!
    classTypesProcessed: Int!
    totalStudentsProcessed: Int!
    results: [RankingResult!]!
  }

  type ClassTypeRankingStats {
    totalParticipants: Int!
    medalists: Int!
    goldCount: Int!
    silverCount: Int!
    bronzeCount: Int!
    top10Count: Int!
    averageScore: Float!
    highestScore: Int!
    lowestScore: Int!
  }

  type FinishOlympiadResponse {
    success: Boolean!
    message: String!
    olympiad: Olympiad!
  }

  type InvitationResult {
    success: Boolean!
    message: String!
    invitedStudents: Int!
    targetOlympiadId: ID
    targetOlympiadName: String
    errors: [String!]
  }

  type InvitationStats {
    totalInvited: Int!
    byClass: [ClassInvitationStats!]!
    byRegion: [RegionInvitationStats!]!
  }

  type ClassInvitationStats {
    classYear: String!
    count: Int!
  }

  type RegionInvitationStats {
    region: String!
    count: Int!
  }

  type Mutation {
    createOlympiad(input: CreateOlympiadRequestInput!): Olympiad!
    updateOlympiad(id: ID!, input: UpdateOlympiadInput!): Olympiad!
    updateOlympiadComprehensive(id: ID!, input: UpdateOlympiadComprehensiveInput!): Olympiad!
    deleteOlympiad(id: ID!): Boolean!
    finishOlympiad(id: ID!): FinishOlympiadResponse!
    processClassTypeRankings(classTypeId: ID!): ProcessRankingResponse!
    processOlympiadRankings(olympiadId: ID!): ProcessOlympiadRankingResponse!
    getClassTypeRankingStats(classTypeId: ID!): ClassTypeRankingStats!
    processInvitations(olympiadId: ID!): [InvitationResult!]!
  }

  type Query {
    olympiad(id: ID!): Olympiad!
    allOlympiads: [Olympiad!]!
    getPendingOlympiads: [Olympiad!]!
    getAllApprovedOlympiads: [Olympiad!]!
    getOlympiadByClassYear(classYear: ClassYear!): [Olympiad!]!
    getInvitationStats(olympiadId: ID!): InvitationStats!
  }
`;
