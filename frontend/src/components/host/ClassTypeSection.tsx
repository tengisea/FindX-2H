"use client";

import { ClassYear, type CreateClassTypeInput } from "@/generated";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="space-y-4 ">
      <div className="flex sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {classTypes.map((classType, classTypeIndex) => (
          <div
            key={classTypeIndex}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 relative overflow-hidden"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center justify-between mb-3 pl-1">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Анги
                </label>
                <Select
                  value={classType.classYear}
                  onValueChange={(value) =>
                    onUpdateClassType(
                      classTypeIndex,
                      "classYear",
                      value as ClassYear,
                    )
                  }
                  disabled={!!editingOlympiad}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Анги сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ClassYear.Grade_1}>1-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_2}>2-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_3}>3-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_4}>4-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_5}>5-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_6}>6-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_7}>7-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_8}>8-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_9}>9-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_10}>10-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_11}>11-р анги</SelectItem>
                    <SelectItem value={ClassYear.Grade_12}>12-р анги</SelectItem>
                    <SelectItem value={ClassYear.CClass}>C Class</SelectItem>
                    <SelectItem value={ClassYear.DClass}>D Class</SelectItem>
                    <SelectItem value={ClassYear.EClass}>E Class</SelectItem>
                    <SelectItem value={ClassYear.FClass}>F Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 pl-1 items-center justify-between">
              <div >
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Эхлэх цаг
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
                  Дээд оноо
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
                <label className="block text-xs font-medium text-gray-700  mb-1">
                  Медалийн тоо
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
              <div className="flex  sm:flex-row items-start sm:items-center justify-between mb-3 space-y-2 sm:space-y-0 pl-1">
                <h5 className="text-sm font-semibold text-gray-900">
                  Бодлого
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
                    <span>Бодлого  нэмэх</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 pl-1">
                {classType.questions.map((question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="flex flex-col space-y-2 p-3 bg-gray-100 rounded-lg"
                  >
                    <div>
                      <input
                        type="text"
                        disabled
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
                        placeholder="Бодлого "

                      />
                    </div>
                    <div className="flex items-center ">
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
                        className="flex-1 px-2 w-full py-1 border border-gray-200 rounded text-sm bg-white text-gray-900 focus:outline-none"
                        placeholder="Оноо"
                        disabled={!!editingOlympiad}
                        min="0"
                      />
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
                            className="w-4 h-4"
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
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
            <span>Анги нэмэх</span>
          </button>
        )}
      </div>
    </div>
  );
};
