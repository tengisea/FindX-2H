"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Trophy, Target } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClassType {
  id: string;
  classYear: string;
  questions: Array<{
    id: string;
    questionName: string;
    maxScore: number;
  }>;
  maxScore: number;
}

interface Olympiad {
  id: string;
  name: string;
  classtypes: ClassType[];
}

interface GradeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  olympiad: Olympiad | null;
  availableGrades: ClassType[];
  selectedClassType: ClassType | null;
  onSelectClassType: (classType: ClassType) => void;
  onRegister: () => void;
  registering: boolean;
}

const GradeSelectionModal: React.FC<GradeSelectionModalProps> = ({
  isOpen,
  onClose,
  olympiad,
  availableGrades,
  selectedClassType,
  onSelectClassType,
  onRegister,
  registering,
}) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (!olympiad) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <CardHeader className="bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                    Select Grade Level
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-base text-gray-600">
                    <Trophy className="w-4 h-4 text-[#FF8400]" />
                    <span className="font-medium">{olympiad.name}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="bg-[#FF8400]/10 border border-[#FF8400]/20 rounded-xl p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#FF8400]">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-800 mb-1">
                        Important
                      </h4>
                      <p className="text-base text-gray-600">
                        Choose the grade level you want to register for. Make
                        sure to select the appropriate level based on your
                        current grade.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {availableGrades.length > 0 ? (
                <div className="space-y-4">
                  {availableGrades.map((classType, index) => (
                    <motion.div
                      key={classType.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                        selectedClassType?.id === classType.id
                          ? "shadow-lg border-[#FF8400] bg-[#FF8400]/10"
                          : "border-gray-200 hover:border-[#FF8400]/30 hover:shadow-md"
                      }`}
                      onClick={() => onSelectClassType(classType)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                selectedClassType?.id === classType.id
                                  ? "bg-[#FF8400]"
                                  : "bg-gray-200"
                              }`}
                            >
                              {selectedClassType?.id === classType.id ? (
                                <CheckCircle className="w-5 h-5 text-white" />
                              ) : (
                                <Target className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                            <h5 className="text-xl font-semibold text-gray-800">
                              {classType.classYear.replace("GRADE_", "Grade ")}
                            </h5>
                          </div>
                          <div className="flex items-center space-x-4 text-base text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Trophy className="w-4 h-4" />
                              <span>
                                {classType.questions.length} questions
                              </span>
                            </span>
                            <span>Max Score: {classType.maxScore}</span>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedClassType?.id === classType.id
                              ? "border-[#FF8400] bg-[#FF8400]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedClassType?.id === classType.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>

                      {classType.questions.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h6 className="text-base font-medium text-gray-800 mb-2">
                            Sample Questions:
                          </h6>
                          <div className="space-y-2">
                            {classType.questions.slice(0, 3).map((question) => (
                              <div
                                key={question.id}
                                className="flex justify-between items-center text-base"
                              >
                                <span className="text-gray-600">
                                  • {question.questionName}
                                </span>
                                <span className="text-base text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                  {question.maxScore} pts
                                </span>
                              </div>
                            ))}
                            {classType.questions.length > 3 && (
                              <div className="text-base text-gray-600">
                                ... and {classType.questions.length - 3} more
                                questions
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Available Grades
                  </h3>
                  <p className="text-gray-600 text-lg">
                    There are no available grade levels for your current level.
                  </p>
                </div>
              )}
            </CardContent>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRegister}
                  disabled={!selectedClassType || registering}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-[#FF8400] text-white rounded-xl font-medium hover:bg-[#FF8400]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  <Trophy className="w-5 h-5" />
                  <span>{registering ? "Registering..." : "Register"}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GradeSelectionModal;
