import { gql } from "graphql-tag";

export const matchRoomTypeDefs = gql`
# 🔹 Enum Status (ялагч update хийхэд ашиглаж болохоор)
enum MatchStatus {
  PENDING
  COMPLETED
}
type Response {
  success: Boolean!
  message: String
}

# 🔹 MatchRoom Type
type MatchRoom {
  id: ID!
  task: String!          # Тоглолтын нэр, жишээ: "Quarterfinals Match 1"
  round: String!         # Шатны нэр: "Quarterfinals", "Semifinals", "Finals"
  scheduleAt: String!    # Тоглолт эхлэх цаг
  slotA: ID!        # Оролцогч A
  slotB: ID!        # Оролцогч B
  winner: ID        # Ялагч (тоглолт дууссаны дараа fill хийнэ)
  loser: ID         # Хувьчин (тоглолт дууссаны дараа fill хийнэ)
  tournamentId: ID!      # Хамаарах Tournament
  status: MatchStatus!   # Тоглолтын төлөв
}

# 🔹 Input Types
input CreateMatchInput {
  task: String!
  scheduleAt: String!
  slotA: ID!
  slotB: ID!
  tournamentId: ID!
}

input UpdateWinnerInput {
  matchId: ID!
  winnerId: ID!
  loserId: ID!
}

# 🔹 Mutations
type Mutation {
  createMatch(input: CreateMatchInput!): Response!
  updateWinner(input: UpdateWinnerInput!): Response!
}

# 🔹 Queries
type Query {
  getMatchRooms(tournamentId: ID!): [MatchRoom!]!
  getMatchRoom(id: ID!): MatchRoom
}

`;