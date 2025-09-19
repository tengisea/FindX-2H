"use client";

import React, { useState } from "react";

interface ManageResultsProps {
    olympiads: any[];
    onExportResults: (olympiadId: string) => void;
    onViewResults: (olympiadId: string) => void;
}

export const ManageResults: React.FC<ManageResultsProps> = ({
    olympiads,
    onExportResults,
    onViewResults,
}) => {
    const [selectedOlympiad, setSelectedOlympiad] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Filter olympiads based on status
    const filteredOlympiads = olympiads.filter(olympiad => {
        if (filterStatus === "all") return true;
        return olympiad.status === filterStatus;
    });

    const handleOlympiadSelect = (olympiadId: string) => {
        setSelectedOlympiad(olympiadId);
    };

    const handleExportResults = () => {
        if (selectedOlympiad) {
            onExportResults(selectedOlympiad);
        }
    };

    const handleViewResults = () => {
        if (selectedOlympiad) {
            onViewResults(selectedOlympiad);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Manage Results
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        View, export, and manage results for your olympiads
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Status
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#4741A6] focus:border-transparent text-sm sm:text-base"
                            >
                                <option value="all">All Olympiads</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Olympiad
                            </label>
                            <select
                                value={selectedOlympiad}
                                onChange={(e) => handleOlympiadSelect(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#4741A6] focus:border-transparent text-sm sm:text-base"
                            >
                                <option value="">Choose an olympiad...</option>
                                {filteredOlympiads.map((olympiad) => (
                                    <option key={olympiad.id} value={olympiad.id}>
                                        {olympiad.name} - {olympiad.date}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                {selectedOlympiad && (
                    <div className="mb-6">
                        <div className="bg-gradient-to-r from-[#D9EFF7] to-[#9BBBFC] rounded-xl p-6 border border-[#9BBBFC]/20">
                            <h3 className="text-lg font-semibold text-[#4741A6] mb-4">
                                Results Summary
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/80 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#4741A6]">156</div>
                                    <div className="text-sm text-gray-600">Total Participants</div>
                                </div>
                                <div className="bg-white/80 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#F9CE69]">12</div>
                                    <div className="text-sm text-gray-600">Medal Winners</div>
                                </div>
                                <div className="bg-white/80 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#4741A6]">89.5%</div>
                                    <div className="text-sm text-gray-600">Average Score</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Olympiad Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {filteredOlympiads.map((olympiad) => (
                        <div
                            key={olympiad.id}
                            className={`bg-white rounded-xl shadow-lg border-2 p-6 cursor-pointer transition-all duration-200 ${selectedOlympiad === olympiad.id
                                ? "border-[#4741A6] shadow-[#4741A6]/20"
                                : "border-gray-200 hover:border-[#9BBBFC]"
                                }`}
                            onClick={() => handleOlympiadSelect(olympiad.id)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                        {olympiad.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {olympiad.description}
                                    </p>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{olympiad.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{olympiad.location}</span>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${olympiad.status === 'approved'
                                    ? 'bg-green-100 text-green-800'
                                    : olympiad.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {olympiad.status}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Participants:</span> 156
                                </div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Results:</span> Available
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                {selectedOlympiad && (
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleViewResults}
                            className="flex-1 bg-[#4741A6] text-white px-6 py-3 rounded-xl hover:bg-[#3A3580] transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>View Detailed Results</span>
                        </button>

                        <button
                            onClick={handleExportResults}
                            className="flex-1 bg-[#D9EFF7] text-[#4741A6] px-6 py-3 rounded-xl hover:bg-[#9BBBFC] transition-colors flex items-center justify-center space-x-2 border border-[#9BBBFC]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Export Results</span>
                        </button>
                    </div>
                )}

                {!selectedOlympiad && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-[#D9EFF7] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[#4741A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Olympiad</h3>
                        <p className="text-gray-600">Choose an olympiad from the dropdown above to view and manage its results.</p>
                    </div>
                )}
            </div>
        </div>
    );
};