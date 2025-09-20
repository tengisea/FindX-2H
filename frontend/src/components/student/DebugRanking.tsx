"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentRanking } from "@/hooks/useStudentRanking";

interface DebugRankingProps {
  studentId?: string;
}

const DebugRanking: React.FC<DebugRankingProps> = ({ studentId }) => {
  const {
    allStudents,
    currentStudentRank,
    currentStudent,
    totalStudents,
    loading,
    error,
  } = useStudentRanking(studentId);

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-primary">Debug: Student Ranking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Loading:</strong> {loading ? "Yes" : "No"}
          </div>
          <div>
            <strong>Error:</strong> {error ? "Yes" : "No"}
          </div>
          <div>
            <strong>Total Students:</strong> {totalStudents}
          </div>
          <div>
            <strong>Current Student ID:</strong> {studentId || "None"}
          </div>
          <div>
            <strong>Current Student Rank:</strong> {currentStudentRank || "N/A"}
          </div>
          <div>
            <strong>Current Student Name:</strong>{" "}
            {currentStudent?.name || "N/A"}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded">
            <strong className="text-destructive">Error Details:</strong>
            <div className="text-xs text-destructive/80 mt-1 space-y-1">
              <div>
                <strong>Message:</strong> {error.message}
              </div>
              {error.graphQLErrors && error.graphQLErrors.length > 0 && (
                <div>
                  <strong>GraphQL Errors:</strong>
                  <ul className="ml-4 list-disc">
                    {error.graphQLErrors.map((gqlError, index) => (
                      <li key={index}>{gqlError.message}</li>
                    ))}
                  </ul>
                </div>
              )}
              {error.networkError && (
                <div>
                  <strong>Network Error:</strong> {error.networkError.message}
                </div>
              )}
            </div>
          </div>
        )}

        {allStudents.length > 0 && (
          <div>
            <strong className="text-sm">
              All Students (Ranked by Points + Medals):
            </strong>
            <div className="mt-2 space-y-1 text-xs">
              {allStudents.map((student, index) => (
                <div
                  key={student.id}
                  className={`flex justify-between items-center p-2 rounded ${
                    student.id === studentId
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-muted/30"
                  }`}
                >
                  <div>
                    <span className="font-medium">
                      #{index + 1} {student.name}
                    </span>
                    {student.id === studentId && (
                      <span className="ml-2 text-primary font-bold">(You)</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-primary">
                      Points: {student.ranking}
                    </div>
                    <div>{student.totalMedals} medals</div>
                    <div className="text-muted-foreground">
                      {student.goldCount}G {student.silverCount}S{" "}
                      {student.bronzeCount}B
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {allStudents.length === 0 && !loading && !error && (
          <div className="text-muted-foreground text-sm">
            No students found in the data
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DebugRanking;
