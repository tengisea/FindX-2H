import { gql } from "graphql-tag";

export const MandatTypeDefs = gql`
  type MandatData {
    mandatNumber: String!
    studentName: String!
    studentEmail: String!
    school: String!
    class: String!
    province: String!
    region: String!
    olympiadName: String!
    olympiadLocation: String!
    olympiadDate: String!
    classType: String!
    roomNumber: String
    organizerName: String!
    organizerLogo: String
    registrationDate: String!
  }

  type Query {
    getMandatData(
      studentId: ID!
      classTypeId: ID!
      olympiadId: ID!
    ): MandatData!
    getMandatDataByStudentAnswer(studentAnswerId: ID!): MandatData!
    getStudentMandats(studentId: ID!): [MandatData!]!
    getOlympiadMandats(olympiadId: ID!): [MandatData!]!
  }
`;
