import { gql } from "graphql-tag";

export const ClassTypeTypeDefs = gql`
  enum ClassYear {
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
    C_CLASS
    D_CLASS
    E_CLASS
    F_CLASS
    ANGI_1
    ANGI_2
    ANGI_3
    ANGI_4
    ANGI_5
    ANGI_6
    ANGI_7
    ANGI_8
    ANGI_9
    ANGI_10
    ANGI_11
    ANGI_12
  }

  type BestMaterial {
    studentId: ID!
    materialImages: [String!]!
    description: String!
  }

  type ClassType {
    id: ID!
    classYear: ClassYear!
    maxScore: Int!
    occurringTime: String
    rooms: [ClassRoom!]
    questions: [Question!]!
    medalists: Int!
    participants: [ID!]
    studentsAnswers: [ID!]
    olympiadId: ID
    bestMaterials: [BestMaterial!]
    gold: [ID!]
    silver: [ID!]
    bronze: [ID!]
    top10: [ID!]
  }

  type Question {
    id: ID!
    classTypeId: ID
    questionName: String!
    maxScore: Int!
  }

  input CreateClassTypeInput {
    classYear: ClassYear!
    maxScore: Int!
    occurringTime: String
    questions: [CreateQuestionInput!]!
    medalists: Int!
    olympiadId: ID
  }

  input CreateQuestionInput {
    questionName: String!
    maxScore: Int!
  }

  input UpdateClassTypeInput {
    classYear: ClassYear
    maxScore: Int
    occurringTime: String
    classRoom: ID
    medalists: Int
    rooms: [ID!]
    olympiadId: ID
    bestMaterials: [BestMaterialInput!]
    gold: [ID!]
    silver: [ID!]
    bronze: [ID!]
    top10: [ID!]
  }

  input BestMaterialInput {
    studentId: ID!
    materialImages: [String!]!
    description: String!
  }

  input CreateBestMaterialInput {
    studentId: ID!
    materialImages: [String!]!
    description: String!
  }

  input UpdateBestMaterialInput {
    studentId: ID!
    materialImages: [String!]!
    description: String!
  }

  type Mutation {
    createClassType(input: CreateClassTypeInput!): ClassType!
    updateClassType(id: ID!, input: UpdateClassTypeInput!): ClassType!
    deleteClassType(id: ID!): Boolean!
    createBestMaterial(input: CreateBestMaterialInput!): BestMaterial!
    updateBestMaterial(id: ID!, input: UpdateBestMaterialInput!): BestMaterial!
    deleteBestMaterial(id: ID!): Boolean!
  }

  type Query {
    classType(id: ID!): ClassType!
    allClassTypes: [ClassType!]!
    classTypesByOlympiad(olympiadId: ID!): [ClassType!]!
    classTypesByClassYear(classYear: ClassYear!): [ClassType!]!
    participantsByClassType(classTypeId: ID!): [ID!]!
    studentsResultsByClassType(classTypeId: ID!): [ID!]!
    getStudentsByOlympiadId(olympiadId: ID!): [StudentAnswer!]!
    bestMaterialsByClassType(classTypeId: ID!): [BestMaterial!]!
    getAllBestMaterials: [BestMaterial!]!
  }
`;
