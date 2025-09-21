"use client";

import { useState, useEffect } from "react";
import { 
  useUpdateOlympiadComprehensiveMutation,
  useGetAllClassRoomsQuery,
  Olympiad,
  ClassYear,
  OlympiadRankingType,
  OlympiadStatus
} from "@/generated";

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
  const { data: classRoomsData } = useGetAllClassRoomsQuery();

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
        const questions = ct.questions?.map(q => ({
          id: q.id,
          questionName: q.questionName,
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
          classRoom: ct.classRoom?.id || null,
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
      await updateOlympiadComprehensive({
        variables: {
          id: olympiad.id,
        input: {
          ...formData,
          location: formData.location,
          closeDay: formData.closeDay ? new Date(formData.closeDay).toISOString() : null,
          occurringDay: formData.occurringDay ? new Date(formData.occurringDay).toISOString() : null,
          classTypes: classTypes.map(ct => ({
            id: ct.id,
            classYear: ct.classYear,
            maxScore: ct.maxScore,
            occurringTime: ct.occurringTime,
            classRoom: ct.classRoom,
            medalists: ct.medalists,
            questions: ct.questions.map(q => ({
              id: q.id,
              questionName: q.questionName,
              maxScore: q.maxScore,
            })),
          })),
        },
        },
      });
      onRefetch();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addClassType = () => {
    setClassTypes([...classTypes, {
      classYear: ClassYear.Grade_1,
      maxScore: 100,
      occurringTime: "9:00",
      classRoom: null,
      medalists: 3,
      questions: [],
    }]);
  };

  const removeClassType = (index: number) => {
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
      questionName: `Question${updated[classTypeIndex].questions.length + 1}`,
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
    updated[classTypeIndex].questions = updated[classTypeIndex].questions.filter((_, i) => i !== questionIndex);
    
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
          const score = Number(question.maxScore) || 0;
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
      [ClassYear.Grade_1]: "Grade 1",
      [ClassYear.Grade_2]: "Grade 2",
      [ClassYear.Grade_3]: "Grade 3",
      [ClassYear.Grade_4]: "Grade 4",
      [ClassYear.Grade_5]: "Grade 5",
      [ClassYear.Grade_6]: "Grade 6",
      [ClassYear.Grade_7]: "Grade 7",
      [ClassYear.Grade_8]: "Grade 8",
      [ClassYear.Grade_9]: "Grade 9",
      [ClassYear.Grade_10]: "Grade 10",
      [ClassYear.Grade_11]: "Grade 11",
      [ClassYear.Grade_12]: "Grade 12",
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
      <div className="bg-background rounded-2xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Edit Olympiad</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  Olympiad Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Registration Close Date
                </label>
                <input
                  type="date"
                  value={formData.closeDay}
                  onChange={(e) => setFormData({ ...formData, closeDay: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Olympiad Date
                </label>
                <input
                  type="date"
                  value={formData.occurringDay}
                  onChange={(e) => setFormData({ ...formData, occurringDay: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ranking Type *
                </label>
                <select
                  value={formData.rankingType}
                  onChange={(e) => setFormData({ ...formData, rankingType: e.target.value as OlympiadRankingType })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                >
                  <option value={OlympiadRankingType.School}>School Level</option>
                  <option value={OlympiadRankingType.District}>District Level</option>
                  <option value={OlympiadRankingType.Regional}>Regional Level</option>
                  <option value={OlympiadRankingType.National}>National Level</option>
                  <option value={OlympiadRankingType.ATier}>A Tier</option>
                  <option value={OlympiadRankingType.BTier}>B Tier</option>
                  <option value={OlympiadRankingType.CTier}>C Tier</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as OlympiadStatus })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                >
                  <option value={OlympiadStatus.Draft}>Draft</option>
                  <option value={OlympiadStatus.UnderReview}>Under Review</option>
                  <option value={OlympiadStatus.Open}>Open</option>
                  <option value={OlympiadStatus.Closed}>Closed</option>
                  <option value={OlympiadStatus.Finished}>Finished</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
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
              <label htmlFor="invitation" className="text-sm font-medium text-foreground">
                Send invitations to students
              </label>
            </div>

            {/* Class Types */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Class Types</h3>
                <button
                  type="button"
                  onClick={addClassType}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Class Type
                </button>
              </div>

              <div className="space-y-4">
                {classTypes.map((classType, classTypeIndex) => (
                  <div key={classTypeIndex} className="border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-foreground">
                        Class Type {classTypeIndex + 1}
                      </h4>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Class Year *
                        </label>
                        <select
                          value={classType.classYear}
                          onChange={(e) => updateClassType(classTypeIndex, 'classYear', e.target.value as ClassYear)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                          required
                        >
                          {Object.values(ClassYear).map((year) => (
                            <option key={year} value={year}>
                              {getClassYearDisplay(year)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Max Score *
                        </label>
                        <input
                          type="number"
                          value={classType.maxScore}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                          disabled={true}
                          title="Max score is automatically calculated from the sum of all question scores"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Occurring Time
                        </label>
                        <input
                          type="time"
                          value={classType.occurringTime}
                          onChange={(e) => updateClassType(classTypeIndex, 'occurringTime', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Class Room
                        </label>
                        <select
                          value={classType.classRoom || ""}
                          onChange={(e) => updateClassType(classTypeIndex, 'classRoom', e.target.value || null)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                        >
                          <option value="">No room assigned</option>
                          {classRoomsData?.allClassRooms?.map((room) => (
                            <option key={room.id} value={room.id}>
                              {room.roomNumber}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Questions */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-foreground">Questions</h5>
                        <button
                          type="button"
                          onClick={() => addQuestion(classTypeIndex)}
                          className="px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        >
                          Add Question
                        </button>
                      </div>

                      <div className="space-y-2">
                        {classType.questions.map((question, questionIndex) => (
                          <div key={questionIndex} className="flex items-center space-x-2">
                            <input
                              type="text"
                              placeholder="Question name"
                              value={question.questionName}
                              onChange={(e) => updateQuestion(classTypeIndex, questionIndex, 'questionName', e.target.value)}
                              className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                            />
                            <input
                              type="number"
                              placeholder="Max score"
                              value={question.maxScore}
                              onChange={(e) => updateQuestion(classTypeIndex, questionIndex, 'maxScore', parseInt(e.target.value))}
                              className="w-24 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
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
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Updating..." : "Update Olympiad"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};