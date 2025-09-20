"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStudentDetail } from "@/hooks/useStudentDetail";
import { ArrowLeft } from "lucide-react";
import { StudentProfileHeader } from "./StudentProfileHeader";
import { StudentStatsCards } from "./StudentStatsCards";
import { StudentAchievements } from "./StudentAchievements";
import { StudentRankingHistory } from "./StudentRankingHistory";
import { formatGrade } from "@/utils/gradeUtils";

type StudentDetailProps = {
  studentId: string;
}

export const StudentDetail = ({ studentId }: StudentDetailProps) => {
  const router = useRouter();
  const { student, loading, error } = useStudentDetail(studentId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [studentId]);


  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="content-wrapper container">
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              className="text-foreground hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h2 className="text-5xl font-bold text-foreground">
              Student Profile
            </h2>
          </div>
          <div className="card p-6">
            <div className="animate-pulse space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full bg-muted"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-6 rounded w-1/3 bg-muted"></div>
                  <div className="h-4 rounded w-1/2 bg-muted"></div>
                  <div className="h-4 rounded w-1/4 bg-muted"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-background">
        <div className="content-wrapper container">
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              className="text-foreground hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h2 className="text-5xl font-bold text-foreground">
              Student Profile
            </h2>
          </div>
          <Card className="border-destructive/20 bg-destructive/10">
            <CardContent className="p-6">
              <p className="text-destructive text-center text-xl">
                Error loading student data: {error?.message || "Student not found"}
              </p>
              <div className="text-center mt-4">
                <Button onClick={() => router.push("/")}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const totalMedals =
    Array.isArray(student.gold) &&
    Array.isArray(student.silver) &&
    Array.isArray(student.bronze)
      ? student.gold.length + student.silver.length + student.bronze.length
      : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="content-wrapper container">
        {/* Header with Back Button */}
        <div className="flex items-center mb-12">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="text-foreground hover:bg-primary hover:text-primary-foreground border-2 border-primary/20 hover:border-primary transition-all duration-300 rounded-xl px-6 py-2 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="space-y-6">
          {/* Profile Header */}
          <StudentProfileHeader 
            student={student} 
            totalMedals={totalMedals} 
            formatGrade={formatGrade} 
          />

          {/* Stats Cards */}
          <StudentStatsCards 
            student={student} 
            totalMedals={totalMedals} 
          />

          {/* Medal Achievements */}
          <StudentAchievements student={student} />

          {/* Ranking History */}
          <StudentRankingHistory student={student} />
        </div>
      </div>
    </div>
  );
};
