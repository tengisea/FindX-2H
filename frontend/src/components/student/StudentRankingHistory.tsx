"use client";

import { RankingChart } from "@/components/student/charts";

type Student = {
  ranking: number;
  participatedOlympiads: string[];
  rankingHistory: {
    changedBy: string;
    changedTo: number;
    reason: string;
    olympiadId: string;
    date: string;
    pointsGained: number;
  }[];
}

type StudentRankingHistoryProps = {
  student: Student;
}

export const StudentRankingHistory = ({ student }: StudentRankingHistoryProps) => {
  return (
    <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border/50 p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">Ranking History</h3>
        <div className="w-12 h-0.5 bg-primary mx-auto rounded-full"></div>
      </div>
      
      <div className="mb-6">
        <RankingChart
          rankingHistory={student?.rankingHistory?.map(entry => ({
            ...entry,
            changedBy: typeof entry.changedBy === "string" ? parseInt(entry.changedBy) || 0 : entry.changedBy,
          })) || []}
          currentRanking={student?.ranking || 0}
        />
      </div>

      {/* Ranking Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="text-xl font-bold text-primary mb-1">
            {student?.ranking || 0}
          </div>
          <div className="text-xs text-gray-500 font-medium">Current Rank</div>
        </div>

        <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="text-xl font-bold text-primary mb-1">
            {student?.rankingHistory && student.rankingHistory.length > 0
              ? (() => {
                  const lastEntry = student.rankingHistory[student.rankingHistory.length - 1];
                  const change = typeof lastEntry.changedBy === "string" 
                    ? parseInt(lastEntry.changedBy) || 0 
                    : lastEntry.changedBy;
                  return change > 0 ? `+${change}` : change < 0 ? `${change}` : "0";
                })()
              : "0"}
          </div>
          <div className="text-xs text-gray-500 font-medium">Last Change</div>
        </div>

        <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="text-xl font-bold text-primary mb-1">
            {student?.participatedOlympiads?.length || 0}
          </div>
          <div className="text-xs text-gray-500 font-medium">Olympiads</div>
        </div>
      </div>
    </div>
  );
};
