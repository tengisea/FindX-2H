"use client";

import React from "react";
import { ClassYear } from "@/generated";

interface OlympiadOverviewProps {
    olympiad: any;
    classTypes: any[];
    onClassTypeSelect: (classTypeId: string) => void;
    onFinishOlympiad: () => void;
    onExportResults: (olympiadId: string) => void;
    onViewResults: (olympiadId: string) => void;
    onViewFinalResults: (classTypeId: string) => void;
    getStatusColor: (status: string) => string;
    getStatusDescription: (status: string) => string;
}

export const OlympiadOverview: React.FC<OlympiadOverviewProps> = ({
    olympiad,
    classTypes,
    onClassTypeSelect,
    onFinishOlympiad,
    onExportResults,
    onViewResults,
    onViewFinalResults,
    getStatusColor,
    getStatusDescription
}) => {
    if (!olympiad) return null;

    const canFinishOlympiad = olympiad.status === "CLOSED";
    const canManageResults = olympiad.status === "CLOSED" || olympiad.status === "MEDALS_PREVIEW" || olympiad.status === "FINISHED";

    return (
        <div className="space-y-6">
            {/* Olympiad Information */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                            {olympiad.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            {olympiad.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{new Date(olympiad.occurringDay).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{olympiad.location}</span>
                            </div>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(olympiad.status)}`}>
                        {olympiad.status}
                    </span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                    {getStatusDescription(olympiad.status)}
                </p>
            </div>

            {/* Class Types */}
            <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                    Ангилал {classTypes.length}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classTypes.map((classType) => (
                        <div
                            key={classType.id}
                            className="bg-card rounded-xl shadow-lg border border-border p-6 cursor-pointer transition-all duration-200 hover:border-primary/50 hover:shadow-primary/10"
                            onClick={() => onClassTypeSelect(classType.id)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h5 className="text-lg font-semibold text-foreground mb-2">
                                        Grade {classType.classYear.replace('GRADE_', '')}
                                    </h5>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                            <span>Max Score: {classType.maxScore}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                            <span>Medalists: {classType.medalists}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <span>Questions: {classType.questions?.length || 0}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-primary">
                                        {classType.participants?.length || 0}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Participants</div>
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t border-border">
                                {olympiad.status === "FINISHED" ? (
                                    <div className="space-y-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onViewFinalResults(classType.id);
                                            }}
                                            className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                                        >
                                            Эцсийн үр дүн харах
                                        </button>
                                        <div className="text-xs text-center text-muted-foreground">
                                            Медаль олгогдсон
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            Click to manage results
                                        </span>
                                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                {canFinishOlympiad && (
                    <button
                        onClick={onFinishOlympiad}
                        className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Finish Olympiad & Generate Medals</span>
                    </button>
                )}

            </div>
        </div>
    );
};
