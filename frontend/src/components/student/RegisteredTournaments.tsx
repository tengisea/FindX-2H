// "use client"

// import React, { useState } from 'react'
// import { useGetTournamentsQuery } from '@/generated'
// import { StudentTournamentCard } from '@/components/tournament'
// import { Trophy, Award, Calendar, Users, Target } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'

// interface RegisteredTournamentsProps {
//     studentId: string
// }

// export const RegisteredTournaments: React.FC<RegisteredTournamentsProps> = ({ studentId }) => {
//     const { data, loading, error, refetch } = useGetTournamentsQuery()
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

//     // Show all tournaments (not just registered ones)
//     const allTournaments = tournaments

//     // Filter based on status
//     const filteredTournaments = allTournaments.filter(tournament => {
//         if (statusFilter === 'ALL') return true
//         return String(tournament.status).toUpperCase() === statusFilter
//     })

//     // Calculate statistics for all tournaments
//     const stats = {
//         total: allTournaments.length,
//         opening: allTournaments.filter(t => String(t.status).toUpperCase() === 'OPENING').length,
//         ongoing: allTournaments.filter(t => String(t.status).toUpperCase() === 'ONGOING').length,
//         finished: allTournaments.filter(t => String(t.status).toUpperCase() === 'FINISHED').length,
//         totalParticipants: allTournaments.reduce((sum, t) => sum + t.participants.length, 0)
//     }

//     const handleRegister = (tournamentId: string) => {
//         console.log('Register for tournament:', tournamentId)
//         refetch()
//     }

//     const handleViewDetails = (tournamentId: string) => {
//         // For finished tournaments, navigate to bracket page to view results
//         window.location.href = `/tournament/${tournamentId}/bracket`
//     }

//     const handleJoin = (tournamentId: string) => {
//         // For opening/ongoing tournaments, navigate to student bracket page to join
//         window.location.href = `/tournament/${tournamentId}/student-bracket`
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
//                         <Trophy className="w-6 h-6 text-yellow-500" />
//                         All Tournaments
//                     </h2>
//                     <p className="text-gray-600 mt-1">Browse and participate in tournaments</p>
//                 </div>
//                 <Badge variant="outline" className="text-blue-600">
//                     {allTournaments.filter(t => t.participants.includes(studentId)).length} Registered
//                 </Badge>
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
//                         <Target className="w-4 h-4" />
//                         Ongoing ({stats.ongoing})
//                     </Button>
//                     <Button
//                         variant={statusFilter === 'FINISHED' ? 'default' : 'outline'}
//                         onClick={() => setStatusFilter('FINISHED')}
//                         className="flex items-center gap-2"
//                     >
//                         <Award className="w-4 h-4" />
//                         Finished ({stats.finished})
//                     </Button>
//                 </div>
//             </div>

//             {/* Results Count */}
//             <div className="flex items-center justify-between">
//                 <p className="text-gray-600">
//                     Showing {filteredTournaments.length} of {allTournaments.length} tournaments
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
//                     <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                         {allTournaments.length === 0 ? 'No tournaments available' : 'No tournaments found'}
//                     </h3>
//                     <p className="text-gray-600">
//                         {allTournaments.length === 0
//                             ? 'No tournaments are available at the moment. Check back later!'
//                             : statusFilter !== 'ALL' ? `No ${statusFilter.toLowerCase()} tournaments found` : 'No tournaments found'
//                         }
//                     </p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
//                     {filteredTournaments.map((tournament) => (
//                         <StudentTournamentCard
//                             key={tournament.id}
//                             tournament={tournament as any}
//                             studentId={studentId}
//                             onRegister={handleRegister}
//                             onViewDetails={handleViewDetails}
//                             onJoin={handleJoin}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }