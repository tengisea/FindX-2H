"use client";

import { Card, CardContent } from "@/components/ui/card";
import StudentRankingDisplay from "@/components/student/StudentRankingDisplay";

type Student = {
  id: string;
  participatedOlympiads: string[];
}

type StudentStatsCardsProps = {
  student: Student;
  totalMedals: number;
}

export const StudentStatsCards = ({ student, totalMedals }: StudentStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Dynamic Ranking Card */}
      <StudentRankingDisplay
        studentId={student.id}
        showDetails={true}
        className="hover:shadow-lg transition-all duration-300"
      />

      <div className="bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 rounded-xl border border-yellow-500/20 p-4 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Total Medals
            </p>
            <p className="text-3xl font-bold text-yellow-600">
              {totalMedals}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-500/20">
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl border border-blue-500/20 p-4 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Olympiads
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {Array.isArray(student.participatedOlympiads)
                ? student.participatedOlympiads.length
                : 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-500/20">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
