"use client";

import React, {useMemo } from "react";

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

        // Always sort by score in descending order (highest to lowest), then by mandat number for ties
        return studentsWithScores.sort((a, b) => {
            if (a.totalScore !== b.totalScore) {
                return b.totalScore - a.totalScore; // Descending order by score
            }
            return parseInt(a.mandatNumber) - parseInt(b.mandatNumber); // Ascending by mandat for ties
        });
    }, [studentAnswers]);

    const getRankColor = (rank: number) => {
        if (rank <= 10) return "text-yellow-600 bg-yellow-50 border-yellow-200";
        return "text-muted-foreground bg-muted/50 border-border";
    };

    const getRankIcon = (rank: number) => {
        if (rank <= 10) return "🏅";
        return "📊";
    };

    const getScoreColor = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 55) return "text-green-600";
        if (percentage >= 20) return "text-yellow-600";
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
                        Нэгдсэн дүн - {classType.classYear.replace('GRADE_', '')} Анги
                    </h3>
                    <p className="text-muted-foreground">
                    Сурагчдын нийлбэр оноонд үндэслэсэн эрэмбэ
                    </p>
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-primary">
                        {statistics.totalStudents}
                    </div>
                    <div className="text-sm text-muted-foreground">Бүх оролцогчид</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-green-600">
                        {statistics.answeredStudents}
                    </div>
                    <div className="text-sm text-muted-foreground">Дүн оруулсан</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-blue-600">
                        {statistics.averageScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Дундаж оноо</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-green-600">
                        {statistics.highestScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Хамгийн их оноо</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-red-600">
                        {statistics.lowestScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Хамгийн бага оноо</div>
                </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h4 className="text-lg font-semibold text-primary mb-4">
                Медалийн хуваарилалт
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-3xl mb-2">🥇</div>
                        <div className="text-sm text-muted-foreground">Алтан медаль</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-2">🥈</div>
                        <div className="text-sm text-muted-foreground">Мөнгөн медаль</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-2">🥉</div>
                        <div className="text-sm text-muted-foreground">Хүрэл медаль</div>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                       Нийт медалийн тоо: <span className="font-semibold text-foreground">{classType.medalists}</span>
                    </p>
                </div>
            </div>

            {/* Rankings Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h4 className="text-lg font-semibold text-foreground">
                       Оноогоор эрэмбэлэгдсэн сурагчдын жагсаалт
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
                                                {rank <= 15 ? rank : "..."}
                                            </span>
                                        </div>
                                        
                                        {/* Student Info */}
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h5 className="font-medium text-foreground">
                                                    № {student.mandatNumber}
                                                </h5>
                                                <span className="text-lg">{getRankIcon(rank)}</span>
                                            </div>
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
                                                percentage >= 55 ? "bg-green-500" :
                                                percentage >= 20 ? "bg-yellow-500" : "bg-red-500"
                                            }`}
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                
                                {/* Medal Eligibility */}
                                {rank <= classType.medalists && (
                                    <div className="mt-3 flex items-center space-x-2">
                                        <span className="text-sm font-medium text-primary">
                                            Шагналт байр
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};
