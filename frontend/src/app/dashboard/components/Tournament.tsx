"use client"

import React from 'react'
import { Trophy, Users, Calendar, Clock, Star, Award, Target, Zap } from 'lucide-react'

const Tournament = () => {
    const tournaments = [
        {
            id: 1,
            title: 'Algorithm Masters',
            description: 'Advanced algorithmic challenges for competitive programmers',
            participants: 1247,
            prize: '$5,000',
            status: 'active',
            difficulty: 'Expert',
            duration: '7 days',
            startDate: 'Dec 15, 2024',
            endDate: 'Dec 22, 2024',
            progress: 65,
            color: 'bg-blue-500'
        },
        {
            id: 2,
            title: 'Data Science Championship',
            description: 'Machine learning and data analysis competition',
            participants: 892,
            prize: '$3,000',
            status: 'upcoming',
            difficulty: 'Advanced',
            duration: '5 days',
            startDate: 'Dec 20, 2024',
            endDate: 'Dec 25, 2024',
            progress: 0,
            color: 'bg-green-500'
        },
        {
            id: 3,
            title: 'Web Development Sprint',
            description: 'Full-stack development challenges and projects',
            participants: 1563,
            prize: '$2,500',
            status: 'completed',
            difficulty: 'Intermediate',
            duration: '3 days',
            startDate: 'Dec 1, 2024',
            endDate: 'Dec 4, 2024',
            progress: 100,
            color: 'bg-purple-500'
        }
    ]

    const myTournaments = [
        {
            title: 'Algorithm Masters',
            rank: 15,
            score: 2847,
            problemsSolved: 8,
            totalProblems: 12,
            timeSpent: '12h 34m'
        },
        {
            title: 'Data Science Championship',
            rank: 7,
            score: 1923,
            problemsSolved: 5,
            totalProblems: 8,
            timeSpent: '8h 12m'
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800'
            case 'upcoming':
                return 'bg-blue-100 text-blue-800'
            case 'completed':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Expert':
                return 'bg-red-100 text-red-800'
            case 'Advanced':
                return 'bg-orange-100 text-orange-800'
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tournaments</h2>
                    <p className="text-gray-600">Compete with developers worldwide</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Create Tournament
                </button>
            </div>

            {/* My Tournament Performance */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    My Tournament Performance
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    {myTournaments.map((tournament, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-gray-900">{tournament.title}</h4>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm font-medium">#{tournament.rank}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Score</span>
                                    <span className="font-medium">{tournament.score.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Problems Solved</span>
                                    <span className="font-medium">{tournament.problemsSolved}/{tournament.totalProblems}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Time Spent</span>
                                    <span className="font-medium">{tournament.timeSpent}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${(tournament.problemsSolved / tournament.totalProblems) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Available Tournaments */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Tournaments</h3>
                <div className="grid grid-cols-1 gap-6">
                    {tournaments.map((tournament) => (
                        <div key={tournament.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-xl font-semibold text-gray-900">{tournament.title}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                                            {tournament.status}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tournament.difficulty)}`}>
                                            {tournament.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{tournament.description}</p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">{tournament.participants.toLocaleString()} participants</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-4 h-4 text-yellow-500" />
                                            <span className="text-sm text-gray-600">{tournament.prize} prize</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">{tournament.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">{tournament.startDate}</span>
                                        </div>
                                    </div>

                                    {tournament.status === 'active' && (
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Progress</span>
                                                <span className="font-medium">{tournament.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${tournament.color}`}
                                                    style={{ width: `${tournament.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {tournament.status === 'upcoming' && (
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                                        <Target className="w-4 h-4" />
                                        Register
                                    </button>
                                )}
                                {tournament.status === 'active' && (
                                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Continue
                                    </button>
                                )}
                                {tournament.status === 'completed' && (
                                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2">
                                        <Trophy className="w-4 h-4" />
                                        View Results
                                    </button>
                                )}
                                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tournament Stats */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
                    <div className="text-sm text-gray-600">Tournaments Joined</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
                    <div className="text-sm text-gray-600">Tournaments Won</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">8.7</div>
                    <div className="text-sm text-gray-600">Average Rank</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">156</div>
                    <div className="text-sm text-gray-600">Problems Solved</div>
                </div>
            </div>
        </div>
    )
}

export default Tournament