"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatClassYear, safeFormatDate } from "@/lib/dateUtils";
import { useAllOlympiadsQuery } from "@/generated";
import { RankingChart } from "@/components/student/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentAnswerModal from "@/components/student/modals/StudentAnswerModal";

interface ResultsTabProps {
  student: any;
  studentAnswers: any[] | null;
  loading: boolean;
}

// Component to display class type grade and provide maxScore
const ClassTypeGrade = ({
  classTypeId,
  onMaxScoreChange,
  olympiadsData,
}: {
  classTypeId: string;
  onMaxScoreChange?: (maxScore: number) => void;
  olympiadsData?: any;
}) => {
  const hasNotifiedRef = useRef(false);

  // Find the class type data from olympiads data
  const classTypeData = React.useMemo(() => {
    if (!olympiadsData?.allOlympiads || !classTypeId) return null;

    for (const olympiad of olympiadsData.allOlympiads) {
      const classType = olympiad.classtypes?.find(
        (ct: any) => ct.id === classTypeId
      );
      if (classType) {
        return classType;
      }
    }
    return null;
  }, [olympiadsData, classTypeId]);

  // Notify parent component of maxScore when data is available (only once)
  React.useEffect(() => {
    if (
      classTypeData?.maxScore &&
      onMaxScoreChange &&
      !hasNotifiedRef.current
    ) {
      onMaxScoreChange(classTypeData.maxScore);
      hasNotifiedRef.current = true;
    }
  }, [classTypeData?.maxScore, onMaxScoreChange]);

  if (!classTypeData) {
    return (
      <span className="ml-2 font-semibold text-gray-500">Unknown Grade</span>
    );
  }

  return (
    <span className="ml-2 font-semibold">
      {formatClassYear(classTypeData.classYear)}
    </span>
  );
};

const ResultsTab = ({ student, studentAnswers, loading }: ResultsTabProps) => {
  const [maxScores, setMaxScores] = React.useState<Record<string, number>>({});
  const [expandedResults, setExpandedResults] = React.useState<
    Record<string, boolean>
  >({});
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get olympiads data to find olympiad names
  const { data: olympiadsData } = useAllOlympiadsQuery();

  // Initialize maxScores with actual data from olympiad class types
  React.useEffect(() => {
    if (olympiadsData?.allOlympiads && studentAnswers) {
      const initialMaxScores: Record<string, number> = {};

      // Get all unique classTypeIds from student answers
      const classTypeIds = new Set<string>();
      studentAnswers.forEach((answer: any) => {
        if (answer.classTypeId) {
          classTypeIds.add(answer.classTypeId);
        }
      });

      // Find the maxScore for each classTypeId from olympiad data
      classTypeIds.forEach((classTypeId) => {
        const olympiad = olympiadsData.allOlympiads.find((olympiad) =>
          olympiad.classtypes?.some((classType) => classType.id === classTypeId)
        );

        if (olympiad) {
          const classType = olympiad.classtypes?.find(
            (ct) => ct.id === classTypeId
          );
          if (classType?.maxScore) {
            initialMaxScores[classTypeId] = classType.maxScore;
          }
        }
      });

      // Only update if we have new data
      if (Object.keys(initialMaxScores).length > 0) {
        setMaxScores(initialMaxScores);
      }
    }
  }, [olympiadsData, studentAnswers]);

  // Helper function to get olympiad name from classTypeId
  const getOlympiadName = (classTypeId: string) => {
    if (!olympiadsData?.allOlympiads) return "Olympiad Result";

    const olympiad = olympiadsData.allOlympiads.find((olympiad) =>
      olympiad.classtypes?.some((classType) => classType.id === classTypeId)
    );

    return olympiad?.name || "Olympiad Result";
  };

  const handleMaxScoreChange = useCallback(
    (classTypeId: string, maxScore: number) => {
      setMaxScores((prev) => ({
        ...prev,
        [classTypeId]: maxScore,
      }));
    },
    []
  );

  const toggleExpanded = (resultId: string) => {
    setExpandedResults((prev) => ({
      ...prev,
      [resultId]: !prev[resultId],
    }));
  };

  const handleViewAnswerDetails = (answerId: string) => {
    setSelectedAnswerId(answerId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAnswerId(null);
  };

  return (
    <div className="content-wrapper container">
      <h2 className="text-5xl font-bold mb-8 text-center text-gray-800 items-center justify-center mt-20">
        Results & Performance
      </h2>

      <div className="space-y-8">
        {/* Performance Overview */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-gray-800 text-2xl">
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-3xl font-bold text-orange-600">
                  {student?.ranking + " points" || "N/A"}
                </div>
                <div className="text-base text-orange-600">Current Ranking</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-3xl font-bold text-orange-600">
                  {Array.isArray(student?.gold) ? student.gold.length : 0}
                </div>
                <div className="text-base text-orange-600">Gold Medals</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-3xl font-bold text-orange-600">
                  {Array.isArray(student?.silver) ? student.silver.length : 0}
                </div>
                <div className="text-base text-orange-600">Silver Medals</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-3xl font-bold text-orange-600">
                  {Array.isArray(student?.bronze) ? student.bronze.length : 0}
                </div>
                <div className="text-base text-orange-600">Bronze Medals</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-3xl font-bold text-orange-600">
                  {Array.isArray(student?.top10) ? student.top10.length : 0}
                </div>
                <div className="text-base text-orange-600">Top 10 Finishes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-gray-800 text-2xl">
              Recent Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : studentAnswers && studentAnswers.length > 0 ? (
              <div className="space-y-4">
                {studentAnswers.map((studentAnswer) => {
                  const totalScore = studentAnswer.totalScoreofOlympiad || 0;
                  const maxScore = maxScores[studentAnswer.classTypeId] || 100; // Use actual maxScore from classType data
                  const percentage =
                    maxScore > 0
                      ? Math.round((totalScore / maxScore) * 100)
                      : 0;

                  return (
                    <Card
                      key={studentAnswer.id}
                      className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {getOlympiadName(studentAnswer.classTypeId)}
                            </h4>
                            <p className="text-base text-gray-600">
                              {safeFormatDate(studentAnswer.createdAt)}
                            </p>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-base font-semibold ${
                              percentage >= 90
                                ? "bg-green-100 text-green-800"
                                : percentage >= 80
                                ? "bg-blue-100 text-blue-800"
                                : percentage >= 70
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {percentage >= 90
                              ? "A+"
                              : percentage >= 80
                              ? "A"
                              : percentage >= 70
                              ? "B+"
                              : "C"}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-base">
                          <div>
                            <span className="text-gray-600">Score:</span>
                            <span className="ml-2 font-semibold text-gray-800">
                              {totalScore}/{maxScore}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Questions:</span>
                            <span className="ml-2 font-semibold text-gray-800">
                              {studentAnswer.answers?.length || 0}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Percentage:</span>
                            <span className="ml-2 font-semibold text-gray-800">
                              {percentage}%
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Grade:</span>
                            <ClassTypeGrade
                              classTypeId={studentAnswer.classTypeId}
                              olympiadsData={olympiadsData}
                              onMaxScoreChange={(maxScore) =>
                                handleMaxScoreChange(
                                  studentAnswer.classTypeId,
                                  maxScore
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Performance</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                percentage >= 90
                                  ? "bg-green-500"
                                  : percentage >= 80
                                  ? "bg-orange-500"
                                  : percentage >= 70
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${percentage}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex space-x-3">
                            <motion.button
                              onClick={() =>
                                handleViewAnswerDetails(studentAnswer.id)
                              }
                              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              <span>View Details</span>
                            </motion.button>
                            <motion.button
                              onClick={() => toggleExpanded(studentAnswer.id)}
                              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <motion.svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{
                                  rotate: expandedResults[studentAnswer.id]
                                    ? 180
                                    : 0,
                                }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </motion.svg>
                              <span>
                                {expandedResults[studentAnswer.id]
                                  ? "Hide"
                                  : "Quick View"}
                              </span>
                            </motion.button>
                          </div>
                        </div>

                        {/* Interactive Details Section */}
                        <div className="mt-4">
                          <AnimatePresence>
                            {expandedResults[studentAnswer.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.4,
                                  ease: "easeInOut",
                                  opacity: { duration: 0.2 },
                                }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 space-y-4">
                                  {/* Image Preview */}
                                  {studentAnswer.image && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.1, duration: 0.3 }}
                                    >
                                      <h5 className="text-base font-semibold text-gray-800 mb-2">
                                        Submitted Image
                                      </h5>
                                      <div className="relative">
                                        <img
                                          src={studentAnswer.image}
                                          alt="Student submission"
                                          className="w-full max-w-md h-auto rounded-lg border border-gray-200 shadow-sm"
                                          onError={(e) => {
                                            e.currentTarget.style.display =
                                              "none";
                                            const nextElement = e.currentTarget
                                              .nextElementSibling as HTMLElement;
                                            if (nextElement) {
                                              nextElement.style.display =
                                                "flex";
                                            }
                                          }}
                                        />
                                        <div className="hidden w-full max-w-md h-32 bg-gray-100 rounded-lg border border-gray-200 items-center justify-center text-gray-600 text-base">
                                          Image could not be loaded
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}

                                  {/* Individual Answers */}
                                  {studentAnswer.answers &&
                                    studentAnswer.answers.length > 0 && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          delay: 0.2,
                                          duration: 0.3,
                                        }}
                                      >
                                        <h5 className="text-base font-semibold text-gray-800 mb-3">
                                          Question Answers
                                        </h5>
                                        <div className="space-y-3">
                                          {studentAnswer.answers.map(
                                            (answer: any, index: number) => (
                                              <motion.div
                                                key={answer.questionId || index}
                                                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                  delay: 0.3 + index * 0.1,
                                                  duration: 0.3,
                                                }}
                                              >
                                                <div className="flex justify-between items-start mb-2">
                                                  <span className="text-base font-medium text-gray-600">
                                                    Question {index + 1}
                                                  </span>
                                                  <span className="text-base font-semibold text-orange-600">
                                                    {answer.score || 0} points
                                                  </span>
                                                </div>
                                                {answer.description && (
                                                  <p className="text-base text-gray-800 whitespace-pre-wrap">
                                                    {answer.description}
                                                  </p>
                                                )}
                                              </motion.div>
                                            )
                                          )}
                                        </div>
                                      </motion.div>
                                    )}

                                  {/* No answers message */}
                                  {(!studentAnswer.answers ||
                                    studentAnswer.answers.length === 0) &&
                                    !studentAnswer.image && (
                                      <motion.div
                                        className="text-center py-4 text-gray-600 text-base"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          delay: 0.1,
                                          duration: 0.3,
                                        }}
                                      >
                                        No detailed answers available for this
                                        submission.
                                      </motion.div>
                                    )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="w-16 h-16 text-gray-500 mx-auto mb-4"
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Results Yet
                </h3>
                <p className="text-gray-600">
                  You haven&apos;t completed any olympiads yet. Results will
                  appear here once you participate in olympiads.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ranking Trend Chart */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-gray-800 text-2xl">
              Ranking Trend
            </CardTitle>
            <p className="text-base text-gray-600 text-center">
              Track your ranking progress over time
            </p>
          </CardHeader>
          <CardContent>
            <RankingChart
              rankingHistory={student?.rankingHistory || []}
              currentRanking={student?.ranking || 0}
            />

            {/* Ranking Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">
                  {student?.ranking || 0}
                </div>
                <div className="text-base text-orange-600">Current Ranking</div>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">
                  {student?.rankingHistory && student.rankingHistory.length > 0
                    ? (() => {
                        const lastEntry =
                          student.rankingHistory[
                            student.rankingHistory.length - 1
                          ];
                        const change = lastEntry.changedBy;
                        return change > 0
                          ? `+${change}`
                          : change < 0
                          ? `${change}`
                          : "0";
                      })()
                    : "0"}
                </div>
                <div className="text-base text-orange-600">Last Change</div>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">
                  {student?.participatedOlympiads?.length || 0}
                </div>
                <div className="text-base text-orange-600">
                  Olympiads Participated
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Answer Modal */}
      <StudentAnswerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        studentAnswerId={selectedAnswerId}
        studentName={student?.name}
      />
    </div>
  );
};

export default ResultsTab;
