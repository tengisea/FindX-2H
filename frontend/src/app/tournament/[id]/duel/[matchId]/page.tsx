"use client"

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Trophy, Clock, Users, Target, Zap } from 'lucide-react'
import { useGetMatchRoomQuery, useGetAllStudentsQuery } from '@/generated'

const DuelPage = () => {
    const params = useParams()
    const router = useRouter()
    const matchId = params.matchId as string
    const tournamentId = params.id as string

    const { data: matchData, loading: matchLoading, error: matchError } = useGetMatchRoomQuery({
        variables: { id: matchId }
    })

    const { data: studentsData } = useGetAllStudentsQuery()

    if (matchLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-lg text-gray-700">Loading duel...</p>
            </div>
        )
    }

    if (matchError) {
        return (
            <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg m-8">
                <h3 className="text-xl font-semibold text-red-800 mb-2">Error loading duel</h3>
                <p className="text-red-600">{matchError.message}</p>
                <Button onClick={() => router.back()} className="mt-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                </Button>
            </div>
        )
    }

    const match = matchData?.getMatchRoom
    const students = studentsData?.getAllStudent || []


    if (!match) {
        return (
            <div className="text-center py-12 bg-yellow-50 border border-yellow-200 rounded-lg m-8">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">Match Not Found</h3>
                <p className="text-yellow-600">The requested match could not be found.</p>
                <Button onClick={() => router.back()} className="mt-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                </Button>
            </div>
        )
    }

    const getPlayerName = (playerId: string) => {
        const student = students.find((s: any) => s.id === playerId)
        return student ? student.name : `Student ${playerId.slice(-4)}`
    }

    const getPlayerClass = (playerId: string) => {
        const student = students.find((s: any) => s.id === playerId)
        return student ? `${student.class} анги` : 'Unknown анги'
    }

    const getPlayerAvatar = (playerId: string) => {
        const student = students.find((s: any) => s.id === playerId)
        return student?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(getPlayerName(playerId))}&background=random&color=fff&size=80`
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'COMPLETED':
                return 'bg-green-100 text-green-800 border-green-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Bracket
                    </Button>
                    <Badge className={`${getStatusColor(match.status)} text-lg px-4 py-2`}>
                        <Zap className="w-5 h-5 mr-2" />
                        {match.status}
                    </Badge>
                </div>

                {/* Match Title */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{match.task}</h1>
                    <p className="text-xl text-gray-600">{match.round}</p>
                    <p className="text-gray-500 mt-2">
                        Scheduled: {new Date(match.scheduleAt).toLocaleString()}
                    </p>
                </div>

                {/* Duel Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Player A */}
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="text-center pb-4">
                            <div className="flex justify-center mb-4">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                                    <img
                                        src={getPlayerAvatar(match.slotA)}
                                        alt={getPlayerName(match.slotA)}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getPlayerName(match.slotA))}&background=3b82f6&color=fff&size=96`;
                                        }}
                                    />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-blue-600">
                                {getPlayerName(match.slotA)}
                            </CardTitle>
                            <p className="text-gray-600">{getPlayerClass(match.slotA)}</p>
                            {match.winner === match.slotA && (
                                <div className="flex justify-center mt-2">
                                    <Trophy className="w-8 h-8 text-yellow-500" />
                                </div>
                            )}
                        </CardHeader>
                    </Card>

                    {/* VS Section with Task */}
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">VS</CardTitle>
                            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6">
                                <div className="flex items-center justify-center mb-4">
                                    <Target className="w-8 h-8 text-blue-600 mr-2" />
                                    <h3 className="text-xl font-semibold text-gray-900">Task</h3>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <p className="text-gray-800 text-lg">
                                        {match.task || "Match Task"}
                                    </p>
                                    <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>Time Limit: 30 min</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>2 Players</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Player B */}
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="text-center pb-4">
                            <div className="flex justify-center mb-4">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-red-100 flex items-center justify-center">
                                    <img
                                        src={getPlayerAvatar(match.slotB)}
                                        alt={getPlayerName(match.slotB)}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getPlayerName(match.slotB))}&background=ef4444&color=fff&size=96`;
                                        }}
                                    />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-red-600">
                                {getPlayerName(match.slotB)}
                            </CardTitle>
                            <p className="text-gray-600">{getPlayerClass(match.slotB)}</p>
                            {match.winner === match.slotB && (
                                <div className="flex justify-center mt-2">
                                    <Trophy className="w-8 h-8 text-yellow-500" />
                                </div>
                            )}
                        </CardHeader>
                    </Card>
                </div>

                {/* Match Actions */}
                <div className="text-center mt-8">
                    <div className="flex justify-center gap-4">
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                            disabled={match.status === 'COMPLETED'}
                        >
                            Start Duel
                        </Button>
                        <Button
                            variant="outline"
                            className="px-8 py-3 text-lg"
                            onClick={() => router.back()}
                        >
                            Back to Bracket
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DuelPage