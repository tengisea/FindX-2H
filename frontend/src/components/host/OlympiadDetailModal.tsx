"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  BookOpen,
  Award,
  Building,
  Mail,
} from "lucide-react";
import { GetOlympiadDocument, ClassYear } from "@/generated";

interface OlympiadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  olympiadId: string;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid Date";
  }
};

const formatTime = (timeString: string | null) => {
  if (!timeString) return "N/A";
  return timeString;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-green-100 text-green-800 border-green-200";
    case "CLOSED":
      return "bg-red-100 text-red-800 border-red-200";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "FINISHED":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "OPEN":
      return "Open";
    case "CLOSED":
      return "Closed";
    case "PENDING":
      return "Pending";
    case "FINISHED":
      return "Finished";
    default:
      return status;
  }
};

const formatClassYear = (classYear: string) => {
  return classYear.replace("GRADE_", "Grade ").replace("_CLASS", " Class");
};

export const OlympiadDetailModal = ({
  isOpen,
  onClose,
  olympiadId,
}: OlympiadDetailModalProps) => {
  const { data, loading, error } = useQuery(GetOlympiadDocument, {
    variables: { olympiadId },
    skip: !isOpen || !olympiadId,
  });

  const olympiad = data?.olympiad;

  if (loading) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Olympiad Details"
        size="lg"
      >
        <div className="flex items-center justify-center  py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-card"></div>
          <span className="ml-2 text-gray-300">Loading...</span>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Olympiad Details"
        size="lg"
      >
        <div className="text-center py-8">
          <p className="text-red-500">
            Error loading olympiad details: {error.message}
          </p>
        </div>
      </Modal>
    );
  }

  if (!olympiad) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Olympiad Details"
        size="lg"
      >
        <div className="text-center py-8 bg-card">
          <p className="text-gray-300">Olympiad not found</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Olympiad Details" size="lg">
      <div className="">
        {/* Header Section */}
        <div className="flex items-start justify-between bg-[#1a1a1a] p-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{olympiad.name}</h2>
            <p className="text-gray-300 leading-relaxed ">
              {olympiad.description}
            </p>
          </div>
        </div>

        <div className="bg-[#1a1a1a]  p-4">
          <h3 className="text-sm font-medium text-white flex items-center space-x-2 mb-3">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span>Class Types</span>
          </h3>
          <div className="space-y-3">
            {olympiad.classtypes?.map((classType: any, index: number) => (
              <div
                key={classType.id}
                className="border-2 rounded-lg border-gray-600 pl-3  p-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">
                    {formatClassYear(classType.classYear)}
                  </h4>
                  <div className="flex items-center space-x-3 text-xs text-gray-300">
                    <span>{classType.medalists} medalists</span>
                    <span>
                      {classType.participants?.length || 0} participants
                    </span>
                    <span>{formatTime(classType.occurringTime)}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 mb-2">
                  Max Score:{" "}
                  <span className="text-white font-medium">
                    {classType.maxScore}
                  </span>
                </p>
                {classType.questions && classType.questions.length > 0 && (
                  <div className="grid grid-cols-2 gap-1">
                    {classType.questions.map(
                      (question: any, qIndex: number) => (
                        <div
                          key={question.id}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-gray-300">
                            {question.questionName}
                          </span>
                          <span className="text-gray-400">
                            {question.maxScore} pts
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-[#1a1a1a]  p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Registration Deadline</p>
                <p className="text-sm text-white font-medium">
                  {formatDate(olympiad.closeDay)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Event Date</p>
                <p className="text-sm text-white font-medium">
                  {formatDate(olympiad.occurringDay)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-sm text-white font-medium">
                  {olympiad.location || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Participants</p>
                <p className="text-sm text-white font-medium">
                  {olympiad.classtypes?.reduce(
                    (total: number, ct: any) => total + (ct.participants?.length || 0),
                    0
                  ) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Types */}
      </div>
    </Modal>
  );
};
