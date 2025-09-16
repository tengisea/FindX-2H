"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Trophy,
    Users,
    Calendar,
    Target,
    Zap,
    Clock,
    Award
} from 'lucide-react'
// import { Tournament } from '@/generated'
import { useRegisterStudentToTournamentMutation } from '@/generated'

interface StudentTournamentCardProps {
    tournament: any
    studentId: string
    onRegister?: (tournamentId: string) => void
    onViewDetails?: (tournamentId: string) => void
    onJoin?: (tournamentId: string) => void
}

const StudentTournamentCard: React.FC<StudentTournamentCardProps> = ({
    tournament,
    studentId,
    onRegister,
    onViewDetails,
    onJoin
}) => {
    const router = useRouter()
    const [registerStudentToTournament, { loading: registerLoading, error: registerError }] = useRegisterStudentToTournamentMutation()
    const [isRegistered, setIsRegistered] = useState(false)

    const getStatusColor = (status: any) => {
        const statusStr = String(status).toUpperCase()
        switch (statusStr) {
            case 'ONGOING':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'OPENING':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'FINISHED':
                return 'bg-gray-100 text-gray-800 border-gray-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusIcon = (status: any) => {
        const statusStr = String(status).toUpperCase()
        switch (statusStr) {
            case 'ONGOING':
                return <Zap className="w-3 h-3" />
            case 'OPENING':
                return <Target className="w-3 h-3" />
            case 'FINISHED':
                return <Trophy className="w-3 h-3" />
            default:
                return <Clock className="w-3 h-3" />
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getDaysUntilStart = (dateString: string) => {
        const now = new Date()
        const tournamentDate = new Date(dateString)
        const diffTime = tournamentDate.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    // Check if student is already registered
    const isStudentRegistered = studentId ? tournament.participants.includes(studentId) : false
    const daysUntilStart = getDaysUntilStart(tournament.date)
    const statusStr = String(tournament.status).toUpperCase()
    const isUpcoming = daysUntilStart > 0 && statusStr === 'OPENING'
    const isActive = statusStr === 'ONGOING'
    const isFinished = statusStr === 'FINISHED'


    const handleRegister = async () => {
        if (!studentId) {
            console.error('Student ID is required for registration')
            return
        }

        try {
            const result = await registerStudentToTournament({
                variables: {
                    studentId: studentId,
                    tournamentId: tournament.id
                }
            })

            if (result.data?.registerStudentToTournament?.success) {
                setIsRegistered(true)
                onRegister?.(tournament.id)
            }
        } catch (err) {
            console.error('Error registering for tournament:', err)
        }
    }

    const handleCardClick = () => {
        // For students, clicking the card navigates to appropriate page based on status
        if (statusStr === 'FINISHED') {
            // Finished tournaments - go to results page
            router.push(`/tournament/${tournament.id}/bracket`)
        } else if (statusStr === 'OPENING' || statusStr === 'ONGOING') {
            // Active tournaments - go to student bracket page
            router.push(`/tournament/${tournament.id}/student-bracket`)
        }
    }

    return (
        <Card
            className={`h-full flex flex-col cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${isActive ? 'border-green-200 hover:border-green-300' :
                isFinished ? 'border-gray-200 hover:border-gray-300' :
                    'border-blue-200 hover:border-blue-300'
                }`}
            onClick={handleCardClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                            {tournament.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-sm">
                            {tournament.description}
                        </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(tournament.status)} flex items-center gap-1`}>
                        {getStatusIcon(tournament.status)}
                        {tournament.status}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
                {/* Tournament Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(tournament.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{tournament.participants.length} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Target className="w-4 h-4" />
                        <span>{tournament.topic}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Trophy className="w-4 h-4" />
                        <span>{tournament.piPoints} Pi Points</span>
                    </div>
                </div>

                {/* Registration Status - Only show for students */}
                {(isStudentRegistered || isRegistered) && (
                    <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-yellow-800">
                            <Award className="w-4 h-4" />
                            <span className="font-medium">You are registered for this tournament</span>
                        </div>
                    </div>
                )}

                {/* Registration Error - Only show for students */}
                {registerError && (
                    <div className="bg-red-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-red-800">
                            <span className="font-medium">Registration failed: {registerError.message}</span>
                        </div>
                    </div>
                )}

                {/* Status-specific info */}
                {isUpcoming && !isStudentRegistered && !isRegistered && (
                    <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center justify-center gap-2 text-blue-800">
                            <Target className="w-4 h-4" />
                            <span className="font-medium">
                                Tournament is open for registration
                            </span>
                        </div>
                    </div>
                )}

                {isActive && (
                    <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-800">
                            <Zap className="w-4 h-4" />
                            <span className="font-medium">Tournament is active</span>
                        </div>
                    </div>
                )}

                {isFinished && (
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-800">
                            <Trophy className="w-4 h-4" />
                            <span className="font-medium">Tournament completed</span>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex gap-2 pt-4">
                {/* Register button - only show if student is NOT registered and tournament is OPENING */}
                {String(tournament.status).toUpperCase() === 'OPENING' && !isStudentRegistered && !isRegistered && (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleRegister()
                        }}
                        disabled={registerLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                        {registerLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Бүртгүүлж байна...
                            </>
                        ) : (
                            <>
                                <Target className="w-4 h-4" />
                                БҮРТГҮҮЛЭХ
                            </>
                        )}
                    </Button>
                )}

                {/* Join tournament button - show if student is NOT registered and tournament is ONGOING */}
                {String(tournament.status).toUpperCase() === 'ONGOING' && !isStudentRegistered && !isRegistered && (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/tournament/${tournament.id}/student-bracket`)
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
                    >
                        <Zap className="w-4 h-4" />
                        JOIN TOURNAMENT
                    </Button>
                )}

                {/* View bracket button - show if student is registered or tournament is finished */}
                {(isStudentRegistered || isRegistered || String(tournament.status).toUpperCase() === 'FINISHED') && (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/tournament/${tournament.id}/student-bracket`)
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                        <Trophy className="w-4 h-4" />
                        VIEW BRACKET
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default StudentTournamentCard