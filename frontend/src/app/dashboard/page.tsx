"use client"

import React, { useState } from 'react'
import {
    Bell,
    ChevronDown,
    Users,
    BarChart3,
    Calendar,
    MessageSquare,
    HelpCircle
} from 'lucide-react'
import { Notification } from './components/Notification'
import Container from './components/Container'
import Help from './components/Help'

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState<'challenge' | 'tournament' | 'leaderboard'>('challenge')
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)

    const user = {
        name: 'Michael Scott',
        location: 'New York, USA',
        avatar: 'MS'
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex max-w-screen-2xl mx-auto">
                {/* Left Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                D
                            </div>
                            <span className="text-xl font-bold text-gray-900">DoDo</span>
                        </div>
                    </div>

                    {/* Help Center */}
                    <Help />
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-black text-white rounded-lg m-5 p-3 shadow-sm">
                        <div className="flex items-center justify-between">
                            {/* Tabs */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setActiveTab('challenge')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'challenge'
                                        ? 'bg-white text-black'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Challenge
                                </button>
                                <button
                                    onClick={() => setActiveTab('tournament')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'tournament'
                                        ? 'bg-white text-black'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Tournament
                                </button>
                                <button
                                    onClick={() => setActiveTab('leaderboard')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'leaderboard'
                                        ? 'bg-white text-black'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Leaderboard
                                </button>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-4">
                                <button className="p-2 text-gray-400 hover:text-white">
                                    <Bell className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Page Body */}
                    <div className="px-6 pb-6">
                        <Container activeTab={activeTab} />
                    </div>
                </main>

                {/* Right Sidebar */}
                <Notification />
            </div>
        </div>
    )
}

export default DashboardPage
