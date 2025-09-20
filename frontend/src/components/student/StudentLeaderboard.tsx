"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentRanking } from "@/hooks/useStudentRanking";

interface StudentLeaderboardProps {
  currentStudentId?: string;
  showTop?: number;
  className?: string;
}

const StudentLeaderboard: React.FC<StudentLeaderboardProps> = ({
  currentStudentId,
  showTop = 10,
  className = "",
}) => {
  const { allStudents, currentStudentRank, loading, error } =
    useStudentRanking(currentStudentId);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-center">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: showTop }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-muted"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded w-3/4 bg-muted"></div>
                    <div className="h-3 rounded w-1/2 bg-muted"></div>
                  </div>
                  <div className="h-6 rounded w-12 bg-muted"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error("StudentLeaderboard error:", error);
    return (
      <Card className={`border-destructive/20 bg-destructive/10 ${className}`}>
        <CardHeader>
          <CardTitle className="text-center">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive text-center">
            Error loading leaderboard data
          </p>
          <p className="text-xs text-destructive/70 text-center mt-2">
            {error.message || "Please try again later"}
          </p>
        </CardContent>
      </Card>
    );
  }

  const topStudents = allStudents.slice(0, showTop);
  const currentStudentInTop =
    currentStudentId && currentStudentRank && currentStudentRank <= showTop;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "text-primary";
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center">Leaderboard</CardTitle>
        <p className="text-center text-muted-foreground text-sm">
          Top {showTop} students by ranking
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topStudents.map((student, index) => {
            const rank = index + 1;
            const isCurrentStudent = currentStudentId === student.id;

            return (
              <div
                key={student.id}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                  isCurrentStudent
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(
                    rank
                  )}`}
                >
                  {getRankIcon(rank)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-medium truncate ${
                      isCurrentStudent ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {student.name}
                    {isCurrentStudent && (
                      <span className="ml-2 text-xs">(You)</span>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {student.totalMedals} medals •{" "}
                    {student.participatedOlympiads} olympiads
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {student.goldCount}G {student.silverCount}S{" "}
                    {student.bronzeCount}B
                  </p>
                </div>
              </div>
            );
          })}

          {currentStudentId &&
            currentStudentRank &&
            currentStudentRank > showTop && (
              <>
                <div className="border-t border-border my-4"></div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Your current position: #{currentStudentRank}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Keep participating to climb the leaderboard!
                  </p>
                </div>
              </>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentLeaderboard;
