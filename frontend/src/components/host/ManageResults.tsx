"use client";

import React, { useState } from "react";
// Import sub-components for results management
import {
  useStudentAnswersByClassTypeQuery,
  useUpdateStudentAnswerScoreMutation,
  useAddStudentResultMutation,
  useFinishOlympiadMutation,
  usePreviewMedalsMutation,
  useUpdateMedalAssignmentsMutation,
  useFinalizeMedalsMutation,
  useClassTypesByOlympiadQuery,
  useQuestionsByClassTypeQuery,
  ClassYear,
} from "@/generated";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OlympiadOverview } from "./results/OlympiadOverview";
import { StudentScoringInterface } from "./results/StudentScoringInterface";
import { RankingInterface } from "./results/RankingInterface";
import { MedalManagementInterface } from "./results/MedalManagementInterface";
import { StatusProgressIndicator } from "./results/StatusProgressIndicator";

interface ManageResultsProps {
  olympiads: any[];
  onExportResults: (olympiadId: string) => void;
  onViewResults: (olympiadId: string) => void;
}

interface StudentAnswer {
  id: string;
  studentId: string;
  classTypeId: string;
  mandatNumber: string;
  answers: Array<{
    questionId: string;
    score: number;
    description: string;
  }>;
  totalScoreofOlympiad: number;
  image: string[];
}

interface Question {
  id: string;
  questionName: string;
  maxScore: number;
}

interface ClassType {
  id: string;
  classYear: ClassYear;
  maxScore: number;
  medalists: number;
  questions: Question[];
}

type ViewMode = "overview" | "scoring" | "ranking" | "medals";

export const ManageResults: React.FC<ManageResultsProps> = ({
  olympiads,
  onExportResults,
  onViewResults,
}) => {
  const [selectedOlympiad, setSelectedOlympiad] = useState<string>("");
  const [selectedClassType, setSelectedClassType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [medalPreviews, setMedalPreviews] = useState<any[]>([]);
  const [isFinishingOlympiad, setIsFinishingOlympiad] =
    useState<boolean>(false);

  // GraphQL hooks
  const {
    data: classTypesData,
    loading: classTypesLoading,
    refetch: refetchClassTypes,
  } = useClassTypesByOlympiadQuery({
    variables: { olympiadId: selectedOlympiad },
    skip: !selectedOlympiad,
  });

  const {
    data: studentAnswersData,
    loading: studentAnswersLoading,
    refetch: refetchStudentAnswers,
  } = useStudentAnswersByClassTypeQuery({
    variables: { classTypeId: selectedClassType },
    skip: !selectedClassType,
  });

  const { data: questionsData, loading: questionsLoading } =
    useQuestionsByClassTypeQuery({
      variables: { classTypeId: selectedClassType },
      skip: !selectedClassType,
    });

  const [updateStudentAnswerScore] = useUpdateStudentAnswerScoreMutation();
  const [addStudentResult] = useAddStudentResultMutation();
  const [finishOlympiad] = useFinishOlympiadMutation();
  const [previewMedals] = usePreviewMedalsMutation();
  const [updateMedalAssignments] = useUpdateMedalAssignmentsMutation({
    onCompleted: (data) => {
      // Update medal previews when medal assignments are updated
      if (data?.updateMedalAssignments?.medalPreviews) {
        setMedalPreviews(data.updateMedalAssignments.medalPreviews);
      }
    },
  });
  const [finalizeMedals] = useFinalizeMedalsMutation();

  // Function to refresh medal previews
  const refreshMedalPreviews = async () => {
    if (!selectedOlympiad) return;

    try {
      const result = await previewMedals({
        variables: { previewMedalsId: selectedOlympiad },
      });

      if (result.data?.previewMedals?.medalPreviews) {
        setMedalPreviews(result.data.previewMedals.medalPreviews);
      }
    } catch (error) {
      console.error("Error refreshing medal previews:", error);
    }
  };

  // Filter olympiads based on status
  const filteredOlympiads = olympiads.filter((olympiad) => {
    if (filterStatus === "all") return true;
    return olympiad.status === filterStatus;
  });

  const selectedOlympiadData = olympiads.find((o) => o.id === selectedOlympiad);
  const classTypes = classTypesData?.classTypesByOlympiad || [];
  const studentAnswers = studentAnswersData?.studentAnswersByClassType || [];
  const questions = questionsData?.questionsByClassType || [];

  // Refresh medal previews when switching to medals view
  React.useEffect(() => {
    if (
      viewMode === "medals" &&
      selectedOlympiad &&
      medalPreviews.length === 0
    ) {
      refreshMedalPreviews();
    }
  }, [viewMode, selectedOlympiad]);

  // Generate medal previews from class type data if not available
  const getMedalPreviews = () => {
    if (medalPreviews.length > 0) {
      return medalPreviews;
    }

    // Fallback: generate basic medal previews from class type data
    return classTypes.map((classType) => ({
      classTypeId: classType.id,
      classYear: classType.classYear,
      totalParticipants: classType.participants?.length || 0,
      medalists: classType.medalists,
      gold: (classType.gold || []).map((studentId: string, index: number) => ({
        studentId,
        studentName: `Student ${studentId.slice(-4)}`,
        score: 0,
        rank: index + 1,
      })),
      silver: (classType.silver || []).map(
        (studentId: string, index: number) => ({
          studentId,
          studentName: `Student ${studentId.slice(-4)}`,
          score: 0,
          rank: (classType.gold?.length || 0) + index + 1,
        })
      ),
      bronze: (classType.bronze || []).map(
        (studentId: string, index: number) => ({
          studentId,
          studentName: `Student ${studentId.slice(-4)}`,
          score: 0,
          rank:
            (classType.gold?.length || 0) +
            (classType.silver?.length || 0) +
            index +
            1,
        })
      ),
      top10: (classType.top10 || []).map(
        (studentId: string, index: number) => ({
          studentId,
          studentName: `Student ${studentId.slice(-4)}`,
          score: 0,
          rank: index + 1,
        })
      ),
    }));
  };

  const handleOlympiadSelect = (olympiadId: string) => {
    setSelectedOlympiad(olympiadId);
    setSelectedClassType("");
    setViewMode("overview");
  };

  const handleClassTypeSelect = (classTypeId: string) => {
    setSelectedClassType(classTypeId);
    setViewMode("scoring");
  };

  const handleFinishOlympiad = async () => {
    if (!selectedOlympiad) return;

    setIsFinishingOlympiad(true);
    try {
      const result = await finishOlympiad({
        variables: { finishOlympiadId: selectedOlympiad },
      });

      if (result.data?.finishOlympiad) {
        setViewMode("medals");
        // Store medal previews for the medal management interface
        setMedalPreviews(result.data.finishOlympiad.medalPreviews || []);

        // Refetch class types data to get updated medal assignments
        await refetchClassTypes();

        console.log("✅ Olympiad finished and data refreshed");
      }
    } catch (error) {
      console.error("Error finishing olympiad:", error);
    } finally {
      setIsFinishingOlympiad(false);
    }
  };

  const handleFinalizeMedals = async () => {
    if (!selectedOlympiad) return;

    try {
      await finalizeMedals({
        variables: { finalizeMedalsId: selectedOlympiad },
      });

      // Refetch class types data to get updated medal assignments
      await refetchClassTypes();

      console.log("✅ Medals finalized and data refreshed");
    } catch (error) {
      console.error("Error finalizing medals:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800";
      case "OPEN":
        return "bg-blue-100 text-blue-800";
      case "CLOSED":
        return "bg-yellow-100 text-yellow-800";
      case "MEDALS_PREVIEW":
        return "bg-purple-100 text-purple-800";
      case "FINISHED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "Olympiad is being prepared";
      case "OPEN":
        return "Registration is open";
      case "CLOSED":
        return "Registration closed, ready for scoring";
      case "MEDALS_PREVIEW":
        return "Medal assignments ready for review";
      case "FINISHED":
        return "Olympiad completed and medals finalized";
      default:
        return "Unknown status";
    }
  };

  const renderContent = () => {
    if (!selectedOlympiad) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-[#ff8400]"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Олимпиад сонгоно уу
          </h3>
          <p className="text-gray-600">
            Дээрх цэснээс сонгож, түүний үр дүнг харах болон удирдах боломжтой.
          </p>
        </div>
      );
    }

    switch (viewMode) {
      case "overview":
        return (
          <OlympiadOverview
            olympiad={selectedOlympiadData}
            classTypes={classTypes}
            onClassTypeSelect={handleClassTypeSelect}
            onFinishOlympiad={handleFinishOlympiad}
            onExportResults={onExportResults}
            onViewResults={onViewResults}
            getStatusColor={getStatusColor}
            getStatusDescription={getStatusDescription}
            isFinishingOlympiad={isFinishingOlympiad}
          />
        );
      case "scoring":
        return (
          <StudentScoringInterface
            classType={classTypes.find((ct) => ct.id === selectedClassType)}
            studentAnswers={studentAnswers}
            questions={questions}
            onUpdateScore={updateStudentAnswerScore}
            onAddResult={addStudentResult}
            onRefetch={refetchStudentAnswers}
            onBack={() => setViewMode("overview")}
          />
        );
      case "ranking":
        return (
          <RankingInterface
            classType={classTypes.find((ct) => ct.id === selectedClassType)}
            studentAnswers={studentAnswers}
            onBack={() => setViewMode("overview")}
          />
        );
      case "medals":
        return (
          <MedalManagementInterface
            olympiad={selectedOlympiadData}
            classTypes={classTypes}
            medalPreviews={getMedalPreviews()}
            onFinalizeMedals={handleFinalizeMedals}
            onUpdateMedalAssignments={updateMedalAssignments}
            onBack={() => setViewMode("overview")}
            onRefreshMedalPreviews={refreshMedalPreviews}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200  p-4 sm:p-6 lg:p-8 relative overflow-hidden"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Status Progress Indicator */}
        {selectedOlympiadData && (
          <StatusProgressIndicator
            status={selectedOlympiadData.status}
            getStatusColor={getStatusColor}
            getStatusDescription={getStatusDescription}
          />
        )}

        {/* Filters and Selection */}
        <div className="mb-6 pl-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 ">
                Дүн оруулах олимпиад сонгох
              </label>
              <Select
                value={selectedOlympiad}
                onValueChange={(value) => handleOlympiadSelect(value)}
              >
                <SelectTrigger className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#ff8400] focus:border-transparent text-sm sm:text-base bg-white text-gray-900">
                  <SelectValue placeholder="сонгоно уу..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredOlympiads.map((olympiad) => (
                    <SelectItem key={olympiad.id} value={olympiad.id}>
                      {olympiad.name} - {olympiad.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* View Mode Navigation */}
        {selectedOlympiad && (
          <div className="mb-6 pl-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setViewMode("overview")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "overview"
                    ? "bg-[#ff8400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Бүх ангилал
              </button>
              <button
                onClick={() => setViewMode("scoring")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "scoring"
                    ? "bg-[#ff8400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={!selectedClassType}
              >
                Дүн оруулах
              </button>
              <button
                onClick={() => setViewMode("ranking")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "ranking"
                    ? "bg-[#ff8400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={!selectedClassType}
              >
                Нэгдсэн дүн
              </button>
              <button
                onClick={() => setViewMode("medals")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "medals"
                    ? "bg-[#ff8400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={
                  selectedOlympiadData?.status !== "MEDALS_PREVIEW" &&
                  selectedOlympiadData?.status !== "FINISHED"
                }
              >
                Шагнал олгох
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative pl-8">{renderContent()}</div>
      </div>
    </div>
  );
};
