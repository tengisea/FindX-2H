"use client";

import { ClassYear, type CreateClassTypeInput } from "@/generated";

interface ClassTypeSectionProps {
  classTypes: CreateClassTypeInput[];
  onUpdateClassType: (index: number, field: string, value: any) => void;
  onAddClassType: () => void;
  onRemoveClassType: (index: number) => void;
  onAddQuestion: (classTypeIndex: number) => void;
  onRemoveQuestion: (classTypeIndex: number, questionIndex: number) => void;
  onUpdateQuestion: (
    classTypeIndex: number,
    questionIndex: number,
    field: string,
    value: any
  ) => void;
  editingOlympiad?: any;
}

export const ClassTypeSection = ({
  classTypes,
  onUpdateClassType,
  onAddClassType,
  onRemoveClassType,
  onAddQuestion,
  onRemoveQuestion,
  onUpdateQuestion,
  editingOlympiad,
}: ClassTypeSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h3 className="text-lg font-bold text-gray-900">
          Class Types & Questions
        </h3>
        {!editingOlympiad && (
          <button
            type="button"
            onClick={onAddClassType}
            className="bg-[#FF8400] text-white px-3 py-2 rounded-lg hover:bg-[#FF8400]/90 transition-all duration-200 flex items-center space-x-2 text-sm"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Add Class Type</span>
          </button>
        )}
      </div>

      {classTypes.map((classType, classTypeIndex) => (
        <div
          key={classTypeIndex}
          className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 relative overflow-hidden"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >

          <div className="flex items-center justify-between mb-3 pl-8">
            <h4 className="text-base font-semibold text-gray-900">
              Class Type {classTypeIndex + 1}
            </h4>
            {!editingOlympiad && classTypes.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveClassType(classTypeIndex)}
                className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Remove class type"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Class Type Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 pl-8">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Class Year
              </label>
              <select
                value={classType.classYear}
                onChange={(e) =>
                  onUpdateClassType(
                    classTypeIndex,
                    "classYear",
                    e.target.value as ClassYear,
                  )
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-200 text-gray-900 focus:outline-none"
                disabled={!!editingOlympiad}
              >
                <option value={ClassYear.Grade_1}>Grade 1</option>
                <option value={ClassYear.Grade_2}>Grade 2</option>
                <option value={ClassYear.Grade_3}>Grade 3</option>
                <option value={ClassYear.Grade_4}>Grade 4</option>
                <option value={ClassYear.Grade_5}>Grade 5</option>
                <option value={ClassYear.Grade_6}>Grade 6</option>
                <option value={ClassYear.Grade_7}>Grade 7</option>
                <option value={ClassYear.Grade_8}>Grade 8</option>
                <option value={ClassYear.Grade_9}>Grade 9</option>
                <option value={ClassYear.Grade_10}>Grade 10</option>
                <option value={ClassYear.Grade_11}>Grade 11</option>
                <option value={ClassYear.Grade_12}>Grade 12</option>
                <option value={ClassYear.CClass}>C Class</option>
                <option value={ClassYear.DClass}>D Class</option>
                <option value={ClassYear.EClass}>E Class</option>
                <option value={ClassYear.FClass}>F Class</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Occurring Time *
              </label>
              <input
                type="time"
                value={classType.occurringTime || "09:00"}
                onChange={(e) =>
                  onUpdateClassType(classTypeIndex, "occurringTime", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-200 text-gray-900 focus:outline-none"
                disabled={!!editingOlympiad}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Max Score
              </label>
              <input
                type="number"
                value={classType.maxScore || 0}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed text-sm"
                disabled={true}
                title="Max score is automatically calculated from the sum of all question scores"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Medalists
              </label>
              <input
                type="number"
                value={classType.medalists || 0}
                onChange={(e) => {
                  const value = e.target.value;
                  const numValue = value === "" ? 0 : parseInt(value) || 0;
                  onUpdateClassType(classTypeIndex, "medalists", numValue);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-200 text-gray-900 focus:outline-none"
                disabled={!!editingOlympiad}
                min="0"
              />
            </div>
          </div>

          {/* Questions */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 space-y-2 sm:space-y-0 pl-8">
              <h5 className="text-sm font-semibold text-gray-900">
                Questions
              </h5>
              {!editingOlympiad && (
                <button
                  type="button"
                  onClick={() => onAddQuestion(classTypeIndex)}
                  className="bg-[#FF8400] text-white px-2 py-1 rounded-lg hover:bg-[#FF8400]/90 transition-colors flex items-center space-x-1 text-xs"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add Question</span>
                </button>
              )}
            </div>

            <div className="space-y-2 pl-8">
              {classType.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-2 bg-gray-100 rounded-lg"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      value={question.questionName}
                      onChange={(e) =>
                        onUpdateQuestion(
                          classTypeIndex,
                          questionIndex,
                          "questionName",
                          e.target.value,
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm bg-white text-gray-900 focus:outline-none"
                      placeholder="Question name"
                      disabled={!!editingOlympiad}
                    />
                  </div>
                  <div className="w-full sm:w-16">
                    <input
                      type="number"
                      value={question.maxScore || 0}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue =
                          value === "" ? 0 : parseInt(value) || 0;
                        onUpdateQuestion(
                          classTypeIndex,
                          questionIndex,
                          "maxScore",
                          numValue,
                        );
                      }}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm bg-white text-gray-900 focus:outline-none"
                      placeholder="Score"
                      disabled={!!editingOlympiad}
                      min="0"
                    />
                  </div>
                  {!editingOlympiad && classType.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        onRemoveQuestion(classTypeIndex, questionIndex)
                      }
                      className="text-destructive hover:text-destructive/80 p-1 rounded hover:bg-destructive/10 transition-colors"
                      title="Remove question"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
