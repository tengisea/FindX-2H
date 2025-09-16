"use client"

import React, { useState } from 'react'
import { useGetTournamentsQuery } from "@/generated"
import { StudentTournamentCard } from '@/components/tournament'
import CreateTournamentModal from '@/components/tournament/CreateTournamentModal'
import { Trophy, Users, Award, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getCurrentStudentId } from '@/config/student'

const TournamentPage = () => {
    const { data, loading, error, refetch } = useGetTournamentsQuery()
    const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPENING' | 'ONGOING' | 'FINISHED'>('ALL')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    // Get studentId from centralized configuration
    const studentId = getCurrentStudentId()
    const isAdmin = false // TODO: Get from user context/auth

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading tournaments...</p>
            </div>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="text-red-500 text-xl mb-2">Error loading tournaments</div>
                <p className="text-gray-600">{error.message}</p>
            </div>
        </div>
    )

    const tournaments = data?.getTournaments || []

    // Filter tournaments based on status
    const filteredTournaments = tournaments.filter(tournament => {
        if (statusFilter === 'ALL') return true
        return String(tournament.status).toUpperCase() === statusFilter
    })

    // Calculate statistics
    const stats = {
        total: tournaments.length,
        opening: tournaments.filter(t => String(t.status).toUpperCase() === 'OPENING').length,
        ongoing: tournaments.filter(t => String(t.status).toUpperCase() === 'ONGOING').length,
        finished: tournaments.filter(t => String(t.status).toUpperCase() === 'FINISHED').length,
        totalParticipants: tournaments.reduce((sum, t) => sum + t.participants.length, 0)
    }

    const handleRegister = (tournamentId: string) => {
        console.log('Successfully registered for tournament:', tournamentId)
        // Refresh tournaments to show updated participant count
        refetch()
    }

    const handleViewDetails = (tournamentId: string) => {
        // Navigate to tournament bracket page
        window.location.href = `/tournament/${tournamentId}/bracket`
    }

    const handleJoin = (tournamentId: string) => {
        // For opening/ongoing tournaments, navigate to student bracket page to join
        window.location.href = `/tournament/${tournamentId}/student-bracket`
    }

    const handleCreateSuccess = () => {
        // Refetch tournaments to show the new one
        refetch()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                                Tournaments
                            </h1>
                            <p className="text-gray-600 mt-2">Compete in tournaments and showcase your skills</p>
                        </div>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Create Tournament
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Status Filter */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={statusFilter === 'ALL' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('ALL')}
                            className="flex items-center gap-2"
                        >
                            <Trophy className="w-4 h-4" />
                            All ({stats.total})
                        </Button>
                        <Button
                            variant={statusFilter === 'OPENING' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('OPENING')}
                            className="flex items-center gap-2"
                        >
                            <Target className="w-4 h-4" />
                            Opening ({stats.opening})
                        </Button>
                        <Button
                            variant={statusFilter === 'ONGOING' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('ONGOING')}
                            className="flex items-center gap-2"
                        >
                            <Award className="w-4 h-4" />
                            Ongoing ({stats.ongoing})
                        </Button>
                        <Button
                            variant={statusFilter === 'FINISHED' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('FINISHED')}
                            className="flex items-center gap-2"
                        >
                            <Trophy className="w-4 h-4" />
                            Finished ({stats.finished})
                        </Button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                        Showing {filteredTournaments.length} of {tournaments.length} tournaments
                    </p>
                    {statusFilter !== 'ALL' && (
                        <Badge variant="outline" className="text-blue-600">
                            Filter: {statusFilter}
                        </Badge>
                    )}
                </div>

                {/* Tournament Cards */}
                {filteredTournaments.length === 0 ? (
                    <div className="text-center py-12">
                        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tournaments found</h3>
                        <p className="text-gray-600">
                            {statusFilter !== 'ALL'
                                ? `No ${statusFilter.toLowerCase()} tournaments found`
                                : 'No tournaments are available at the moment'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {filteredTournaments.map((tournament, index) => (
                            <StudentTournamentCard
                                key={tournament.id || `tournament-${index}`}
                                tournament={tournament as any}
                                studentId={studentId}
                                onRegister={handleRegister}
                                onViewDetails={handleViewDetails}
                                onJoin={handleJoin}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Create Tournament Modal */}
            <CreateTournamentModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleCreateSuccess}
            />

        </div>
    )
}

export default TournamentPage