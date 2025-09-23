"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  Image as ImageIcon,
  Trophy,
  Calendar,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentAnswerQuery } from "@/generated";
import { safeFormatDate } from "@/lib/dateUtils";

interface StudentAnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentAnswerId: string | null;
  studentName?: string;
}

const StudentAnswerModal: React.FC<StudentAnswerModalProps> = ({
  isOpen,
  onClose,
  studentAnswerId,
  studentName,
}) => {
  const { data, loading, error } = useStudentAnswerQuery({
    variables: { studentAnswerId: studentAnswerId || "" },
    skip: !studentAnswerId,
  });

  const studentAnswer = data?.studentAnswer;

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#FF8400]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#FF8400]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Дэлгэрэнгүй хариулт
                  </h2>
                  {studentName && (
                    <p className="text-base text-gray-600">{studentName}</p>
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="space-y-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                </div>
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Хэрэглэгчийн хариулт олдсонгүй
                </h3>
                <p className="text-gray-600">
                  {error.message || "Failed to load answer details"}
                </p>
              </div>
            ) : !studentAnswer ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Хэрэглэгчийн хариулт олдсонгүй
                </h3>
                <p className="text-gray-600">
                  The requested answer could not be found.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Answer Summary */}
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-800">
                      <Trophy className="w-5 h-5 text-orange-600" />
                      <span>Хариултын тойм</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-[#FF8400]/10 rounded-lg">
                        <div className="text-2xl font-bold text-[#FF8400]">
                          {studentAnswer.totalScoreofOlympiad || 0}
                        </div>
                        <div className="text-base text-orange-600">
                          Нийт дүн
                        </div>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">
                          {studentAnswer.answers?.length || 0}
                        </div>
                        <div className="text-base text-blue-500">Асуултууд</div>
                      </div>
                      <div className="text-center p-4 bg-green-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-green-500">
                          {studentAnswer.mandatNumber}
                        </div>
                        <div className="text-base text-green-500">
                          Мандатын дугаар
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4 text-base text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Оруулсан огноо:{" "}
                          {safeFormatDate(studentAnswer.createdAt)}
                        </span>
                      </div>
                      {studentAnswer.updatedAt !== studentAnswer.createdAt && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Засварласан огноо:{" "}
                            {safeFormatDate(studentAnswer.updatedAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Submitted Images */}
                {studentAnswer.image && studentAnswer.image.length > 0 && (
                  <Card className="bg-white border border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-gray-800">
                        <ImageIcon className="w-5 h-5 text-orange-600" />
                        <span>Оруулсан зураг</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {studentAnswer.image.map((imageUrl, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                          >
                            <img
                              src={imageUrl}
                              alt={`Submission ${index + 1}`}
                              className="w-full h-auto rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const nextElement = e.currentTarget
                                  .nextElementSibling as HTMLElement;
                                if (nextElement) {
                                  nextElement.style.display = "flex";
                                }
                              }}
                            />
                            <div className="hidden w-full h-32 bg-gray-200 rounded-lg border border-gray-200 items-center justify-center text-gray-600 text-base">
                              Зураг оруулж чадсангүй
                            </div>
                            <div className="absolute top-2 right-2 bg-gray-800/80 text-white text-sm px-2 py-1 rounded">
                              {index + 1}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Individual Answers */}
                {studentAnswer.answers && studentAnswer.answers.length > 0 && (
                  <Card className="bg-white border border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-gray-800">
                        <FileText className="w-5 h-5 text-orange-600" />
                        <span>Асуултын хариултууд</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {studentAnswer.answers.map((answer, index) => (
                          <motion.div
                            key={answer.questionId || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-200/30 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-[#FF8400]/10 flex items-center justify-center">
                                  <span className="text-base font-bold text-[#FF8400]">
                                    {index + 1}
                                  </span>
                                </div>
                                <span className="font-semibold text-gray-800">
                                  Асуулт {index + 1}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-base text-gray-600">
                                  Дүн:
                                </span>
                                <span className="text-lg font-bold text-orange-600">
                                  {answer.score || 0} оноо
                                </span>
                              </div>
                            </div>
                            {answer.description && (
                              <div className="mt-3">
                                <h4 className="text-base font-medium text-gray-600 mb-2">
                                  Тайлбар:
                                </h4>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <p className="text-gray-800 whitespace-pre-wrap">
                                    {answer.description}
                                  </p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* No answers message */}
                {(!studentAnswer.answers ||
                  studentAnswer.answers.length === 0) &&
                  (!studentAnswer.image ||
                    studentAnswer.image.length === 0) && (
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Бүрэн дэлгэрэнгүй хариултууд олдсонгүй
                        </h3>
                        <p className="text-gray-600">
                          Бүрэн дэлгэрэнгүй хариултууд эсвэл зураг оруулж
                          чадсангүй
                        </p>
                      </CardContent>
                    </Card>
                  )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StudentAnswerModal;
