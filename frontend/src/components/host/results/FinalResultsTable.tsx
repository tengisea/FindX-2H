"use client";

import React, { useState, useEffect } from "react";
import { useGetStudentQuery } from "@/generated";

interface FinalResultsTableProps {
  classType: any;
  studentAnswers: any[];
  questions: any[];
}

interface StudentRowProps {
  student: any;
  questions: any[];
  classType: any;
  getMedalInfo: (studentId: string) => any;
}

const StudentRow: React.FC<StudentRowProps> = ({ student, questions, classType, getMedalInfo }) => {
  const { data: studentData, loading } = useGetStudentQuery({
    variables: { getStudentId: student.studentId },
    skip: !student.studentId
  });

  const studentInfo = studentData?.getStudent;
  const medalInfo = getMedalInfo(student.studentId);

  if (loading) {
    return (
      <tr className="hover:bg-gray-50 transition-colors">
        <td colSpan={questions.length + 5} className="px-4 py-4 text-center text-gray-500">
          Loading student data...
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Rank */}
      <td className="px-4 py-4 text-center border-r border-gray-200">
        <div className="flex items-center justify-center">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            medalInfo.type === "Алт" ? 'bg-yellow-100 text-yellow-800' :
            medalInfo.type === "Мөнгө" ? 'bg-gray-100 text-gray-800' :
            medalInfo.type === "Хүрэл" ? 'bg-orange-100 text-orange-800' :
            medalInfo.type === "Top 10" ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-600'
          }`}>
            {student.rank}
          </span>
        </div>
      </td>

      {/* Student Name */}
      <td className="px-4 py-4 border-r border-gray-200">
        <div className="font-medium text-gray-900">
          {studentInfo?.name || `Student ${student.studentId.slice(-4)}`}
        </div>
        <div className="text-sm text-gray-500">
          №: {student.mandatNumber || "N/A"}
        </div>
      </td>

      {/* School */}
      <td className="px-4 py-4 border-r border-gray-200">
        <div className="text-sm text-gray-900">
          {studentInfo?.school || "Тодорхойгүй"}
        </div>
      </td>

      {/* Question Answers */}
      {questions.map((question) => {
        const answer = student.answers?.find((a: { questionId: string; score?: number }) => a.questionId === question.id);
        const score = answer?.score || 0;
        const maxScore = question.maxScore;
        const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
        return (
          <td key={question.id} className="px-3 py-4 text-center border-r border-gray-200">
            <div className="flex flex-col items-center">
              <span className={`text-sm font-semibold ${
                percentage >= 0 ? 'text-gray-600' :
                'text-red-600'
              }`}>
                {score}
              </span>
            </div>
          </td>
        );
      })}

      {/* Total Score */}
      <td className="px-4 py-4 text-center border-r border-gray-200">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-gray-900">
            {student.totalScore}
          </span>
        </div>
      </td>

      {/* Medal */}
      <td className="px-4 py-4 text-center">
        {medalInfo.type ? (
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">{medalInfo.icon}</span>
            <span className={`text-xs font-medium ${medalInfo.color}`}>
              {medalInfo.type}
            </span>
          </div>
        ) : (
          <span className="text-gray-400 text-sm">-</span>
        )}
      </td>
    </tr>
  );
};

export const FinalResultsTable: React.FC<FinalResultsTableProps> = ({
  classType,
  studentAnswers,
  questions,
}) => {
  const calculateTotalScore = (answers: any[]) => {
    return answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
  };

  console.log(studentAnswers);

  const getMedalInfo = (studentId: string) => {
    const gold = classType.gold?.includes(studentId);
    const silver = classType.silver?.includes(studentId);
    const bronze = classType.bronze?.includes(studentId);
    const top10 = classType.top10?.includes(studentId);

    if (gold) return { type: "Алт", icon: "🥇", color: "text-yellow-600" };
    if (silver) return { type: "Мөнгө", icon: "🥈", color: "text-gray-600" };
    if (bronze) return { type: "Хүрэл", icon: "🥉", color: "text-orange-600" };
    if (top10) return { type: "Top 10", icon: "🏆", color: "text-blue-600" };
    return { type: "", icon: "", color: "" };
  };

  const getStudentRank = (studentId: string) => {
    // Calculate all students' scores and rank them
    const studentsWithScores = studentAnswers.map(studentAnswer => {
      const totalScore = calculateTotalScore(studentAnswer.answers || []);
      return {
        studentId: studentAnswer.studentId,
        totalScore,
        studentAnswer
      };
    });

    // Sort by score descending
    studentsWithScores.sort((a, b) => b.totalScore - a.totalScore);
    
    // Find rank
    const rank = studentsWithScores.findIndex(s => s.studentId === studentId) + 1;
    return rank;
  };

  // Sort students by total score (descending)
  const sortedStudents = studentAnswers
    .map(studentAnswer => {
      const totalScore = calculateTotalScore(studentAnswer.answers || []);
      return {
        ...studentAnswer,
        totalScore,
        rank: getStudentRank(studentAnswer.studentId)
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#ff8400] to-orange-600 text-white p-6">
        <h3 className="text-2xl font-bold">
          Нэгдсэн хариу - {classType.classYear.replace("GRADE_", "")}р анги
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                Байр
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                Овог нэр
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                Сургууль
              </th>
              {questions.map((question, index) => (
                <th key={question.id} className="px-3 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">
                  Q{index + 1}
                  <div className="text-xs text-gray-500 font-normal">
                    (/{question.maxScore})
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">
                Нийт оноо
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Медаль
              </th>
            </tr>
          </thead>
          <tbody className="">
            {sortedStudents.map((student, index) => (
              <StudentRow
                key={student.studentId}
                student={student}
                questions={questions}
                classType={classType}
                getMedalInfo={getMedalInfo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
