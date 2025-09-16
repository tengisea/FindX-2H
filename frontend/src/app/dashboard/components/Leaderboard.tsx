"use client"

import React from 'react'
import { Crown, Medal, Trophy, Star, TrendingUp, Users, Award, Target } from 'lucide-react'

const Leaderboard = () => {
    const leaderboardData = [
        {
            rank: 1,
            name: 'Alex Chen',
            avatar: 'AC',
            score: 15420,
            problemsSolved: 89,
            country: 'Singapore',
            badge: 'Master',
            badgeColor: 'bg-purple-100 text-purple-800',
            change: '+2',
            changeType: 'up'
        },
        {
            rank: 2,
            name: 'Sarah Johnson',
            avatar: 'SJ',
            score: 14890,
            problemsSolved: 85,
            country: 'USA',
            badge: 'Expert',
            badgeColor: 'bg-blue-100 text-blue-800',
            change: '+1',
            changeType: 'up'
        },
        {
            rank: 3,
            name: 'Michael Rodriguez',
            avatar: 'MR',
            score: 14230,
            problemsSolved: 82,
            country: 'Spain',
            badge: 'Expert',
            badgeColor: 'bg-blue-100 text-blue-800',
            change: '-1',
            changeType: 'down'
        },
        {
            rank: 4,
            name: 'Emily Wang',
            avatar: 'EW',
            score: 13850,
            problemsSolved: 79,
            country: 'Canada',
            badge: 'Advanced',
            badgeColor: 'bg-green-100 text-green-800',
            change: '+3',
            changeType: 'up'
        },
        {
            rank: 5,
            name: 'David Kim',
            avatar: 'DK',
            score: 13520,
            problemsSolved: 77,
            country: 'South Korea',
            badge: 'Advanced',
            badgeColor: 'bg-green-100 text-green-800',
            change: '0',
            changeType: 'same'
        },
        {
            rank: 6,
            name: 'Lisa Anderson',
            avatar: 'LA',
            score: 13180,
            problemsSolved: 75,
            country: 'Australia',
            badge: 'Advanced',
            badgeColor: 'bg-green-100 text-green-800',
            change: '-2',
            changeType: 'down'
        },
        {
            rank: 7,
            name: 'James Wilson',
            avatar: 'JW',
            score: 12890,
            problemsSolved: 73,
            country: 'UK',
            badge: 'Intermediate',
            badgeColor: 'bg-yellow-100 text-yellow-800',
            change: '+1',
            changeType: 'up'
        },
        {
            rank: 8,
            name: 'Maria Garcia',
            avatar: 'MG',
            score: 12540,
            problemsSolved: 71,
            country: 'Mexico',
            badge: 'Intermediate',
            badgeColor: 'bg-yellow-100 text-yellow-800',
            change: '+2',
            changeType: 'up'
        },
        {
            rank: 9,
            name: 'John Smith',
            avatar: 'JS',
            score: 12200,
            problemsSolved: 69,
            country: 'USA',
            badge: 'Intermediate',
            badgeColor: 'bg-yellow-100 text-yellow-800',
            change: '-1',
            changeType: 'down'
        },
        {
            rank: 10,
            name: 'Anna Petrov',
            avatar: 'AP',
            score: 11890,
            problemsSolved: 67,
            country: 'Russia',
            badge: 'Intermediate',
            badgeColor: 'bg-yellow-100 text-yellow-800',
            change: '0',
            changeType: 'same'
        }
    ]

    const categories = [
        { name: 'All Time', active: true },
        { name: 'This Month', active: false },
        { name: 'This Week', active: false },
        { name: 'Today', active: false }
    ]

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="w-5 h-5 text-yellow-500" />
            case 2:
                return <Medal className="w-5 h-5 text-gray-400" />
            case 3:
                return <Medal className="w-5 h-5 text-orange-500" />
            default:
                return <span className="w-5 h-5 flex items-center justify-center text-gray-500 font-bold text-sm">{rank}</span>
        }
    }

    const getChangeIcon = (changeType: string) => {
        switch (changeType) {
            case 'up':
                return <TrendingUp className="w-4 h-4 text-green-500" />
            case 'down':
                return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
            default:
                return <span className="w-4 h-4 text-gray-400">—</span>
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
                    <p className="text-gray-600">Top performers and rankings</p>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">1,247 total participants</span>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex gap-4 mb-6">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${category.active
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {/* 2nd Place */}
                    <div className="text-center">
                        <div className="relative mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                                SJ
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                                <Medal className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                        <p className="text-sm text-gray-600">14,890 points</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-600">+1</span>
                        </div>
                    </div>

                    {/* 1st Place */}
                    <div className="text-center">
                        <div className="relative mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                                AC
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Crown className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-900">Alex Chen</h3>
                        <p className="text-sm text-gray-600">15,420 points</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-600">+2</span>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="text-center">
                        <div className="relative mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                                MR
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                <Medal className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-900">Michael Rodriguez</h3>
                        <p className="text-sm text-gray-600">14,230 points</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                            <span className="text-xs text-red-600">-1</span>
                        </div>
                    </div>
                </div>

                {/* Full Leaderboard */}
                <div className="space-y-3">
                    {leaderboardData.map((user, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            {/* Rank */}
                            <div className="flex items-center justify-center w-8">
                                {getRankIcon(user.rank)}
                            </div>

                            {/* Avatar */}
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                {user.avatar}
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.badgeColor}`}>
                                        {user.badge}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>{user.country}</span>
                                    <span>{user.problemsSolved} problems solved</span>
                                </div>
                            </div>

                            {/* Score */}
                            <div className="text-right">
                                <div className="font-semibold text-gray-900">{user.score.toLocaleString()}</div>
                                <div className="flex items-center justify-end gap-1 text-sm">
                                    {getChangeIcon(user.changeType)}
                                    <span className={user.changeType === 'up' ? 'text-green-600' : user.changeType === 'down' ? 'text-red-600' : 'text-gray-500'}>
                                        {user.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* My Performance */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-500" />
                    My Performance
                </h3>
                <div className="grid grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">#47</div>
                        <div className="text-sm text-gray-600">Current Rank</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">8,420</div>
                        <div className="text-sm text-gray-600">Total Score</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">42</div>
                        <div className="text-sm text-gray-600">Problems Solved</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">+5</div>
                        <div className="text-sm text-gray-600">Rank Change</div>
                    </div>
                </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
                    <div className="text-sm text-gray-600">Tournaments Won</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
                    <div className="text-sm text-gray-600">Perfect Scores</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">89%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">15</div>
                    <div className="text-sm text-gray-600">Streak Days</div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard