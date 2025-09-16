import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Trophy, CheckCircle } from "lucide-react";
import { useUpdateWinnerMutation } from "@/generated";

interface UpdateWinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  matchId: string;
  playerA: string;
  playerB: string;
  playerAName: string;
  playerBName: string;
}

const UpdateWinnerModal: React.FC<UpdateWinnerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  matchId,
  playerA,
  playerB,
  playerAName,
  playerBName,
}) => {
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [updateWinner, { loading, error }] = useUpdateWinnerMutation();

  const handleUpdateWinner = async () => {
    if (!selectedWinner) return;

    try {
      const response = await updateWinner({
        variables: {
          input: {
            matchId: matchId,
            winnerId: selectedWinner,
            loserId: selectedWinner === playerA ? playerB : playerA,
          },
        },
      });

      if (response.data?.updateWinner?.success) {
        onSuccess?.();
        onClose();
      }
    } catch (err) {
      console.error("Error updating winner:", err);
    }
  };

  const handleClose = () => {
    setSelectedWinner(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Select Winner"
      description="Choose the winner of this match"
      size="sm"
    >
      <ModalContent className="space-y-6">
        {/* Player A Option */}
        <div
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedWinner === playerA
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
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
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedWinner === playerB
              ? "border-red-500 bg-red-50"
              : "border-gray-200 hover:border-red-300 hover:bg-red-25"
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
              {error.message || "Failed to update winner"}
            </p>
          </div>
        )}
      </ModalContent>

      <ModalFooter>
        <Button onClick={handleClose} variant="outline" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleUpdateWinner}
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={!selectedWinner || loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Updating...
            </>
          ) : (
            <>
              <Trophy className="w-4 h-4 mr-2" />
              Update Winner
            </>
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateWinnerModal;
