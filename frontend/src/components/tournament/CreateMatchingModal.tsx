"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
// import { useGetAllStudentsQuery } from '@/generated' // Not needed anymore
import { Button } from '@/components/ui/button'

import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Users, Shuffle, Target, Clock, Trophy } from 'lucide-react'

interface CreateMatchingModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    tournamentId: string
    tournamentName: string
    participants: string[]
}

interface Student {
    id: string
    originalId?: string
    name: string
    email: string
    school: string
    class: string
}

interface MatchRoom {
    id: string
    participants: Student[]
    roomNumber: number
}

const CreateMatchingModal: React.FC<CreateMatchingModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    tournamentId,
    tournamentName,
    participants
}) => {
    const router = useRouter()
    const [createLoading, setCreateLoading] = useState(false)
    const [createError, setCreateError] = useState<string | null>(null)

    const [matchRooms, setMatchRooms] = useState<MatchRoom[]>([])

    // Use participants directly from tournament (they are student IDs)
    const participantStudents = participants.map((participantId, index) => ({
        id: `${participantId}-${index}`, // Make ID unique by adding index
        originalId: participantId,
        name: `Student ${participantId.slice(-4)}-${index + 1}`, // Use last 4 chars + index for unique names
        email: `student${participantId.slice(-4)}-${index + 1}@example.com`,
        school: 'Unknown School',
        class: 'Unknown Grade'
    }))

    // Debug: Log tournament data
    console.log('Tournament ID:', tournamentId)
    console.log('Tournament Name:', tournamentName)
    console.log('Participants (IDs):', participants)
    console.log('Participant Students (mapped):', participantStudents)

    // Auto-generate matches when modal opens
    useEffect(() => {
        if (participants.length > 0) {
            const shuffled = [...participantStudents].sort(() => Math.random() - 0.5)
            const rooms: MatchRoom[] = []

            // Create matches with exactly 2 students per room
            for (let i = 0; i < shuffled.length; i += 2) {
                const roomParticipants = shuffled.slice(i, i + 2)
                if (roomParticipants.length === 2) {
                    rooms.push({
                        id: `room-${Date.now()}-${rooms.length + 1}`,
                        participants: roomParticipants,
                        roomNumber: rooms.length + 1
                    })
                }
            }

            setMatchRooms(rooms)
        }
    }, [participants.length])

    const generateMatches = () => {
        const shuffled = [...participantStudents].sort(() => Math.random() - 0.5)
        const rooms: MatchRoom[] = []

        // Create matches with exactly 2 students per room
        for (let i = 0; i < shuffled.length; i += 2) {
            const roomParticipants = shuffled.slice(i, i + 2)
            if (roomParticipants.length === 2) {
                rooms.push({
                    id: `room-${Date.now()}-${rooms.length + 1}`,
                    participants: roomParticipants,
                    roomNumber: rooms.length + 1
                })
            }
        }

        setMatchRooms(rooms)
    }

    const handleCreateMatches = async () => {
        setCreateLoading(true)
        setCreateError(null)

        try {
            // Call the createMatch mutation once - it will create all matches automatically
            const response = await fetch('http://localhost:8000/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation CreateMatch($input: CreateMatchInput!) {
                            createMatch(input: $input) {
                                success
                                message
                            }
                        }
                    `,
                    variables: {
                        input: {
                            task: `Tournament Matches`,
                            scheduleAt: new Date().toISOString(),
                            slotA: participantStudents[0]?.originalId || participants[0], // Required field, but backend will use all participants
                            slotB: participantStudents[1]?.originalId || participants[1], // Required field, but backend will use all participants
                            tournamentId: tournamentId
                        }
                    }
                })
            })

            const result = await response.json()
            if (result.errors) {
                throw new Error(result.errors[0].message)
            }

            // Navigate to admin tournament bracket page
            router.push(`/tournament/${tournamentId}/admin-bracket`)

            onSuccess?.()
            onClose()
        } catch (err: any) {
            console.error('Error creating matches:', err)
            setCreateError(err.message || 'Failed to create matches')
        } finally {
            setCreateLoading(false)
        }
    }

    const handleClose = () => {
        setMatchRooms([])
        onClose()
    }

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey)
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey)
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={handleClose}
        >
            <Card
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white bg-opacity-95 shadow-2xl border border-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Shuffle className="w-6 h-6 text-blue-500" />
                            Create Tournament Matches
                        </CardTitle>
                        <CardDescription>
                            Generate match rooms for: {tournamentName}
                        </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Tournament Info */}
                    <div className={`rounded-lg p-4 ${participantStudents.length > 0 ? 'bg-blue-50' : 'bg-red-50'}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-blue-900">{tournamentName}</h3>
                                <p className={`text-sm ${participantStudents.length > 0 ? 'text-blue-700' : 'text-red-700'}`}>
                                    {participantStudents.length > 0
                                        ? `${participantStudents.length} participants ready for matching`
                                        : 'No participants registered for this tournament'
                                    }
                                </p>
                                {participants.length > 0 && participantStudents.length === 0 && (
                                    <p className="text-xs text-red-600 mt-1">
                                        Debug: {participants.length} participant IDs found but no matching students
                                    </p>
                                )}
                            </div>
                            <Badge variant="outline" className={participantStudents.length > 0 ? 'text-blue-600' : 'text-red-600'}>
                                {participantStudents.length} Students
                            </Badge>
                        </div>
                    </div>

                    {/* Error message if no participants */}
                    {participantStudents.length === 0 && (
                        <div className="bg-red-50 rounded-lg p-4">
                            <p className="text-sm text-red-800">
                                <strong>Cannot create matches:</strong> No students are registered for this tournament.
                                Students need to register first before matches can be created.
                            </p>
                        </div>
                    )}

                    {/* Participants List */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-500" />
                            Participants ({participantStudents.length})
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {participantStudents.map((student) => (
                                <div key={student.id} className="bg-gray-50 rounded-lg p-3 border">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">{student.name}</p>
                                            <p className="text-sm text-gray-600">{student.school}</p>
                                            <p className="text-xs text-gray-500">Grade {student.class}</p>
                                            <p className="text-xs text-gray-400">ID: {student.id}</p>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {student.class}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Generated Match Rooms */}
                    {matchRooms.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                Generated Match Rooms ({matchRooms.length})
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {matchRooms.map((room) => (
                                    <div key={room.id} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-yellow-900">
                                                Room {room.roomNumber}
                                            </h4>
                                            <Badge variant="outline" className="text-yellow-600">
                                                {room.participants.length} students
                                            </Badge>
                                        </div>

                                        <div className="space-y-2">
                                            {room.participants.map((participant, index) => (
                                                <div key={`${room.id}-participant-${participant.id}-${index}`} className="flex items-center justify-between bg-white rounded p-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">
                                                            {index === 0 ? 'Player A' : 'Player B'}
                                                        </Badge>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                                                            <p className="text-xs text-gray-600">{participant.school}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="text-xs">
                                                        {participant.class}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Error Display */}
                    {createError && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <p className="text-red-800 font-medium">Error creating matches:</p>
                            <p className="text-red-600 text-sm mt-1">{createError}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            onClick={handleCreateMatches}
                            disabled={createLoading || matchRooms.length === 0 || participantStudents.length === 0}
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {createLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Creating Matches...
                                </>
                            ) : (
                                <>
                                    <Trophy className="w-4 h-4" />
                                    Create {matchRooms.length} Match Rooms
                                </>
                            )}
                        </Button>

                        <Button
                            onClick={generateMatches}
                            variant="outline"
                            disabled={participantStudents.length === 0}
                            className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Shuffle className="w-4 h-4" />
                            Generate Matches
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={createLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateMatchingModal