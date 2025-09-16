"use client"

import React from 'react'
import Tournament from './Tournament'
import Leaderboard from './Leaderboard'

interface ContainerProps {
    activeTab: 'challenge' | 'tournament' | 'leaderboard'
}

export default function Container({ activeTab }: ContainerProps) {

    const renderContent = () => {
        switch (activeTab) {
            case 'tournament':
                return <Tournament />
            case 'leaderboard':
                return <Leaderboard />
            default:
                return (
                    <div className="grid grid-cols-2 gap-6">
                        {/* Active Challenges */}
                        <div className="flex flex-col gap-4">
                            <p className="text-xl font-bold text-gray-800">Active Challenges</p>

                            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                                {/* Player 1 */}
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-700">Hvrelsvkh</p>
                                </div>

                                {/* VS */}
                                <p className="text-lg font-bold text-red-500">VS</p>

                                {/* Player 2 */}
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-700">Bat-Erdene</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-700">Anujin</p>
                                </div>
                                <p className="text-lg font-bold text-red-500">VS</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-700">Tuvshin</p>
                                </div>
                            </div>
                        </div>

                        {/* Current Challenge */}
                        <div className="flex flex-col gap-4">
                            <p className="text-xl font-bold text-gray-800">Current Challenge</p>

                            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-3">
                                <p className="text-sm text-gray-500">Math Quiz</p>

                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-gray-700">Hvrelsvkh</p>
                                    <span className="text-red-500 font-bold">VS</span>
                                    <p className="font-medium text-gray-700">Bat-Erdene</p>
                                </div>

                                <div className="flex flex-col gap-1 text-sm text-gray-600">
                                    <p>Time left: <span className="font-medium text-gray-800">08:32</span></p>
                                    <p>Status: <span className="text-green-600 font-medium">Ongoing</span></p>
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <button className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm">
                                        Join
                                    </button>
                                    <button className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm">
                                        Spectate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="flex-1 p-6 bg-gray-50 m-5 rounded-xl">
            {renderContent()}
        </div>
    )
}
