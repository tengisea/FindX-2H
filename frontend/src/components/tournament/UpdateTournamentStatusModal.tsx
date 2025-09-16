"use client";

import React, { useState } from "react";
import { useUpdateTournamentStatusMutation, Status } from "@/generated";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Settings, AlertCircle } from "lucide-react";

interface UpdateTournamentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newStatus: Status) => void;
  tournamentId: string;
  currentStatus: string;
  tournamentName: string;
}

const UpdateTournamentStatusModal: React.FC<
  UpdateTournamentStatusModalProps
> = ({
  isOpen,
  onClose,
  onSuccess,
  tournamentId,
  currentStatus,
  tournamentName,
}) => {
  const [updateTournamentStatus, { loading, error }] =
    useUpdateTournamentStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.Opening);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await updateTournamentStatus({
        variables: {
          id: tournamentId,
          status: selectedStatus,
        },
      });

      if (result.data?.updateTournamentStatus?.success) {
        onSuccess?.(selectedStatus);
        onClose();
      }
    } catch (err) {
      console.error("Error updating tournament status:", err);
    }
  };

  const handleClose = () => {
    setSelectedStatus(Status.Opening);
    onClose();
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.Opening:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case Status.Ongoing:
        return "bg-green-100 text-green-800 border-green-200";
      case Status.Finished:
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusDescription = (status: Status) => {
    switch (status) {
      case Status.Opening:
        return "Registration is open, tournament has not started yet";
      case Status.Ongoing:
        return "Tournament is currently active and running";
      case Status.Finished:
        return "Tournament has been completed";
      default:
        return "";
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Update Tournament Status"
      description={`Change the status of "${tournamentName}"`}
      size="sm"
    >
      <ModalContent>
        <form id="status-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Current Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Current Status
            </label>
            <div
              className={`px-3 py-2 rounded-md border ${getStatusColor(
                currentStatus as Status
              )}`}
            >
              <span className="font-medium">{currentStatus}</span>
            </div>
          </div>

          {/* New Status Selection */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">
              New Status
            </label>
            <div className="space-y-3">
              {Object.values(Status).map((status) => (
                <div key={status} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={status}
                    name="status"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={(e) =>
                      setSelectedStatus(e.target.value as Status)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor={status} className="flex-1 cursor-pointer">
                    <div
                      className={`px-3 py-2 rounded-md border ${getStatusColor(
                        status
                      )}`}
                    >
                      <div className="font-medium">{status}</div>
                      <div className="text-xs opacity-75 mt-1">
                        {getStatusDescription(status)}
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                Changing tournament status will affect participant access and
                tournament flow.
              </span>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800 font-medium">Error updating status:</p>
              <p className="text-red-600 text-sm mt-1">{error.message}</p>
            </div>
          )}
        </form>
      </ModalContent>

      <ModalFooter>
        <Button
          type="submit"
          form="status-form"
          disabled={loading || selectedStatus === currentStatus}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Updating...
            </>
          ) : (
            <>
              <Settings className="w-4 h-4" />
              Update Status
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateTournamentStatusModal;
