import { CheckCheckIcon, CheckIcon, X } from 'lucide-react'
import React from 'react'

export const Notification = () => {
    return (
        <div className="w-80 bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Notifications
            </h2>

            <div className="flex flex-col gap-4">
                {/* Notification item */}
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-sm text-gray-500 mb-2">New Challenge</p>
                    <div className="flex items-center gap-2">
                        <CheckCheckIcon className="w-5 h-5 text-green-600" />
                        <span className="text-gray-800 text-sm">Bat-Erdene</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-3">
                        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 hover:bg-green-100">
                            <CheckIcon className="w-4 h-4 text-green-600" />
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 hover:bg-red-100">
                            <X className="w-4 h-4 text-red-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification
