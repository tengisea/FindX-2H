"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  StudentRankingDisplay,
  StudentLeaderboard,
} from "@/components/student";
import { useStudentRanking } from "@/hooks/useStudentRanking";

interface RankingExampleProps {
  studentId: string;
}

const RankingExample: React.FC<RankingExampleProps> = ({ studentId }) => {
  const { allStudents, currentStudentRank, currentStudent, totalStudents } =
    useStudentRanking(studentId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ranking System Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Individual Ranking Display */}
            <StudentRankingDisplay studentId={studentId} showDetails={true} />

            {/* Compact Ranking Display */}
            <StudentRankingDisplay studentId={studentId} showDetails={false} />
          </div>

          {/* Top 5 Leaderboard */}
          <StudentLeaderboard currentStudentId={studentId} showTop={5} />

          {/* Top 20 Leaderboard */}
          <StudentLeaderboard currentStudentId={studentId} showTop={20} />
        </CardContent>
      </Card>

      {/* Raw Data Display for Development */}
      <Card>
        <CardHeader>
          <CardTitle>Raw Ranking Data (Development)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Current Student Rank:</strong>{" "}
              {currentStudentRank || "N/A"}
            </p>
            <p>
              <strong>Total Students:</strong> {totalStudents}
            </p>
            <p>
              <strong>Current Student:</strong> {currentStudent?.name || "N/A"}
            </p>
            <p>
              <strong>Current Student Medals:</strong>{" "}
              {currentStudent?.totalMedals || 0}
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Top 10 Students:</h4>
            <div className="space-y-1 text-sm">
              {allStudents.slice(0, 10).map((student, index) => (
                <div key={student.id} className="flex justify-between">
                  <span>
                    #{index + 1} {student.name}
                    {student.id === studentId && " (You)"}
                  </span>
                  <span>{student.totalMedals} medals</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RankingExample;
