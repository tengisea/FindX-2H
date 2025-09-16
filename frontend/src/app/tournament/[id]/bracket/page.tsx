"use client"

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getCurrentStudentId } from '@/config/student'

const TournamentBracketPage = () => {
    const params = useParams()
    const router = useRouter()
    const tournamentId = params.id as string

    useEffect(() => {
        // Get student ID to determine if user is a student
        const studentId = getCurrentStudentId()

        // For now, redirect to student-bracket page
        // In a real app, you would check user authentication/role here
        if (studentId) {
            router.replace(`/tournament/${tournamentId}/student-bracket`)
        } else {
            // If not a student, redirect to admin-bracket
            router.replace(`/tournament/${tournamentId}/admin-bracket`)
        }
    }, [tournamentId, router])

    // Show loading while redirecting
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-lg text-gray-700">Redirecting to bracket...</p>
        </div>
    )
}

export default TournamentBracketPage