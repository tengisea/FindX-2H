"use client"
import { HelpCircle } from 'lucide-react'
import React from 'react'

export default function Help() {
    return (
        <div className="p-6">
            <div className="bg-gray-900 text-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="w-5 h-5" />
                    <span className="font-medium">Help center</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                    Have a problem? Send us a message!
                </p>
                <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    Go to help center
                </button>
            </div>
        </div>
    )
}   