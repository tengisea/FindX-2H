"use client";

import React, { useState } from "react";
import { StudentAnswerForm } from "../StudentAnswerForm";

interface StudentScoringInterfaceProps {
    classType: any;
    studentAnswers: any[];
    questions: any[];
    onUpdateScore: (options: { variables: { studentAnswerId: string; questionId: string; score: number } }) => Promise<any>;
    onAddResult: (options: { variables: { input: any } }) => Promise<any>;
    onRefetch: () => void;
    onBack: () => void;
}

export const StudentScoringInterface: React.FC<StudentScoringInterfaceProps> = ({
    classType,
    studentAnswers,
    questions,
    onUpdateScore,
    onAddResult,
    onRefetch,
    onBack
}) => {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    if (!classType) return null;

    // Filter student answers based on mandat number search
    const filteredStudentAnswers = studentAnswers.filter(studentAnswer => {
        if (!searchTerm) return true;
        const mandatNumber = studentAnswer.mandatNumber?.toString() || "";
        return mandatNumber.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleScoreUpdate = async (options: { variables: { studentAnswerId: string; questionId: string; score: number } }) => {
        try {
            await onUpdateScore(options);
            onRefetch();
        } catch (error) {
            console.error("Error updating score:", error);
        }
    };

    const handleAddStudentResult = async (options: { variables: { input: any } }) => {
        try {
            await onAddResult(options);
            onRefetch();
            setSelectedStudent(null);
        } catch (error) {
            console.error("Error adding student result:", error);
        }
    };

    const calculateTotalScore = (answers: any[]) => {
        return answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
    };

    const getScoreColor = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-foreground">
                       Дүн нэгтгэх - {classType.classYear.replace('GRADE_', '')} Анги 
                    </h3>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Буцах</span>
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-primary">
                        {studentAnswers.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Бүх оролцогчид</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-green-600">
                        {studentAnswers.filter(sa => sa.answers && sa.answers.length > 0).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Дүн оруулсан</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-yellow-600">
                        {studentAnswers.filter(sa => !sa.answers || sa.answers.length === 0).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Хүлээгдэж байгаа</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-primary">
                        {classType.maxScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Боломжит авах оноо</div>
                </div>
            </div>

            {/* Student List */}
            <div className="bg-card rounded-xl border border-border">
                <div className="flex justify-between">
                <div className="p-6 border-b border-border">
                    <h4 className="text-lg font-semibold text-foreground">
                        Сурагчдын дүн ({filteredStudentAnswers.length}/{studentAnswers.length})
                    </h4>
                </div>

                <div className="p-4 border-b border-border">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Мандат дугаараар хайх..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8400] focus:border-transparent bg-white text-gray-900"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
                </div>
                
                <div className="divide-y divide-border">
                    {filteredStudentAnswers.map((studentAnswer) => {
                        const hasAnswers = studentAnswer.answers && studentAnswer.answers.length > 0;
                        const totalScore = hasAnswers ? calculateTotalScore(studentAnswer.answers) : 0;
                        
                        return (
                            <div
                                key={studentAnswer.id}
                                className="p-6 hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => {
                                    setSelectedStudent(studentAnswer);
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                     
                                        <div>
                                            <h5 className="font-medium text-[#ff8400]">
                                           № {studentAnswer.mandatNumber}
                                            </h5>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right ">
                                            <div className="text-lg font-bold text-black">
                                                {totalScore}/{classType.maxScore}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {hasAnswers ? `${Math.round((totalScore / classType.maxScore) * 100)}%` : "0%"}
                                            </div>
                                        </div>
                                        
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            hasAnswers 
                                                ? "bg-orange-100 text-[#ff8400]" 
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                            {hasAnswers ? "хариу орсон" : "хүлээгдэж буй"}
                                        </div>
                                        
                                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                                
                                {/* Quick Score Overview */}
                                {hasAnswers && (
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {studentAnswer.answers.map((answer: any, index: number) => {
                                            const question = questions.find(q => q.id === answer.questionId);
                                            return (
                                                <div key={index} className="bg-muted/50 rounded-lg p-2">
                                                    <div className="text-xs text-muted-foreground">
                                                        Q{index + 1}
                                                    </div>
                                                    <div className="font-medium text-black">
                                                        {answer.score}/{question?.maxScore || 1}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Student Detail Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-card rounded-xl border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-foreground">
                                Student {selectedStudent.mandatNumber} - Answer Details
                            </h4>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setSelectedStudent(null)}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                            <StudentAnswerForm
                                studentAnswer={selectedStudent}
                                questions={questions}
                                classType={classType}
                                onUpdateScore={handleScoreUpdate}
                                onAddResult={handleAddStudentResult}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
