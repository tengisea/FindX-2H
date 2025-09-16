import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, X, CheckCircle } from 'lucide-react'
import { useUpdateWinnerMutation } from '@/generated'

interface UpdateWinnerModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    matchId: string
    playerA: string
    playerB: string
    playerAName: string
    playerBName: string
}

const UpdateWinnerModal: React.FC<UpdateWinnerModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    matchId,
    playerA,
    playerB,
    playerAName,
    playerBName
}) => {
    const [selectedWinner, setSelectedWinner] = useState<string | null>(null)
    const [updateWinner, { loading, error }] = useUpdateWinnerMutation()

    const handleUpdateWinner = async () => {
        if (!selectedWinner) return

        try {
            const response = await updateWinner({
                variables: {
                    input: {
                        matchId: matchId,
                        winnerId: selectedWinner,
                        loserId: selectedWinner === playerA ? playerB : playerA
                    }
                }
            })

            if (response.data?.updateWinner?.success) {
                onSuccess?.()
                onClose()
            }
        } catch (err) {
            console.error('Error updating winner:', err)
        }
    }

    const handleClose = () => {
        setSelectedWinner(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-white bg-opacity-95 backdrop-blur-md border-2 border-gray-200 shadow-2xl">
                <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center mb-2">
                        <Trophy className="w-8 h-8 text-yellow-500 mr-2" />
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Select Winner
                        </CardTitle>
                    </div>
                    <p className="text-gray-600">Choose the winner of this match</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Player A Option */}
                    <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedWinner === playerA
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                            }`}
                        onClick={() => setSelectedWinner(playerA)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-lg">A</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{playerAName}</p>
                                    <p className="text-sm text-gray-600">Player A</p>
                                </div>
                            </div>
                            {selectedWinner === playerA && (
                                <CheckCircle className="w-6 h-6 text-blue-500" />
                            )}
                        </div>
                    </div>

                    {/* VS */}
                    <div className="text-center">
                        <span className="text-gray-500 font-bold text-lg">VS</span>
                    </div>

                    {/* Player B Option */}
                    <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedWinner === playerB
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 hover:border-red-300 hover:bg-red-25'
                            }`}
                        onClick={() => setSelectedWinner(playerB)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-600 font-bold text-lg">B</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{playerBName}</p>
                                    <p className="text-sm text-gray-600">Player B</p>
                                </div>
                            </div>
                            {selectedWinner === playerB && (
                                <CheckCircle className="w-6 h-6 text-red-500" />
                            )}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm">
                                {error.message || 'Failed to update winner'}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            onClick={handleClose}
                            variant="outline"
                            className="flex-1"
                            disabled={loading}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdateWinner}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            disabled={!selectedWinner || loading}
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            ) : (
                                <Trophy className="w-4 h-4 mr-2" />
                            )}
                            {loading ? 'Updating...' : 'Update Winner'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UpdateWinnerModal