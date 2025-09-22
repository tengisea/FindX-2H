"use client";

import React, { useState, useMemo } from "react";

interface RankingInterfaceProps {
    classType: any;
    studentAnswers: any[];
    onBack: () => void;
}

export const RankingInterface: React.FC<RankingInterfaceProps> = ({
    classType,
    studentAnswers,
    onBack
}) => {
    const [sortBy, setSortBy] = useState<"score" | "name" | "mandat">("score");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const calculateTotalScore = (answers: any[]) => {
        return answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
    };

    const rankedStudents = useMemo(() => {
        const studentsWithScores = studentAnswers.map(studentAnswer => {
            const totalScore = calculateTotalScore(studentAnswer.answers || []);
            return {
                ...studentAnswer,
                totalScore,
                hasAnswers: studentAnswer.answers && studentAnswer.answers.length > 0
            };
        });

        // Sort by score first, then by mandat number for ties
        return studentsWithScores.sort((a, b) => {
            if (sortBy === "score") {
                if (a.totalScore !== b.totalScore) {
                    return sortOrder === "desc" ? b.totalScore - a.totalScore : a.totalScore - b.totalScore;
                }
                return parseInt(a.mandatNumber) - parseInt(b.mandatNumber);
            } else if (sortBy === "mandat") {
                return sortOrder === "desc" 
                    ? parseInt(b.mandatNumber) - parseInt(a.mandatNumber)
                    : parseInt(a.mandatNumber) - parseInt(b.mandatNumber);
            }
            return 0;
        });
    }, [studentAnswers, sortBy, sortOrder]);

    const getRankColor = (rank: number) => {
        if (rank === 1) return "text-yellow-600 bg-yellow-50 border-yellow-200";
        if (rank === 2) return "text-gray-600 bg-gray-50 border-gray-200";
        if (rank === 3) return "text-orange-600 bg-orange-50 border-orange-200";
        if (rank <= 10) return "text-blue-600 bg-blue-50 border-blue-200";
        return "text-muted-foreground bg-muted/50 border-border";
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
        if (rank <= 10) return "🏅";
        return "📊";
    };

    const getScoreColor = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const statistics = useMemo(() => {
        const scores = rankedStudents.map(s => s.totalScore).filter(score => score > 0);
        const average = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
        const highest = scores.length > 0 ? Math.max(...scores) : 0;
        const lowest = scores.length > 0 ? Math.min(...scores) : 0;
        
        return {
            totalStudents: studentAnswers.length,
            answeredStudents: scores.length,
            averageScore: Math.round(average * 100) / 100,
            highestScore: highest,
            lowestScore: lowest
        };
    }, [rankedStudents, studentAnswers]);

    if (!classType) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-foreground">
                        Rankings - Grade {classType.classYear.replace('GRADE_', '')}
                    </h3>
                    <p className="text-muted-foreground">
                        Student rankings based on total scores
                    </p>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Overview</span>
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-primary">
                        {statistics.totalStudents}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-green-600">
                        {statistics.answeredStudents}
                    </div>
                    <div className="text-sm text-muted-foreground">Answered</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-blue-600">
                        {statistics.averageScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-green-600">
                        {statistics.highestScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Highest Score</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-red-600">
                        {statistics.lowestScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Lowest Score</div>
                </div>
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-foreground">Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as "score" | "name" | "mandat")}
                        className="px-3 py-1 border border-border rounded-lg bg-background text-foreground text-sm"
                    >
                        <option value="score">Score</option>
                        <option value="mandat">Mandat Number</option>
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-foreground">Order:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                        className="px-3 py-1 border border-border rounded-lg bg-background text-foreground text-sm"
                    >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>

            {/* Rankings Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h4 className="text-lg font-semibold text-foreground">
                        Student Rankings
                    </h4>
                </div>
                
                <div className="divide-y divide-border">
                    {rankedStudents.map((student, index) => {
                        const rank = index + 1;
                        const percentage = classType.maxScore > 0 ? (student.totalScore / classType.maxScore) * 100 : 0;
                        
                        return (
                            <div
                                key={student.id}
                                className={`p-6 transition-colors ${
                                    rank <= 3 ? "bg-gradient-to-r from-primary/5 to-transparent" : ""
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {/* Rank */}
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${getRankColor(rank)}`}>
                                            <span className="font-bold text-lg">
                                                {rank <= 10 ? rank : "..."}
                                            </span>
                                        </div>
                                        
                                        {/* Student Info */}
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h5 className="font-medium text-foreground">
                                                    Student {student.mandatNumber}
                                                </h5>
                                                <span className="text-lg">{getRankIcon(rank)}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {student.hasAnswers 
                                                    ? `${student.answers.length} questions answered` 
                                                    : "No answers submitted"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Score */}
                                    <div className="text-right">
                                        <div className={`text-2xl font-bold ${getScoreColor(student.totalScore, classType.maxScore)}`}>
                                            {student.totalScore}/{classType.maxScore}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {Math.round(percentage)}%
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                percentage >= 80 ? "bg-green-500" :
                                                percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
                                            }`}
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                
                                {/* Medal Eligibility */}
                                {rank <= classType.medalists && (
                                    <div className="mt-3 flex items-center space-x-2">
                                        <span className="text-sm font-medium text-primary">
                                            🏅 Medal Eligible
                                        </span>
                                        {rank === 1 && <span className="text-sm text-yellow-600">🥇 Gold</span>}
                                        {rank === 2 && <span className="text-sm text-gray-600">🥈 Silver</span>}
                                        {rank === 3 && <span className="text-sm text-orange-600">🥉 Bronze</span>}
                                        {rank > 3 && rank <= classType.medalists && (
                                            <span className="text-sm text-blue-600">🏅 Medal</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Medal Distribution Info */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h4 className="text-lg font-semibold text-primary mb-4">
                    Medal Distribution
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-3xl mb-2">🥇</div>
                        <div className="text-sm text-muted-foreground">Gold Medal</div>
                        <div className="font-semibold text-foreground">1st Place</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-2">🥈</div>
                        <div className="text-sm text-muted-foreground">Silver Medal</div>
                        <div className="font-semibold text-foreground">2nd Place</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-2">🥉</div>
                        <div className="text-sm text-muted-foreground">Bronze Medal</div>
                        <div className="font-semibold text-foreground">3rd Place</div>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Total medals available: <span className="font-semibold text-foreground">{classType.medalists}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
