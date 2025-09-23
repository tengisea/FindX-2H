"use client";

import { useState, useEffect } from "react";
import {
  useUpdateOlympiadComprehensiveMutation,
  useUpdateOlympiadMutation,
  useDeleteClassTypeMutation,
  useAllClassRoomsQuery,
  Olympiad,
  ClassYear,
  OlympiadRankingType,
  OlympiadStatus
} from "@/generated";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OlympiadEditModalProps {
  olympiad: Olympiad | null;
  isOpen: boolean;
  onClose: () => void;
  onRefetch: () => void;
}

export const OlympiadEditModal = ({
  olympiad,
  isOpen,
  onClose,
  onRefetch,
}: OlympiadEditModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    closeDay: "",
    occurringDay: "",
    rankingType: OlympiadRankingType.School,
    invitation: false,
    status: OlympiadStatus.Draft,
  });

  const [classTypes, setClassTypes] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updateOlympiadComprehensive] = useUpdateOlympiadComprehensiveMutation();
  const [updateOlympiad] = useUpdateOlympiadMutation();
  const [deleteClassType] = useDeleteClassTypeMutation();
  const { data: classRoomsData } = useAllClassRoomsQuery();

  useEffect(() => {
    if (olympiad) {
      setFormData({
        name: olympiad.name,
        description: olympiad.description || "",
        location: olympiad.location,
        closeDay: olympiad.closeDay ? new Date(olympiad.closeDay).toISOString().split('T')[0] : "",
        occurringDay: olympiad.occurringDay ? new Date(olympiad.occurringDay).toISOString().split('T')[0] : "",
        rankingType: olympiad.rankingType || OlympiadRankingType.School,
        invitation: olympiad.invitation || false,
        status: olympiad.status,
      });

      // Convert classtypes to editable format
      const editableClassTypes = olympiad.classtypes?.map(ct => {
        const questions = ct.questions?.map((q, index) => ({
          id: q.id,
          questionName: q.questionName?.startsWith('Question') || q.questionName?.startsWith('Бодлого') ? `Бодлого ${index + 1}` : q.questionName,
          maxScore: q.maxScore,
        })) || [];

        // Calculate maxScore from questions
        const calculatedMaxScore = questions.reduce(
          (sum: number, question: any) => {
            const score = Number(question.maxScore) || 0;
            return sum + score;
          },
          0,
        );

        return {
          id: ct.id,
          classYear: ct.classYear,
          maxScore: calculatedMaxScore, // Use calculated value instead of stored value
          occurringTime: ct.occurringTime || "",
          medalists: ct.medalists,
          questions: questions,
        };
      }) || [];

      setClassTypes(editableClassTypes);
    }
  }, [olympiad]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!olympiad) return;

    setIsSubmitting(true);
    try {
      // Use comprehensive update since we need to update the name field
      const updateInput: any = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        rankingType: formData.rankingType,
        invitation: formData.invitation,
        status: formData.status,
      };
      // Handle dates - include them even if empty to clear null values
      if (formData.closeDay) {
        const closeDate = new Date(formData.closeDay);
        if (!isNaN(closeDate.getTime())) {
          updateInput.closeDay = closeDate.toISOString();
        }
      } else {
        // If closeDay is empty, set it to null to clear the existing null value
        updateInput.closeDay = null;
      }

      if (formData.occurringDay) {
        const occurringDate = new Date(formData.occurringDay);
        if (!isNaN(occurringDate.getTime())) {
          updateInput.occurringDay = occurringDate.toISOString();
        }
      } else {
        // If occurringDay is empty, set it to null to clear the existing null value
        updateInput.occurringDay = null;
      }

      // Add classTypes for comprehensive update
      const classTypesData = classTypes.map((ct) => ({
        id: ct.id,
        classYear: ct.classYear,
        maxScore: ct.maxScore,
        occurringTime: ct.occurringTime,
        medalists: ct.medalists,
        questions: ct.questions.map((q: any) => ({
          id: q.id,
          questionName: q.questionName,
          maxScore: q.maxScore,
        })),
      }));

      updateInput.classTypes = classTypesData;

      console.log("Update input:", updateInput);
      console.log("Form data:", formData);
      console.log("Individual field values:", {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        rankingType: formData.rankingType,
        invitation: formData.invitation,
        status: formData.status,
        closeDay: formData.closeDay,
        occurringDay: formData.occurringDay
      });

      // Use comprehensive update mutation since we need to update the name field
      await updateOlympiadComprehensive({
        variables: {
          updateOlympiadComprehensiveId: olympiad.id,
          input: updateInput,
        },
      });
      onRefetch();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error details:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const addClassType = () => {
    setClassTypes([...classTypes, {
      classYear: ClassYear.Grade_1,
      maxScore: 100,
      occurringTime: "9:00",
      medalists: 3,
      questions: [],
    }]);
  };

  const removeClassType = async (index: number) => {
    const classTypeToRemove = classTypes[index];

    // If the classtype has an ID, delete it from the database
    if (classTypeToRemove.id) {
      try {
        await deleteClassType({
          variables: {
            deleteClassTypeId: classTypeToRemove.id
          }
        });
        console.log(`✅ Deleted ClassType: ${classTypeToRemove.id}`);
      } catch (error) {
        console.error("Error deleting classtype:", error);
        // Still remove from local state even if database deletion fails
      }
    }

    // Remove from local state
    setClassTypes(classTypes.filter((_, i) => i !== index));
  };

  const updateClassType = (index: number, field: string, value: any) => {
    const updated = [...classTypes];
    updated[index] = { ...updated[index], [field]: value };
    setClassTypes(updated);
  };

  const addQuestion = (classTypeIndex: number) => {
    const updated = [...classTypes];
    updated[classTypeIndex].questions.push({
      questionName: `Бодлого ${updated[classTypeIndex].questions.length + 1}`,
      maxScore: 5,
    });

    // Calculate total maxScore from all questions
    const totalMaxScore = updated[classTypeIndex].questions.reduce(
      (sum: number, question: any) => {
        const score = Number(question.maxScore) || 0;
        return sum + score;
      },
      0,
    );
    updated[classTypeIndex].maxScore = totalMaxScore;

    setClassTypes(updated);
  };

  const removeQuestion = (classTypeIndex: number, questionIndex: number) => {
    const updated = [...classTypes];
    updated[classTypeIndex].questions = updated[classTypeIndex].questions.filter((_: any, i: number) => i !== questionIndex);

    // Calculate total maxScore from all questions
    const totalMaxScore = updated[classTypeIndex].questions.reduce(
      (sum: number, question: any) => {
        const score = Number(question.maxScore) || 0;
        return sum + score;
      },
      0,
    );
    updated[classTypeIndex].maxScore = totalMaxScore;

    setClassTypes(updated);
  };

  const updateQuestion = (classTypeIndex: number, questionIndex: number, field: string, value: any) => {
    const updated = [...classTypes];
    updated[classTypeIndex].questions[questionIndex] = {
      ...updated[classTypeIndex].questions[questionIndex],
      [field]: value,
    };

    // If maxScore was updated, recalculate total maxScore
    if (field === "maxScore") {
      const totalMaxScore = updated[classTypeIndex].questions.reduce(
        (sum: number, question: any) => {
          const score = Number(question.maxScore) || 5;
          return sum + score;
        },
        0,
      );
      updated[classTypeIndex].maxScore = totalMaxScore;
    }

    setClassTypes(updated);
  };

  const getClassYearDisplay = (classYear: ClassYear) => {
    const yearMap: { [key in ClassYear]: string } = {
      [ClassYear.Grade_1]: "1-р анги",
      [ClassYear.Grade_2]: "2-р анги",
      [ClassYear.Grade_3]: "3-р анги",
      [ClassYear.Grade_4]: "4-р анги",
      [ClassYear.Grade_5]: "5-р анги",
      [ClassYear.Grade_6]: "6-р анги",
      [ClassYear.Grade_7]: "7-р анги",
      [ClassYear.Grade_8]: "8-р анги",
      [ClassYear.Grade_9]: "9-р анги",
      [ClassYear.Grade_10]: "10-р анги",
      [ClassYear.Grade_11]: "11-р анги",
      [ClassYear.Grade_12]: "12-р анги",
      [ClassYear.CClass]: "C Class",
      [ClassYear.DClass]: "D Class",
      [ClassYear.EClass]: "E Class",
      [ClassYear.FClass]: "F Class",
    };
    return yearMap[classYear] || classYear;
  };

  if (!isOpen || !olympiad) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black rounded-2xl shadow-2xl border border-gray-300 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Олимпиад засах</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-black transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Олимпиадын нэр *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black"
                  placeholder="Олимпиадын нэр оруулна уу"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Байршил
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black"
                  placeholder="Олимпиадын байршил оруулна уу"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Бүртгэл хаагдах огноо
                </label>
                <input
                  type="date"
                  value={formData.closeDay}
                  onChange={(e) => setFormData({ ...formData, closeDay: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Олимпиад болох огноо
                </label>
                <input
                  type="date"
                  value={formData.occurringDay}
                  onChange={(e) => setFormData({ ...formData, occurringDay: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Олимпиадын түвшин *
                </label>
                <Select
                  value={formData.rankingType}
                  onValueChange={(value) => setFormData({ ...formData, rankingType: value as OlympiadRankingType })}
                >
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black">
                    <SelectValue placeholder="Олимпиадын түвшин сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={OlympiadRankingType.School}>Сургууль</SelectItem>
                    <SelectItem value={OlympiadRankingType.District}>Аймаг/Дүүрэг</SelectItem>
                    <SelectItem value={OlympiadRankingType.Regional}>Бүс</SelectItem>
                    <SelectItem value={OlympiadRankingType.National}>Улс</SelectItem>
                    <SelectItem value={OlympiadRankingType.ATier}>A зэрэглэл</SelectItem>
                    <SelectItem value={OlympiadRankingType.BTier}>B зэрэглэл</SelectItem>
                    <SelectItem value={OlympiadRankingType.CTier}>C зэрэглэл</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Төлөв
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as OlympiadStatus })}
                >
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black">
                    <SelectValue placeholder="Төлөв сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={OlympiadStatus.Draft}>Идэвхгүй</SelectItem>
                    <SelectItem value={OlympiadStatus.UnderReview}>Шалгагдаж байна</SelectItem>
                    <SelectItem value={OlympiadStatus.Open}>Нээлттэй</SelectItem>
                    <SelectItem value={OlympiadStatus.Closed}>Хаалттай</SelectItem>
                    <SelectItem value={OlympiadStatus.Finished}>Дууссан</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Дэлгэрэнгүй тайлбар
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black"
                placeholder="Олимпиадын тайлбар оруулна уу"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="invitation"
                checked={formData.invitation}
                onChange={(e) => setFormData({ ...formData, invitation: e.target.checked })}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <label htmlFor="invitation" className="text-sm font-medium text-black">
                Хаалттай олимпиад болгох уу?
              </label>
            </div>

            {/* Class Types */}
            <div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {classTypes.map((classType, classTypeIndex) => (
                  <div key={classTypeIndex} className="border border-gray-300 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Анги *
                        </label>
                        <Select
                          value={classType.classYear}
                          onValueChange={(value) => updateClassType(classTypeIndex, 'classYear', value as ClassYear)}
                        >
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black">
                            <SelectValue placeholder="Анги сонгоно уу" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ClassYear).map((year) => (
                              <SelectItem key={year} value={year}>
                                {getClassYearDisplay(year)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeClassType(classTypeIndex)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 mb-4">

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Дээд оноо
                        </label>
                        <input
                          type="number"
                          value={classType.maxScore}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                          disabled={true}
                          title="Дээд оноо нь бүх бодлогын онооны нийлбэрээр автоматаар тооцогдоно"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Эхлэх цаг
                        </label>
                        <input
                          type="time"
                          value={classType.occurringTime}
                          onChange={(e) => updateClassType(classTypeIndex, 'occurringTime', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Медал
                        </label>
                        <input
                          type="number"
                          value={classType.medalists || 0}
                          onChange={(e) => updateClassType(classTypeIndex, 'medalists', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black"
                          min="0"
                        />
                      </div>
                    </div>


                    {/* Questions */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-black">Бодлого</h5>
                        <button
                          type="button"
                          onClick={() => addQuestion(classTypeIndex)}
                          className="px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        >
                          Бодлого нэмэх
                        </button>
                      </div>

                      <div className="space-y-2">
                        {classType.questions.map((question: any, questionIndex: number) => (
                          <div key={questionIndex} className="flex items-center space-x-2">
                            <input
                              type="text"
                              placeholder="Бодлого"
                              value={question.questionName}
                              onChange={(e) => updateQuestion(classTypeIndex, questionIndex, 'questionName', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black"
                            />
                            <input
                              type="number"
                              placeholder="Оноо"
                              value={question.maxScore || ''}
                              onChange={(e) => updateQuestion(classTypeIndex, questionIndex, 'maxScore', parseInt(e.target.value) || 0)}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-black"
                            />
                            <button
                              type="button"
                              onClick={() => removeQuestion(classTypeIndex, questionIndex)}
                              className="text-destructive hover:text-destructive/80 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end mt-4">
                <button
                  type="button"
                  onClick={addClassType}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Анги нэмэх
                </button>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-300">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-black rounded-lg hover:bg-accent transition-colors"
              >
                Цуцлах
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Шинэчилж байна..." : " Шинэчлэх"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}