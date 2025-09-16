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
    Settings,
    Eye,
    Shuffle,
    Clock,
    Award
} from 'lucide-react'
// import { Tournament } from '@/generated'
import UpdateTournamentStatusModal from './UpdateTournamentStatusModal'
import CreateMatchingModal from './CreateMatchingModal'

interface AdminTournamentCardProps {
    tournament: any
    onStatusUpdate?: (newStatus?: any) => void
}

const AdminTournamentCard: React.FC<AdminTournamentCardProps> = ({
    tournament,
    onStatusUpdate
}) => {
    const router = useRouter()
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
    const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false)

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

    const daysUntilStart = getDaysUntilStart(tournament.date)
    const statusStr = String(tournament.status).toUpperCase()
    const isUpcoming = daysUntilStart > 0 && statusStr === 'OPENING'
    const isActive = statusStr === 'ONGOING'
    const isFinished = statusStr === 'FINISHED'

    // Check if tournament has matches (rounds)
    const hasMatches = tournament.rounds && tournament.rounds.length > 0

    const handleStatusUpdate = (newStatus?: any) => {
        onStatusUpdate?.(newStatus)
    }

    const handleCardClick = () => {
        // For admin users, clicking the card opens the matching modal or bracket
        if (isActive && tournament.participants.length > 0) {
            if (hasMatches) {
                router.push(`/tournament/${tournament.id}/admin-bracket`)
            } else {
                setIsMatchingModalOpen(true)
            }
        } else if (isFinished) {
            // For finished tournaments, admin should go to admin-bracket page
            router.push(`/tournament/${tournament.id}/admin-bracket`)
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

                {/* Status-specific info */}
                {isUpcoming && (
                    <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-blue-800">
                            <Target className="w-4 h-4" />
                            <span className="font-medium">
                                Starts in {daysUntilStart} day{daysUntilStart !== 1 ? 's' : ''}
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
                {/* Admin-specific buttons */}
                {/* Conditional Button - Create Matches or View Bracket */}
                {String(tournament.status).toUpperCase() === 'ONGOING' && tournament.participants.length > 0 && (
                    <>
                        {hasMatches ? (
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    router.push(`/tournament/${tournament.id}/admin-bracket`)
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4" />
                                View Bracket
                            </Button>
                        ) : (
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsMatchingModalOpen(true)
                                }}
                                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                            >
                                <Shuffle className="w-4 h-4" />
                                Create Matches
                            </Button>
                        )}
                    </>
                )}

                {/* Only show Update Status button if tournament is not FINISHED */}
                {String(tournament.status).toUpperCase() !== 'FINISHED' && (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsStatusModalOpen(true)
                        }}
                        variant="outline"
                        className="flex items-center gap-2 border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                        <Settings className="w-4 h-4" />
                        Update Status
                    </Button>
                )}
            </CardFooter>

            {/* Update Status Modal */}
            <UpdateTournamentStatusModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                onSuccess={handleStatusUpdate}
                tournamentId={tournament.id}
                currentStatus={tournament.status}
                tournamentName={tournament.name}
            />

            {/* Create Matching Modal */}
            <CreateMatchingModal
                isOpen={isMatchingModalOpen}
                onClose={() => setIsMatchingModalOpen(false)}
                onSuccess={onStatusUpdate}
                tournamentId={tournament.id}
                tournamentName={tournament.name}
                participants={tournament.participants}
            />
        </Card>
    )
}

export default AdminTournamentCard