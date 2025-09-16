"use client";

import React, { useState } from "react";
import { useCreateTournamentMutation, Status } from "@/generated";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Calendar, Users, Trophy, Target, Star } from "lucide-react";

interface CreateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface TournamentFormData {
  name: string;
  description: string;
  date: string;
  size: number;
  maxScore: number;
  piPoints: number;
  closedAt: string;
  status: Status;
  topic: string;
}

const CreateTournamentModal: React.FC<CreateTournamentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [createTournament, { loading, error }] = useCreateTournamentMutation();

  // Set default dates that meet validation requirements
  const getDefaultDates = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0); // Set to 2:00 PM tomorrow

    // Set registration close to 1 hour before tournament start
    const closeDate = new Date(tomorrow);
    closeDate.setHours(13, 0, 0, 0); // Set to 1:00 PM tomorrow (1 hour before start)

    return {
      startDate: tomorrow.toISOString().slice(0, 16), // Format for datetime-local
      closeDate: closeDate.toISOString().slice(0, 16), // Format for datetime-local
    };
  };

  const defaultDates = getDefaultDates();

  const [formData, setFormData] = useState<TournamentFormData>({
    name: "",
    description: "",
    date: defaultDates.startDate,
    size: 8, // Default to 8 participants
    maxScore: 100, // Default max score
    piPoints: 1000, // Default pi points
    closedAt: defaultDates.closeDate,
    status: Status.Opening,
    topic: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tournament name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
    }

    if (!formData.date) {
      newErrors.date = "Start date is required";
    } else {
      const startDate = new Date(formData.date);
      const now = new Date();
      if (startDate <= now) {
        newErrors.date = "Start date must be in the future";
      }
    }

    if (!formData.closedAt) {
      newErrors.closedAt = "Registration close date is required";
    } else {
      const closeDate = new Date(formData.closedAt);
      const startDate = new Date(formData.date);
      if (closeDate >= startDate) {
        newErrors.closedAt = "Registration must close before tournament starts";
      }
    }

    if (formData.size <= 0) {
      newErrors.size = "Size must be greater than 0";
    }

    if (formData.maxScore <= 0) {
      newErrors.maxScore = "Max score must be greater than 0";
    }

    if (formData.piPoints < 0) {
      newErrors.piPoints = "Pi points cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof TournamentFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await createTournament({
        variables: {
          tournamentInput: {
            name: formData.name,
            description: formData.description,
            date: formData.date,
            size: formData.size,
            maxScore: formData.maxScore,
            piPoints: formData.piPoints,
            closedAt: formData.closedAt,
            status: formData.status,
            topic: formData.topic,
          },
        },
      });

      if (result.data?.createTournament?.success) {
        // Reset form with default values
        setFormData({
          name: "",
          description: "",
          date: defaultDates.startDate,
          size: 8,
          maxScore: 100,
          piPoints: 1000,
          closedAt: defaultDates.closeDate,
          status: Status.Opening,
          topic: "",
        });
        setErrors({});
        onSuccess?.();
        onClose();
      }
    } catch (err) {
      console.error("Error creating tournament:", err);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      date: defaultDates.startDate,
      size: 8,
      maxScore: 100,
      piPoints: 1000,
      closedAt: defaultDates.closeDate,
      status: Status.Opening,
      topic: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Tournament"
      description="Fill in the details to create a new tournament"
      size="md"
    >
      <ModalContent>
        <form
          id="tournament-form"
          onSubmit={handleSubmit}
          className="space-y-6 "
        >
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tournament Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter tournament name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => handleInputChange("topic", e.target.value)}
                  placeholder="e.g., Mathematics, Science, Programming"
                  className={errors.topic ? "border-red-500" : ""}
                />
                {errors.topic && (
                  <p className="text-sm text-red-500">{errors.topic}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the tournament, rules, and objectives"
                rows={3}
                className={`w-full px-3 py-2 border rounded-md resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Tournament Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              Tournament Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Max Participants *</Label>
                <Input
                  id="size"
                  type="number"
                  min="1"
                  value={formData.size || ""}
                  onChange={(e) =>
                    handleInputChange("size", parseInt(e.target.value) || 0)
                  }
                  placeholder="e.g., 100"
                  className={errors.size ? "border-red-500" : ""}
                />
                {errors.size && (
                  <p className="text-sm text-red-500">{errors.size}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxScore">Max Score *</Label>
                <Input
                  id="maxScore"
                  type="number"
                  min="1"
                  value={formData.maxScore || ""}
                  onChange={(e) =>
                    handleInputChange("maxScore", parseInt(e.target.value) || 0)
                  }
                  placeholder="e.g., 1000"
                  className={errors.maxScore ? "border-red-500" : ""}
                />
                {errors.maxScore && (
                  <p className="text-sm text-red-500">{errors.maxScore}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="piPoints">Pi Points Reward</Label>
                <Input
                  id="piPoints"
                  type="number"
                  min="0"
                  value={formData.piPoints || ""}
                  onChange={(e) =>
                    handleInputChange("piPoints", parseInt(e.target.value) || 0)
                  }
                  placeholder="e.g., 50"
                  className={errors.piPoints ? "border-red-500" : ""}
                />
                {errors.piPoints && (
                  <p className="text-sm text-red-500">{errors.piPoints}</p>
                )}
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Schedule
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Tournament Start Date *</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className={errors.date ? "border-red-500" : ""}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="closedAt">Registration Closes *</Label>
                <Input
                  id="closedAt"
                  type="datetime-local"
                  value={formData.closedAt}
                  onChange={(e) =>
                    handleInputChange("closedAt", e.target.value)
                  }
                  className={errors.closedAt ? "border-red-500" : ""}
                />
                {errors.closedAt && (
                  <p className="text-sm text-red-500">{errors.closedAt}</p>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-orange-500" />
              Status
            </h3>

            <div className="space-y-2">
              <Label htmlFor="status">Initial Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  handleInputChange("status", e.target.value as Status)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={Status.Opening}>
                  Opening (Registration Open)
                </option>
                <option value={Status.Ongoing}>
                  Ongoing (Tournament Active)
                </option>
                <option value={Status.Finished}>
                  Finished (Tournament Complete)
                </option>
              </select>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800 font-medium">
                Error creating tournament:
              </p>
              <p className="text-red-600 text-sm mt-1">{error.message}</p>
            </div>
          )}
        </form>
      </ModalContent>

      <ModalFooter>
        <Button
          type="submit"
          form="tournament-form"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating...
            </>
          ) : (
            <>
              <Trophy className="w-4 h-4" />
              Create Tournament
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

export default CreateTournamentModal;
