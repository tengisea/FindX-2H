import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_STUDENT = gql`
  query GetStudent($getStudentId: ID!) {
    getStudent(id: $getStudentId) {
      id
      name
      email
      province
      district
      school
      class
      profilePicture
      ranking
      participatedOlympiads
      gold
      silver
      bronze
      top10
      rankingHistory {
        changedBy
        changedTo
        reason
        olympiadId
        date
        pointsGained
      }
      createdAt
      updatedAt
    }
  }
`;

interface Student {
  id: string;
  name: string;
  email: string;
  province: string;
  district: string;
  school: string;
  class: string;
  profilePicture?: string;
  ranking: number;
  participatedOlympiads: string[];
  gold: string[];
  silver: string[];
  bronze: string[];
  top10: number;
  rankingHistory: {
    changedBy: string;
    changedTo: number;
    reason: string;
    olympiadId: string;
    date: string;
    pointsGained: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface GetStudentQuery {
  getStudent: Student;
}

interface UseStudentDetailResult {
  student: Student | null;
  loading: boolean;
  error: any;
}

export const useStudentDetail = (
  studentId: string
): UseStudentDetailResult => {
  const { data, loading, error } = useQuery<GetStudentQuery>(GET_STUDENT, {
    variables: { getStudentId: studentId },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    skip: !studentId,
  });

  return {
    student: data?.getStudent || null,
    loading,
    error,
  };
};
