"use client";

import React, { useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatClassYear, safeFormatDate } from "@/lib/dateUtils";
import {
  useClassTypeQuery,
} from "@/generated";
import { RankingChart } from "@/components/student/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsTabProps {
  student: any;
  studentAnswers: any[] | null;
  loading: boolean;
}

// Component to display class type grade and provide maxScore
const ClassTypeGrade = ({
  classTypeId,
  onMaxScoreChange,
}: {
  classTypeId: string;
  onMaxScoreChange?: (maxScore: number) => void;
}) => {
  const { data, loading } = useClassTypeQuery({
    variables: { classTypeId },
    skip: !classTypeId,
  });

  const hasNotifiedRef = useRef(false);

  // Notify parent component of maxScore when data is available (only once)
  React.useEffect(() => {
    if (
      data?.classType?.maxScore &&
      onMaxScoreChange &&
      !hasNotifiedRef.current
    ) {
      onMaxScoreChange(data.classType.maxScore);
      hasNotifiedRef.current = true;
    }
  }, [data?.classType?.maxScore, onMaxScoreChange]);

  if (loading) {
    return <span className="ml-2 font-semibold text-gray-400">Loading...</span>;
  }

  if (!data?.classType) {
    return (
      <span className="ml-2 font-semibold text-gray-500">Unknown Grade</span>
    );
  }

  return (
    <span className="ml-2 font-semibold">
      {formatClassYear(data.classType.classYear)}
    </span>
  );
};

const ResultsTab = ({ student, studentAnswers, loading }: ResultsTabProps) => {
  const [maxScores, setMaxScores] = React.useState<Record<string, number>>({});
  const [expandedResults, setExpandedResults] = React.useState<
    Record<string, boolean>
  >({});

  const handleMaxScoreChange = useCallback(
    (classTypeId: string, maxScore: number) => {
      setMaxScores((prev) => ({
        ...prev,
        [classTypeId]: maxScore,
      }));
    },
    [],
  );

  const toggleExpanded = (resultId: string) => {
    setExpandedResults((prev) => ({
      ...prev,
      [resultId]: !prev[resultId],
    }));
  };

  return (
    <div className="content-wrapper container">
      <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
        Results & Performance
      </h2>

      <div className="space-y-8">
        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-foreground text-2xl">
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {student?.ranking + " points" || "N/A"}
                </div>
                <div className="text-base text-primary">Current Ranking</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {Array.isArray(student?.gold) ? student.gold.length : 0}
                </div>
                <div className="text-base text-primary">Gold Medals</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {Array.isArray(student?.silver) ? student.silver.length : 0}
                </div>
                <div className="text-base text-primary">Silver Medals</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {Array.isArray(student?.bronze) ? student.bronze.length : 0}
                </div>
                <div className="text-base text-primary">Bronze Medals</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {Array.isArray(student?.top10) ? student.top10.length : 0}
                </div>
                <div className="text-base text-primary">Top 10 Finishes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-foreground text-2xl">
              Recent Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-4"
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
                      className="hover:shadow-lg transition-shadow duration-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              Olympiad Result
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {safeFormatDate(studentAnswer.createdAt)}
                            </p>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
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

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Score:
                            </span>
                            <span className="ml-2 font-semibold text-foreground">
                              {totalScore}/{maxScore}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Questions:
                            </span>
                            <span className="ml-2 font-semibold text-foreground">
                              {studentAnswer.answers?.length || 0}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Percentage:
                            </span>
                            <span className="ml-2 font-semibold text-foreground">
                              {percentage}%
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Grade:
                            </span>
                            <ClassTypeGrade
                              classTypeId={studentAnswer.classTypeId}
                              onMaxScoreChange={(maxScore) =>
                                handleMaxScoreChange(
                                  studentAnswer.classTypeId,
                                  maxScore,
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Performance</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                percentage >= 90
                                  ? "bg-green-500"
                                  : percentage >= 80
                                  ? "bg-primary"
                                  : percentage >= 70
                                  ? "bg-yellow-500"
                                  : "bg-destructive"
                              }`}
                              style={{
                                width: `${percentage}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Interactive Details Section */}
                        <div className="mt-4 pt-4 border-t border-border">
                          <motion.button
                            onClick={() => toggleExpanded(studentAnswer.id)}
                            className="flex items-center justify-between w-full text-left hover:bg-muted/50 p-2 rounded-lg transition-colors"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <span className="text-sm font-medium text-foreground">
                              {expandedResults[studentAnswer.id]
                                ? "Hide Details"
                                : "View Answer Details"}
                            </span>
                            <motion.svg
                              className="w-4 h-4 text-muted-foreground"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{
                                rotate: expandedResults[studentAnswer.id]
                                  ? 180
                                  : 0,
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </motion.svg>
                          </motion.button>

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
                                      <h5 className="text-sm font-semibold text-foreground mb-2">
                                        Submitted Image
                                      </h5>
                                      <div className="relative">
                                        <img
                                          src={studentAnswer.image}
                                          alt="Student submission"
                                          className="w-full max-w-md h-auto rounded-lg border border-border shadow-sm"
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
                                        <div className="hidden w-full max-w-md h-32 bg-muted rounded-lg border border-border items-center justify-center text-muted-foreground text-sm">
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
                                        <h5 className="text-sm font-semibold text-foreground mb-3">
                                          Question Answers
                                        </h5>
                                        <div className="space-y-3">
                                          {studentAnswer.answers.map(
                                            (answer: any, index: number) => (
                                              <motion.div
                                                key={answer.questionId || index}
                                                className="bg-muted/30 rounded-lg p-3 border border-border"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                  delay: 0.3 + index * 0.1,
                                                  duration: 0.3,
                                                }}
                                              >
                                                <div className="flex justify-between items-start mb-2">
                                                  <span className="text-sm font-medium text-muted-foreground">
                                                    Question {index + 1}
                                                  </span>
                                                  <span className="text-sm font-semibold text-primary">
                                                    {answer.score || 0} points
                                                  </span>
                                                </div>
                                                {answer.description && (
                                                  <p className="text-sm text-foreground whitespace-pre-wrap">
                                                    {answer.description}
                                                  </p>
                                                )}
                                              </motion.div>
                                            ),
                                          )}
                                        </div>
                                      </motion.div>
                                    )}

                                  {/* No answers message */}
                                  {(!studentAnswer.answers ||
                                    studentAnswer.answers.length === 0) &&
                                    !studentAnswer.image && (
                                      <motion.div
                                        className="text-center py-4 text-muted-foreground text-sm"
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
                  className="w-16 h-16 text-muted-foreground mx-auto mb-4"
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
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Results Yet
                </h3>
                <p className="text-muted-foreground">
                  You haven&apos;t completed any olympiads yet. Results will appear
                  here once you participate in olympiads.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ranking Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-foreground text-2xl">
              Ranking Trend
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
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
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {student?.ranking || 0}
                </div>
                <div className="text-sm text-primary">Current Ranking</div>
              </div>

              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">
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
                <div className="text-sm text-primary">Last Change</div>
              </div>

              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {student?.participatedOlympiads?.length || 0}
                </div>
                <div className="text-sm text-primary">
                  Olympiads Participated
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsTab;
