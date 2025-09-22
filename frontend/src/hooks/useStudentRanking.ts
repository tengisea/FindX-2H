import { useQuery, gql } from "@apollo/client";
import { useMemo } from "react";

const GET_STUDENTS_MINIMAL = gql`
  query GetAllStudent {
    getAllStudent {
      id
      name
      ranking
      class
      province
      region
      participatedOlympiads
      gold
      silver
      bronze
      profilePicture
    }
  }
`;

interface Student {
  id: string;
  name: string;
  ranking: number;
  class: string;
  province: string;
  region: string;
  participatedOlympiads: string[];
  gold: string[];
  silver: string[];
  bronze: string[];
  profilePicture?: string;
}

interface GetAllStudentsQuery {
  getAllStudent: Student[];
}

interface StudentRanking {
  id: string;
  name: string;
  ranking: number;
  class: string;
  province: string;
  region: string;
  totalMedals: number;
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
  participatedOlympiads: number;
  gold: string[];
  silver: string[];
  bronze: string[];
  profilePicture?: string;
}

interface UseStudentRankingResult {
  allStudents: StudentRanking[];
  currentStudentRank: number | null;
  currentStudent: StudentRanking | null;
  loading: boolean;
  error: any;
  totalStudents: number;
}

export const useStudentRanking = (
  currentStudentId?: string
): UseStudentRankingResult => {
  const { data, loading, error } = useQuery<GetAllStudentsQuery>(
    GET_STUDENTS_MINIMAL,
    {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    }
  );

  const result = useMemo(() => {
    if (error) {
      console.error("Student ranking error:", error);
    }

    if (loading) {
      return {
        allStudents: [],
        currentStudentRank: null,
        currentStudent: null,
        loading: true,
        error: null,
        totalStudents: 0,
      };
    }

    if (!data?.getAllStudent) {
      return {
        allStudents: [],
        currentStudentRank: null,
        currentStudent: null,
        loading: false,
        error: error || new Error("No student data available"),
        totalStudents: 0,
      };
    }

    // Тооцоолол
    const studentsWithMedals = data.getAllStudent.map((student) => {
      const goldCount = Array.isArray(student.gold) ? student.gold.length : 0;
      const silverCount = Array.isArray(student.silver)
        ? student.silver.length
        : 0;
      const bronzeCount = Array.isArray(student.bronze)
        ? student.bronze.length
        : 0;
      const totalMedals = goldCount + silverCount + bronzeCount;
      const participatedOlympiads = Array.isArray(student.participatedOlympiads)
        ? student.participatedOlympiads.length
        : 0;

      return {
        id: student.id,
        name: student.name?.trim() || "Unknown Student",
        ranking: student.ranking || 0,
        class: student.class || "",
        province: student.province || "",
        region: student.region || "",
        totalMedals,
        goldCount,
        silverCount,
        bronzeCount,
        participatedOlympiads,
        // Include the original medal arrays for the View functionality
        gold: student.gold || [],
        silver: student.silver || [],
        bronze: student.bronze || [],
        profilePicture: student.profilePicture,
      };
    });

    // Эрэмбэлэлт
    const sortedStudents = [...studentsWithMedals].sort((a, b) => {
      // Оноо (их байх тусам дээр)
      if (a.ranking !== b.ranking) {
        return b.ranking - a.ranking;
      }

      // Алтан медаль
      if (a.goldCount !== b.goldCount) {
        return b.goldCount - a.goldCount;
      }

      // Мөнгөн медаль
      if (a.silverCount !== b.silverCount) {
        return b.silverCount - a.silverCount;
      }

      // Хүрэл медаль
      if (a.bronzeCount !== b.bronzeCount) {
        return b.bronzeCount - a.bronzeCount;
      }

      // Нийт медаль
      if (a.totalMedals !== b.totalMedals) {
        return b.totalMedals - a.totalMedals;
      }

      // Нэрийн дарааллаар
      return a.name.localeCompare(b.name);
    });

    // Одоогийн сурагчийн байр
    let currentStudentRank: number | null = null;
    let currentStudent: StudentRanking | null = null;

    if (currentStudentId) {
      const currentStudentIndex = sortedStudents.findIndex(
        (student) => student.id === currentStudentId
      );

      if (currentStudentIndex !== -1) {
        currentStudentRank = currentStudentIndex + 1;
        currentStudent = sortedStudents[currentStudentIndex];
      }
    }

    return {
      allStudents: sortedStudents,
      currentStudentRank,
      currentStudent,
      loading,
      error,
      totalStudents: sortedStudents.length,
    };
  }, [data, loading, error, currentStudentId]);

  return result;
};

export default useStudentRanking;
