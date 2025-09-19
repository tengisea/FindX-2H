// "use client"

// import React, { useState } from 'react'
// import { useGetTournamentsQuery, Status } from '@/generated'
// import { AdminTournamentCard } from '@/components/tournament'
// import CreateTournamentModal from '@/components/tournament/CreateTournamentModal'
// import { Trophy, Plus, Settings, Users, Calendar } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { useRouter } from 'next/navigation'

// export const CreateTournament = () => {
//     const router = useRouter()
//     const { data, loading, error, refetch } = useGetTournamentsQuery()
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
//     const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPENING' | 'ONGOING' | 'FINISHED'>('ALL')

//     if (loading) return (
//         <div className="flex items-center justify-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//     )

//     if (error) return (
//         <div className="text-center py-8">
//             <div className="text-red-500 text-xl mb-2">Error loading tournaments</div>
//             <p className="text-gray-600">{error.message}</p>
//         </div>
//     )

//     const tournaments = data?.getTournaments || []

//     // Filter tournaments based on status
//     const filteredTournaments = tournaments.filter(tournament => {
//         if (statusFilter === 'ALL') return true
//         return String(tournament.status).toUpperCase() === statusFilter
//     })

//     // Calculate statistics
//     const stats = {
//         total: tournaments.length,
//         opening: tournaments.filter(t => String(t.status).toUpperCase() === 'OPENING').length,
//         ongoing: tournaments.filter(t => String(t.status).toUpperCase() === 'ONGOING').length,
//         finished: tournaments.filter(t => String(t.status).toUpperCase() === 'FINISHED').length,
//         totalParticipants: tournaments.reduce((sum, t) => sum + t.participants.length, 0)
//     }

//     const handleCreateSuccess = () => {
//         refetch()
//     }

//     const handleStatusUpdate = async (tournamentId: string, newStatus?: any) => {
//         // Wait for refetch to complete
//         await refetch()

//         // Only navigate if the status was changed to FINISHED
//         if (newStatus === Status.Finished) {
//             // Small delay to ensure the status update is processed
//             setTimeout(() => {
//                 router.push(`/tournament/${tournamentId}/bracket`)
//             }, 500)
//         }
//     }

//     const handleViewDetails = (tournamentId: string) => {
//         // Navigate to bracket page for finished tournaments
//         router.push(`/tournament/${tournamentId}/bracket`)
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
//                         <Trophy className="w-6 h-6 text-yellow-500" />
//                         Tournament Management
//                     </h2>
//                     <p className="text-gray-600 mt-1">Create and manage tournaments</p>
//                 </div>
//                 <Button
//                     onClick={() => setIsCreateModalOpen(true)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
//                 >
//                     <Plus className="w-4 h-4" />
//                     Create Tournament
//                 </Button>
//             </div>

//             {/* Status Filter */}
//             <div className="bg-white rounded-lg border border-gray-200 p-4">
//                 <div className="flex flex-wrap gap-2">
//                     <Button
//                         variant={statusFilter === 'ALL' ? 'default' : 'outline'}
//                         onClick={() => setStatusFilter('ALL')}
//                         className="flex items-center gap-2"
//                     >
//                         <Trophy className="w-4 h-4" />
//                         All ({stats.total})
//                     </Button>
//                     <Button
//                         variant={statusFilter === 'OPENING' ? 'default' : 'outline'}
//                         onClick={() => setStatusFilter('OPENING')}
//                         className="flex items-center gap-2"
//                     >
//                         <Calendar className="w-4 h-4" />
//                         Opening ({stats.opening})
//                     </Button>
//                     <Button
//                         variant={statusFilter === 'ONGOING' ? 'default' : 'outline'}
//                         onClick={() => setStatusFilter('ONGOING')}
//                         className="flex items-center gap-2"
//                     >
//                         <Settings className="w-4 h-4" />
//                         Ongoing ({stats.ongoing})
//                     </Button>
//                     <Button
//                         variant={statusFilter === 'FINISHED' ? 'default' : 'outline'}
//                         onClick={() => setStatusFilter('FINISHED')}
//                         className="flex items-center gap-2"
//                     >
//                         <Trophy className="w-4 h-4" />
//                         Finished ({stats.finished})
//                     </Button>
//                 </div>
//             </div>

//             {/* Results Count */}
//             <div className="flex items-center justify-between">
//                 <p className="text-gray-600">
//                     Showing {filteredTournaments.length} of {tournaments.length} tournaments
//                 </p>
//                 {statusFilter !== 'ALL' && (
//                     <Badge variant="outline" className="text-blue-600">
//                         Filter: {statusFilter}
//                     </Badge>
//                 )}
//             </div>

//             {/* Tournament Cards */}
//             {filteredTournaments.length === 0 ? (
//                 <div className="text-center py-12">
//                     <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">No tournaments found</h3>
//                     <p className="text-gray-600">
//                         {statusFilter !== 'ALL' ? `No ${statusFilter.toLowerCase()} tournaments found` : 'No tournaments are available at the moment'}
//                     </p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
//                     {filteredTournaments.map((tournament) => (
//                         <AdminTournamentCard
//                             key={tournament.id}
//                             tournament={tournament as any}
//                             onStatusUpdate={(newStatus) => handleStatusUpdate(tournament.id, newStatus)}
//                         />
//                     ))}
//                 </div>
//             )}

//             {/* Create Tournament Modal */}
//             <CreateTournamentModal
//                 isOpen={isCreateModalOpen}
//                 onClose={() => setIsCreateModalOpen(false)}
//                 onSuccess={handleCreateSuccess}
//             />
//         </div>
//     )
// }
