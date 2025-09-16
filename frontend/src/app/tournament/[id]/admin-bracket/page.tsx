"use client"

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Users, Calendar, ArrowLeft, Zap, Target, Award, Clock } from 'lucide-react'
import { useGetTournamentQuery, useGetMatchRoomsQuery, useGetAllStudentsQuery, useCreatePiWardMutation } from '@/generated'
import UpdateWinnerModal from '@/components/tournament/UpdateWinnerModal'

const AdminTournamentBracketPage = () => {
    const params = useParams()
    const router = useRouter()
    const tournamentId = params.id as string

    const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false)
    const [selectedMatch, setSelectedMatch] = useState<any>(null)
    const [showResults, setShowResults] = useState(false)

    const [createPiWard, { loading: piWardLoading, error: piWardError }] = useCreatePiWardMutation()

    const { data: tournamentData, loading: tournamentLoading, error: tournamentError } = useGetTournamentQuery({
        variables: { id: tournamentId }
    })

    const { data: matchRoomsData, loading: matchRoomsLoading, error: matchRoomsError } = useGetMatchRoomsQuery({
        variables: { tournamentId: tournamentId }
    })

    const { data: studentsData, loading: studentsLoading, error: studentsError } = useGetAllStudentsQuery()


    if (tournamentLoading || matchRoomsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-lg text-gray-700">Loading tournament bracket...</p>
            </div>
        )
    }

    if (tournamentError || matchRoomsError) {
        return (
            <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg m-8">
                <h3 className="text-xl font-semibold text-red-800 mb-2">Error loading bracket</h3>
                <p className="text-red-600">{tournamentError?.message || matchRoomsError?.message}</p>
            </div>
        )
    }

    const tournament = tournamentData?.getTournament
    const matches = matchRoomsData?.getMatchRooms || []


    if (!tournament) {
        return (
            <div className="text-center py-12 bg-yellow-50 border border-yellow-200 rounded-lg m-8">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">Tournament Not Found</h3>
                <p className="text-yellow-600">The requested tournament could not be found.</p>
            </div>
        )
    }

    const getPlayerName = (playerId: any, playerData: any = null) => {
        // If playerData is provided (populated student object), use it directly
        if (playerData && typeof playerData === 'object' && playerData.name) {
            return playerData.name
        }

        // If playerId is already a populated student object, use it directly
        if (playerId && typeof playerId === 'object' && playerId.name) {
            return playerId.name
        }

        const students = studentsData?.getAllStudent || []

        // Handle if playerId is null or undefined
        if (!playerId) {
            return 'TBD Player' // To Be Determined
        }

        // Handle if playerId is an object
        let searchId = playerId
        if (typeof playerId === 'object' && playerId !== null) {
            searchId = playerId._id || playerId.id || playerId.toString()
        }

        // Try different ways to match the student
        let student = students.find((s: any) => s.id === searchId)
        if (!student) {
            student = students.find((s: any) => String(s.id) === String(searchId))
        }
        if (!student) {
            student = students.find((s: any) => s.id.toString() === searchId.toString())
        }

        if (student) {
            return student.name
        } else {
            // Try to find partial match
            const partialMatch = students.find((s: any) =>
                String(s.id).includes(String(searchId).slice(-4)) ||
                String(searchId).includes(String(s.id).slice(-4))
            );
            if (partialMatch) {
                return partialMatch.name
            }
            // Show the actual ID for debugging
            return `ID: ${searchId}`
        }
    }

    const getPlayerClass = (playerId: any, playerData: any = null) => {
        // If playerData is provided (populated student object), use it directly
        if (playerData && typeof playerData === 'object' && playerData.class) {
            return `${playerData.class} анги`
        }

        // If playerId is already a populated student object, use it directly
        if (playerId && typeof playerId === 'object' && playerId.class) {
            return `${playerId.class} анги`
        }

        const students = studentsData?.getAllStudent || []

        // Handle if playerId is null or undefined
        if (!playerId) {
            return 'TBD анги' // To Be Determined
        }

        // Handle if playerId is an object
        let searchId = playerId
        if (typeof playerId === 'object' && playerId !== null) {
            searchId = playerId._id || playerId.id || playerId.toString()
        }

        // Try different ways to match the student
        let student = students.find((s: any) => s.id === searchId)
        if (!student) {
            student = students.find((s: any) => String(s.id) === String(searchId))
        }
        if (!student) {
            student = students.find((s: any) => s.id.toString() === searchId.toString())
        }

        if (student) {
            return `${student.class} анги`
        } else {
            // Try partial match for class too
            const partialMatch = students.find((s: any) =>
                String(s.id).includes(String(searchId).slice(-4)) ||
                String(searchId).includes(String(s.id).slice(-4))
            );
            if (partialMatch) {
                return `${partialMatch.class} анги`
            }
            // Show the actual ID for debugging
            return `ID: ${searchId}`
        }
    }

    const handleGenerateResults = async () => {
        try {
            const response = await createPiWard({
                variables: { tournamentId: tournamentId }
            })

            if (response.data?.createPiWard?.success) {
                setShowResults(true)
                // Refresh tournament data to show updated results
                window.location.reload()
            }
        } catch (error) {
            console.error('Error generating results:', error)
        }
    }

    const getPlayerAvatar = (playerId: any, playerData: any = null) => {
        // Helper function to generate avatar with initials
        const generateAvatar = (name: string) => {
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&color=fff&size=40`
        }

        // If playerData is provided (populated student object), use it directly
        if (playerData && typeof playerData === 'object' && playerData.name) {
            // Use profilePicture from database if available
            if (playerData.profilePicture) {
                return playerData.profilePicture
            }
            return generateAvatar(playerData.name)
        }

        // If playerId is already a populated student object, use it directly
        if (playerId && typeof playerId === 'object' && playerId.name) {
            // Use profilePicture from database if available
            if (playerId.profilePicture) {
                return playerId.profilePicture
            }
            return generateAvatar(playerId.name)
        }

        const students = studentsData?.getAllStudent || []

        // Handle if playerId is null or undefined
        if (!playerId) {
            return `https://ui-avatars.com/api/?name=TBD&background=random&color=fff&size=40`
        }

        // Handle if playerId is an object
        let searchId = playerId
        if (typeof playerId === 'object' && playerId !== null) {
            searchId = playerId._id || playerId.id || playerId.toString()
        }

        // Try different ways to match the student
        let student = students.find((s: any) => s.id === searchId)
        if (!student) {
            student = students.find((s: any) => String(s.id) === String(searchId))
        }
        if (!student) {
            student = students.find((s: any) => s.id.toString() === searchId.toString())
        }

        // If student found, use profile picture from database
        if (student) {
            if (student.profilePicture) {
                return student.profilePicture
            }
            return generateAvatar(student.name)
        }

        // Try partial match for avatar too
        const partialMatch = students.find((s: any) =>
            String(s.id).includes(String(searchId).slice(-4)) ||
            String(searchId).includes(String(s.id).slice(-4))
        );
        if (partialMatch) {
            if (partialMatch.profilePicture) {
                return partialMatch.profilePicture
            }
            return generateAvatar(partialMatch.name)
        }

        // Otherwise, generate avatar with student ID
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(`Student ${String(searchId).slice(-4)}`)}&background=random&color=fff&size=40`
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <Target className="w-3 h-3" />
            case 'COMPLETED':
                return <Trophy className="w-3 h-3" />
            default:
                return <Users className="w-3 h-3" />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.back()}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Trophy className="w-6 h-6 text-yellow-500" />
                                    {tournament.name} - Admin Tournament Bracket
                                </h1>
                                <p className="text-gray-600 mt-1">{tournament.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Generate Results button - show when all matches completed but no PiWards */}
                            {matches.length > 0 && matches.every(match => match.status === 'COMPLETED') && (!tournament.piWards || tournament.piWards.length === 0) && (
                                <Button
                                    onClick={handleGenerateResults}
                                    disabled={piWardLoading}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {piWardLoading ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    ) : (
                                        <Trophy className="w-4 h-4 mr-2" />
                                    )}
                                    {piWardLoading ? 'Generating...' : 'Generate Results'}
                                </Button>
                            )}

                            <Badge className={`${getStatusColor(tournament.status)} flex items-center gap-1`}>
                                {getStatusIcon(tournament.status)}
                                {tournament.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Error Display */}
                {piWardError && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="text-red-500 mr-2">⚠️</div>
                            <div>
                                <h3 className="text-sm font-medium text-red-800">Error generating results</h3>
                                <p className="text-sm text-red-600 mt-1">{piWardError.message}</p>
                            </div>
                        </div>
                    </div>
                )}
                {/* Tournament Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-xl font-bold text-gray-900">{tournament.participants.length}</p>
                                    <p className="text-gray-600 text-sm">Participants</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Zap className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-xl font-bold text-gray-900">{matches.length}</p>
                                    <p className="text-gray-600 text-sm">Matches</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-xl font-bold text-gray-900">
                                        {new Date(tournament.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600 text-sm">Tournament Date</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Pi Awards Section */}
                {tournament.piWards && tournament.piWards.length > 0 && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="w-6 h-6 text-yellow-500" />
                                Pi Awards Results
                            </CardTitle>
                            <CardDescription>
                                Tournament final rankings and Pi Points distribution
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {tournament.piWards.map((piWard: any, index: number) => (
                                    <div key={piWard.id || `piward-${index}`}>
                                        {piWard.students && piWard.students.length > 0 && (
                                            <div className="space-y-3">
                                                {[...piWard.students]
                                                    .sort((a: any, b: any) => a.place - b.place)
                                                    .map((student: any, studentIndex: number) => (
                                                        <div
                                                            key={`student-${index}-${studentIndex}-${student.place || studentIndex}`}
                                                            className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${student.place <= 3 ? 'ring-2 ring-opacity-50' : ''
                                                                } ${student.place === 1 ? 'ring-yellow-300 bg-yellow-50' :
                                                                    student.place === 2 ? 'ring-gray-300 bg-gray-50' :
                                                                        student.place === 3 ? 'ring-amber-300 bg-amber-50' : 'bg-white'
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex items-center gap-2">
                                                                        {student.place === 1 && <Trophy className="w-6 h-6 text-yellow-500" />}
                                                                        {student.place === 2 && <Award className="w-6 h-6 text-gray-400" />}
                                                                        {student.place === 3 && <Award className="w-6 h-6 text-amber-600" />}
                                                                        {student.place > 3 && <Award className="w-5 h-5 text-blue-500" />}
                                                                        <Badge className={`${student.place === 1 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                                            student.place === 2 ? 'bg-gray-100 text-gray-800 border-gray-200' :
                                                                                student.place === 3 ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                                                                    'bg-blue-100 text-blue-800 border-blue-200'
                                                                            } font-semibold`}>
                                                                            {student.place === 1 ? '1st Place' :
                                                                                student.place === 2 ? '2nd Place' :
                                                                                    student.place === 3 ? '3rd Place' :
                                                                                        `${student.place}th Place`}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                                                                            <img
                                                                                src={getPlayerAvatar(student.studentId)}
                                                                                alt={getPlayerName(student.studentId)}
                                                                                className="w-full h-full object-cover"
                                                                                onError={(e) => {
                                                                                    const target = e.target as HTMLImageElement;
                                                                                    const studentName = getPlayerName(student.studentId);
                                                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=3b82f6&color=fff&size=48`;
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <div className="font-semibold text-gray-900 text-lg">
                                                                                {getPlayerName(student.studentId)}
                                                                            </div>
                                                                            <div className="text-sm text-gray-600">
                                                                                {getPlayerClass(student.studentId)}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-2xl font-bold text-blue-600">
                                                                        {student.points}
                                                                    </div>
                                                                    <div className="text-sm text-gray-600">Pi Points</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Bracket */}
                {matches.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="text-gray-500 text-6xl mb-4">🏆</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matches Yet</h3>
                            <p className="text-gray-600 mb-6">
                                Matches haven't been created for this tournament yet.
                                Create matches to see the tournament bracket.
                            </p>
                            <Button onClick={() => router.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back to Tournament
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">

                        {/* Horizontal Bracket Layout */}
                        <div className="overflow-x-auto">
                            <h2 className="text-xl font-bold text-gray-900 text-center mb-4">TOURNAMENT BRACKET</h2>
                            <div className="flex items-center justify-between min-w-[1000px] space-x-8 border rounded-lg px-12 py-6">
                                {/* Quarter Finals */}
                                <div className="flex flex-col space-y-4">
                                    <h3 className="text-base font-bold text-gray-900 text-center mb-3">Quarter Finals</h3>
                                    {matches.filter(match => match.round.toLowerCase().includes('quarter')).map((match, index) => (
                                        <div key={match.id || `quarter-match-${index}`} className="relative">
                                            <div className="bg-gray-50 rounded-lg p-4 min-w-[220px] border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                                                onClick={() => router.push(`/tournament/${tournamentId}/duel/${match.id}`)}>

                                                {/* Player A */}
                                                <div className={`flex items-center justify-between p-2 rounded mb-2 ${match.winner === match.slotA ? 'bg-green-100 border-0' : 'bg-white'}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={getPlayerAvatar(match.slotA, (match as any).slotAData)}
                                                                alt={getPlayerName(match.slotA, (match as any).slotAData)}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    const playerName = getPlayerName(match.slotA, (match as any).slotAData);
                                                                    const initials = playerName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
                                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff&size=40`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-xs text-gray-900">{getPlayerName(match.slotA, (match as any).slotAData)}</span>
                                                            <span className="text-xs text-gray-600">{getPlayerClass(match.slotA, (match as any).slotAData)}</span>
                                                            {(match as any).slotAData?.school && (
                                                                <span className="text-xs text-gray-500">{((match as any).slotAData as any).school}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {match.winner === match.slotA && (
                                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                                    )}
                                                </div>

                                                {/* VS */}
                                                <div className="text-center text-sm text-gray-600 font-bold py-2 border-t border-b border-gray-200 my-2">
                                                    VS
                                                </div>

                                                {/* Player B */}
                                                <div className={`flex items-center justify-between p-2 rounded ${match.winner === match.slotB ? 'bg-green-100 border-0' : 'bg-white'}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={getPlayerAvatar(match.slotB, (match as any).slotBData)}
                                                                alt={getPlayerName(match.slotB, (match as any).slotBData)}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    const playerName = getPlayerName(match.slotB, (match as any).slotBData);
                                                                    const initials = playerName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
                                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=ef4444&color=fff&size=40`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-xs text-gray-900">{getPlayerName(match.slotB, (match as any).slotBData)}</span>
                                                            <span className="text-xs text-gray-600">{getPlayerClass(match.slotB, (match as any).slotBData)}</span>
                                                            {(match as any).slotBData?.school && (
                                                                <span className="text-xs text-gray-500">{((match as any).slotBData as any).school}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {match.winner === match.slotB && (
                                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                                    )}
                                                </div>

                                                {/* Match Info */}
                                                <div className="mt-3 space-y-2">
                                                    <div className="text-center">
                                                        <Badge className={`${getStatusColor(match.status)} text-xs`}>
                                                            {match.status}
                                                        </Badge>
                                                    </div>
                                                    {match.status !== 'COMPLETED' && (
                                                        <div className="text-center text-xs text-gray-500">
                                                            Round: {match.round}
                                                        </div>
                                                    )}

                                                    {/* Update Winner Button - only show if no winner yet */}
                                                    {!match.winner && (
                                                        <div className="mt-3">
                                                            <Button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setSelectedMatch(match)
                                                                    setIsWinnerModalOpen(true)
                                                                }}
                                                                size="sm"
                                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1"
                                                            >
                                                                <Trophy className="w-3 h-3 mr-1" />
                                                                Update Winner
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                                {/* Semi Finals */}
                                <div className="flex flex-col space-y-4">
                                    <h3 className="text-base font-bold text-gray-900 text-center mb-3">Semi Finals</h3>
                                    {matches.filter(match => match.round.toLowerCase().includes('semi')).map((match, index) => (
                                        <div key={match.id || `semi-match-${index}`} className="relative">
                                            <div className="bg-gray-50 rounded-lg p-4 min-w-[220px] border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                                                onClick={() => router.push(`/tournament/${tournamentId}/duel/${match.id}`)}>

                                                {/* Player A */}
                                                <div className={`flex items-center justify-between p-2 rounded mb-2 ${match.winner === match.slotA ? 'bg-green-100 border-0' : 'bg-white'}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={getPlayerAvatar(match.slotA, (match as any).slotAData)}
                                                                alt={getPlayerName(match.slotA, (match as any).slotAData)}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    const playerName = getPlayerName(match.slotA, (match as any).slotAData);
                                                                    const initials = playerName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
                                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff&size=40`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-xs text-gray-900">{getPlayerName(match.slotA, (match as any).slotAData)}</span>
                                                            <span className="text-xs text-gray-600">{getPlayerClass(match.slotA, (match as any).slotAData)}</span>
                                                            {(match as any).slotAData?.school && (
                                                                <span className="text-xs text-gray-500">{((match as any).slotAData as any).school}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {match.winner === match.slotA && (
                                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                                    )}
                                                </div>

                                                {/* VS */}
                                                <div className="text-center text-sm text-gray-600 font-bold py-2 border-t border-b border-gray-200 my-2">
                                                    VS
                                                </div>

                                                {/* Player B */}
                                                <div className={`flex items-center justify-between p-2 rounded ${match.winner === match.slotB ? 'bg-green-100 border-0' : 'bg-white'}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={getPlayerAvatar(match.slotB, (match as any).slotBData)}
                                                                alt={getPlayerName(match.slotB, (match as any).slotBData)}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    const playerName = getPlayerName(match.slotB, (match as any).slotBData);
                                                                    const initials = playerName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
                                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=ef4444&color=fff&size=40`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-xs text-gray-900">{getPlayerName(match.slotB, (match as any).slotBData)}</span>
                                                            <span className="text-xs text-gray-600">{getPlayerClass(match.slotB, (match as any).slotBData)}</span>
                                                            {(match as any).slotBData?.school && (
                                                                <span className="text-xs text-gray-500">{((match as any).slotBData as any).school}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {match.winner === match.slotB && (
                                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                                    )}
                                                </div>

                                                {/* Match Info */}
                                                <div className="mt-3 space-y-2">
                                                    <div className="text-center">
                                                        <Badge className={`${getStatusColor(match.status)} text-xs`}>
                                                            {match.status}
                                                        </Badge>
                                                    </div>
                                                    {match.status !== 'COMPLETED' && (
                                                        <div className="text-center text-xs text-gray-500">
                                                            Round: {match.round}
                                                        </div>
                                                    )}

                                                    {/* Update Winner Button - only show if no winner yet */}
                                                    {!match.winner && (
                                                        <div className="mt-3">
                                                            <Button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setSelectedMatch(match)
                                                                    setIsWinnerModalOpen(true)
                                                                }}
                                                                size="sm"
                                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1"
                                                            >
                                                                <Trophy className="w-3 h-3 mr-1" />
                                                                Update Winner
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                                {/* Finals */}
                                <div className="flex flex-col space-y-4">
                                    <h3 className="text-base font-bold text-gray-900 text-center mb-3">Finals</h3>
                                    {matches.filter(match => match.round.toLowerCase().includes('final') && !match.round.toLowerCase().includes('semi')).map((match, index) => (
                                        <div key={match.id || `final-match-${index}`} className="relative">
                                            <div className="bg-gray-50 rounded-lg p-4 min-w-[220px] border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                                                onClick={() => router.push(`/tournament/${tournamentId}/duel/${match.id}`)}>

                                                {/* Player A */}
                                                <div className={`flex items-center justify-between p-2 rounded mb-2 ${match.winner === match.slotA ? 'bg-green-100 border-0' : 'bg-white'}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={getPlayerAvatar(match.slotA, (match as any).slotAData)}
                                                                alt={getPlayerName(match.slotA, (match as any).slotAData)}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    const playerName = getPlayerName(match.slotA, (match as any).slotAData);
                                                                    const initials = playerName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
                                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff&size=40`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-xs text-gray-900">{getPlayerName(match.slotA, (match as any).slotAData)}</span>
                                                            <span className="text-xs text-gray-600">{getPlayerClass(match.slotA, (match as any).slotAData)}</span>
                                                            {(match as any).slotAData?.school && (
                                                                <span className="text-xs text-gray-500">{((match as any).slotAData as any).school}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {match.winner === match.slotA && (
                                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                                    )}
                                                </div>

                                                {/* VS */}
                                                <div className="text-center text-sm text-gray-600 font-bold py-2 border-t border-b border-gray-200 my-2">
                                                    VS
                                                </div>

                                                {/* Player B */}
                                                <div className={`flex items-center justify-between p-2 rounded ${match.winner === match.slotB ? 'bg-green-100 border-0' : 'bg-white'}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={getPlayerAvatar(match.slotB, (match as any).slotBData)}
                                                                alt={getPlayerName(match.slotB, (match as any).slotBData)}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    const playerName = getPlayerName(match.slotB, (match as any).slotBData);
                                                                    const initials = playerName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
                                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=ef4444&color=fff&size=40`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-xs text-gray-900">{getPlayerName(match.slotB, (match as any).slotBData)}</span>
                                                            <span className="text-xs text-gray-600">{getPlayerClass(match.slotB, (match as any).slotBData)}</span>
                                                            {(match as any).slotBData?.school && (
                                                                <span className="text-xs text-gray-500">{((match as any).slotBData as any).school}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {match.winner === match.slotB && (
                                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                                    )}
                                                </div>

                                                {/* Match Info */}
                                                <div className="mt-3 space-y-2">
                                                    <div className="text-center">
                                                        <Badge className={`${getStatusColor(match.status)} text-xs`}>
                                                            {match.status}
                                                        </Badge>
                                                    </div>
                                                    {match.status !== 'COMPLETED' && (
                                                        <div className="text-center text-xs text-gray-500">
                                                            Round: {match.round}
                                                        </div>
                                                    )}

                                                    {/* Update Winner Button - only show if no winner yet */}
                                                    {!match.winner && (
                                                        <div className="mt-3">
                                                            <Button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setSelectedMatch(match)
                                                                    setIsWinnerModalOpen(true)
                                                                }}
                                                                size="sm"
                                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1"
                                                            >
                                                                <Trophy className="w-3 h-3 mr-1" />
                                                                Update Winner
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Winner Trophy */}
                                            {match.winner && (
                                                <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                                        <Trophy className="w-6 h-6 text-yellow-600" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Update Winner Modal */}
            {selectedMatch && (
                <UpdateWinnerModal
                    isOpen={isWinnerModalOpen}
                    onClose={() => {
                        setIsWinnerModalOpen(false)
                        setSelectedMatch(null)
                    }}
                    onSuccess={() => {
                        // Refetch match rooms to show updated winner
                        window.location.reload()
                    }}
                    matchId={selectedMatch.id}
                    playerA={selectedMatch.slotA}
                    playerB={selectedMatch.slotB}
                    playerAName={getPlayerName(selectedMatch.slotA, (selectedMatch as any).slotAData)}
                    playerBName={getPlayerName(selectedMatch.slotB, (selectedMatch as any).slotBData)}
                />
            )}
        </div>
    )
}

export default AdminTournamentBracketPage