"use client";

import { useState, useEffect } from "react";
import {
  useGetStudentsByClassTypeQuery,
  useGetStudentAnswersByClassTypeQuery,
  useCreateStudentAnswerMutation,
  useUpdateStudentAnswerMutation,
} from "@/generated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Save, Edit, Trash2, Users, Award } from "lucide-react";

interface StudentAnswerFormProps {
  selectedOlympiad: any;
  selectedClassType: any;
}

export const StudentAnswerForm = ({
  selectedOlympiad,
  selectedClassType,
}: StudentAnswerFormProps) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<
    { questionId: string; score: number }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manualStudentId, setManualStudentId] = useState<string>("");
  const [useManualInput, setUseManualInput] = useState(false);

  // Queries
  const {
    data: studentsData,
    loading: studentsLoading,
    error: studentsError,
  } = useGetStudentsByClassTypeQuery({
    variables: { classTypeId: selectedClassType?.id || "" },
    skip: !selectedClassType?.id,
  });

  // Debug logging
  console.log("StudentAnswerForm Debug:", {
    selectedClassTypeId: selectedClassType?.id,
    studentsData,
    studentsLoading,
    studentsError,
    studentsCount: studentsData?.studentsByClassType?.length || 0,
  });

  const {
    data: studentAnswersData,
    loading: answersLoading,
    error: answersError,
    refetch: refetchAnswers,
  } = useGetStudentAnswersByClassTypeQuery({
    variables: { classTypeId: selectedClassType?.id || "" },
    skip: !selectedClassType?.id,
  });

  // Debug logging for student answers query
  console.log("🔍 Student Answers Query Debug:", {
    selectedClassTypeId: selectedClassType?.id,
    querySkipped: !selectedClassType?.id,
    answersLoading,
    answersError,
    answersData: studentAnswersData,
    answersCount: studentAnswersData?.studentAnswersByClassType?.length || 0,
  });

  // Mutations
  const [createStudentAnswer] = useCreateStudentAnswerMutation({
    onCompleted: () => {
      refetchAnswers();
      resetForm();
      alert("Student answer created successfully!");
    },
    onError: (error) => {
      console.error("Error creating student answer:", error);
      alert("Failed to create student answer");
    },
  });

  const [updateStudentAnswer] = useUpdateStudentAnswerMutation({
    onCompleted: () => {
      refetchAnswers();
      resetForm();
      alert("Student answer updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating student answer:", error);
      console.error("Error details:", {
        message: error.message,
        graphQLErrors: error.graphQLErrors,
        networkError: error.networkError,
        extraInfo: error.extraInfo,
      });
      alert(`Failed to update student answer: ${error.message}`);
    },
  });

  // Initialize answers when class type changes
  useEffect(() => {
    if (selectedClassType?.questions) {
      const initialAnswers = selectedClassType.questions.map(
        (question: any) => ({
          questionId: question.id,
          score: 0,
        })
      );
      setAnswers(initialAnswers);
    }
  }, [selectedClassType]);

  const resetForm = () => {
    setSelectedStudentId("");
    setEditingAnswerId(null);
    if (selectedClassType?.questions) {
      const initialAnswers = selectedClassType.questions.map(
        (question: any) => ({
          questionId: question.id,
          score: 0,
        })
      );
      setAnswers(initialAnswers);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !selectedClassType?.id) return;

    setIsSubmitting(true);
    try {
      if (editingAnswerId) {
        console.log("🔧 Frontend: Updating student answer with:", {
          id: editingAnswerId,
          input: {
            studentId: selectedStudentId,
            classTypeId: selectedClassType.id,
            answers: answers,
          },
        });
        console.log("🔧 Frontend: Individual values:", {
          editingAnswerId,
          selectedStudentId,
          classTypeId: selectedClassType?.id,
          answersLength: answers?.length,
          answers: answers,
        });
        await updateStudentAnswer({
          variables: {
            id: editingAnswerId,
            input: {
              studentId: selectedStudentId,
              classTypeId: selectedClassType.id,
              answers: answers,
            },
          },
        });
      } else {
        await createStudentAnswer({
          variables: {
            input: {
              studentId: selectedStudentId,
              classTypeId: selectedClassType.id,
              answers: answers,
            },
          },
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      console.error("Submission error details:", {
        message: error.message,
        graphQLErrors: error.graphQLErrors,
        networkError: error.networkError,
        stack: error.stack,
      });
      alert(`Submission failed: ${error.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditAnswer = (studentAnswer: any) => {
    console.log("🔧 Frontend: Editing student answer:", studentAnswer);
    setSelectedStudentId(studentAnswer.studentId);
    setEditingAnswerId(studentAnswer.id);
    setAnswers(studentAnswer.answers || []);
  };

  const updateAnswerScore = (questionId: string, score: number) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.questionId === questionId
          ? {
              ...answer,
              score: Math.max(
                0,
                Math.min(score, getMaxScoreForQuestion(questionId))
              ),
            }
          : answer
      )
    );
  };

  const getMaxScoreForQuestion = (questionId: string) => {
    const question = selectedClassType?.questions?.find(
      (q: any) => q.id === questionId
    );
    return question?.maxScore || 0;
  };

  const getTotalScore = () => {
    return answers.reduce((sum, answer) => sum + answer.score, 0);
  };

  const getStudentName = (studentId: string) => {
    const student = studentsData?.studentsByClassType?.find(
      (s) => s.id === studentId
    );
    return student?.name || "Unknown Student";
  };

  const students = studentsData?.studentsByClassType || [];
  const studentAnswers = studentAnswersData?.studentAnswersByClassType || [];

  if (!selectedOlympiad || !selectedClassType) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            Please select an Olympiad and Class Type to manage student answers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Student Answer Management
          </h2>
          <p className="text-gray-600">
            {selectedOlympiad.name} - {selectedClassType.classYear}
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Award className="h-4 w-4 mr-1" />
          Max Score: {selectedClassType.maxScore}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              {editingAnswerId ? "Edit Student Answer" : "Add Student Answer"}
            </CardTitle>
            <CardDescription>
              Select a student and enter their scores for each question
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Selection */}
              <div className="space-y-2">
                <Label htmlFor="student">Select Student</Label>
                <div className="text-xs text-gray-500 mb-2">
                  {students.length} students found, Loading:{" "}
                  {studentsLoading ? "Yes" : "No"}
                  {studentsError && `, Error: ${studentsError.message}`}
                </div>

                {students.length === 0 && !studentsLoading ? (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>No students found for this class type.</strong>
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      This could mean:
                    </p>
                    <ul className="text-xs text-yellow-700 mt-1 ml-4 list-disc">
                      <li>
                        No students have registered for this class type yet
                      </li>
                      <li>No students have submitted answers yet</li>
                    </ul>
                    <p className="text-xs text-yellow-700 mt-2">
                      <strong>Note:</strong> The current system only shows
                      students who have already submitted answers. To add
                      answers for new students, they need to register and submit
                      at least one answer first.
                    </p>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setUseManualInput(!useManualInput)}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        {useManualInput ? "Hide" : "Show"} manual student ID
                        input
                      </button>
                      {useManualInput && (
                        <div className="mt-2">
                          <Input
                            type="text"
                            placeholder="Enter student ID manually"
                            value={manualStudentId}
                            onChange={(e) => {
                              setManualStudentId(e.target.value);
                              setSelectedStudentId(e.target.value);
                            }}
                            className="text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Enter the student's ID if you know it
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <Select
                      value={selectedStudentId}
                      onValueChange={(value) => {
                        console.log("Student selected:", value);
                        setSelectedStudentId(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a student..." />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} ({student.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => setUseManualInput(!useManualInput)}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        {useManualInput ? "Hide" : "Show"} manual student ID
                        input
                      </button>
                      {useManualInput && (
                        <div className="mt-2">
                          <Input
                            type="text"
                            placeholder="Enter student ID manually"
                            value={manualStudentId}
                            onChange={(e) => {
                              setManualStudentId(e.target.value);
                              setSelectedStudentId(e.target.value);
                            }}
                            className="text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Enter the student's ID if you know it
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Question Scores */}
              <div className="space-y-3">
                <Label>Question Scores</Label>
                {selectedClassType.questions?.map(
                  (question: any, index: number) => {
                    const answer = answers.find(
                      (a) => a.questionId === question.id
                    );
                    return (
                      <div
                        key={question.id}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {question.questionName}
                          </p>
                          <p className="text-xs text-gray-500">
                            Max Score: {question.maxScore}
                          </p>
                        </div>
                        <div className="w-20">
                          <Input
                            type="number"
                            min="0"
                            max={question.maxScore}
                            value={answer?.score || 0}
                            onChange={(e) =>
                              updateAnswerScore(
                                question.id,
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="text-center"
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Total Score Display */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Score:</span>
                  <Badge variant="secondary" className="text-lg">
                    {getTotalScore()} / {selectedClassType.maxScore}
                  </Badge>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={!selectedStudentId || isSubmitting}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingAnswerId ? "Update Answer" : "Save Answer"}
                </Button>
                {editingAnswerId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Student Answers List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Answers ({studentAnswers.length})
            </CardTitle>
            <CardDescription>
              View and edit existing student answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {studentAnswers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No student answers yet</p>
                </div>
              ) : (
                studentAnswers.map((studentAnswer) => (
                  <div
                    key={studentAnswer.id}
                    className="p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {getStudentName(studentAnswer.studentId)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Total: {studentAnswer.totalScoreofOlympiad} /{" "}
                          {selectedClassType.maxScore}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditAnswer(studentAnswer)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Question Breakdown */}
                    <div className="mt-2 space-y-1">
                      {studentAnswer.answers?.map((answer, index) => {
                        const question = selectedClassType.questions?.find(
                          (q: any) => q.id === answer.questionId
                        );
                        return (
                          <div
                            key={index}
                            className="flex justify-between text-xs text-gray-600"
                          >
                            <span>
                              Q{index + 1}: {question?.questionName}
                            </span>
                            <span>
                              {answer.score} / {question?.maxScore}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
