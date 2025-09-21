"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useStudentRanking } from "@/hooks/useStudentRanking";

interface StudentRankingDisplayProps {
  studentId: string;
  showDetails?: boolean;
  className?: string;
}

const StudentRankingDisplay: React.FC<StudentRankingDisplayProps> = ({
  studentId,
  showDetails = true,
  className = "",
}) => {
  const { currentStudentRank, currentStudent, totalStudents, loading, error } =
    useStudentRanking(studentId);

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-6 rounded w-1/3 mb-2 bg-muted"></div>
            <div className="h-4 rounded w-1/2 bg-muted"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`border-destructive/20 bg-destructive/10 ${className}`}>
        <CardContent className="p-6">
          <p className="text-destructive text-center">
            Error loading ranking data
          </p>
          <p className="text-xs text-destructive/70 text-center mt-2">
            {error.message || "Please try again later"}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!currentStudent || currentStudentRank === null) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">
            No ranking data available
          </p>
        </CardContent>
      </Card>
    );
  }

  const getRankingStatus = (rank: number, total: number) => {
    const percentage = (rank / total) * 100;

    if (rank <= 10)
      return {
        text: "Top 10!",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
      };
    if (rank <= 50)
      return { text: "Top 50", color: "text-blue-500", bg: "bg-blue-500/10" };
    if (rank <= 100)
      return {
        text: "Top 100",
        color: "text-green-500",
        bg: "bg-green-500/10",
      };
    if (percentage <= 25)
      return { text: "Top 25%", color: "text-primary", bg: "bg-primary/10" };
    if (percentage <= 50)
      return {
        text: "Top 50%",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
      };
    return {
      text: "Keep improving!",
      color: "text-muted-foreground",
      bg: "bg-muted/10",
    };
  };

  const rankingStatus = getRankingStatus(currentStudentRank, totalStudents);

  return (
    <Card
      className={`hover:shadow-lg transition-shadow duration-200 ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Current Ranking
            </p>
            <p className="text-3xl font-bold text-primary">
              #{currentStudentRank}
            </p>
            {showDetails && (
              <p
                className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${rankingStatus.bg} ${rankingStatus.color}`}
              >
                {rankingStatus.text}
              </p>
            )}
          </div>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary/10">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentRankingDisplay;
