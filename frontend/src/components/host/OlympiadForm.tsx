"use client";

import { ClassTypeSection } from "./ClassTypeSection";
import { type CreateClassTypeInput } from "@/generated";

interface FormData {
  name: string;
  description: string;
  date: string;
  location: string;
  organizerId: string;
}

interface OlympiadFormProps {
  formData: FormData;
  classTypes: CreateClassTypeInput[];
  editingOlympiad?: any;
  onSubmit: (e: React.FormEvent) => void;
  onUpdateFormData: (field: string, value: string) => void;
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
  onResetForm: () => void;
  isSubmitting: boolean;
}

export const OlympiadForm = ({
  formData,
  classTypes,
  editingOlympiad,
  onSubmit,
  onUpdateFormData,
  onUpdateClassType,
  onAddClassType,
  onRemoveClassType,
  onAddQuestion,
  onRemoveQuestion,
  onUpdateQuestion,
  onResetForm,
  isSubmitting,
}: OlympiadFormProps) => {
  return (
    <div className=" w-full">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {editingOlympiad ? "Edit Olympiad" : "Create New Olympiad"}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {editingOlympiad
              ? "Update your olympiad details and class types"
              : "Fill in the details to request a new olympiad event"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column - Basic Information */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Olympiad Details</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Olympiad Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => onUpdateFormData("name", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#4741A6] focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter olympiad name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => onUpdateFormData("date", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#4741A6] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => onUpdateFormData("description", e.target.value)}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#4741A6] focus:border-transparent resize-none text-sm sm:text-base"
                  placeholder="Describe the olympiad event..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => onUpdateFormData("location", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#4741A6] focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter event location"
                  required
                />
              </div>
            </div>

            {/* Right Column - Class Types Section */}
            <div>
              <ClassTypeSection
                classTypes={classTypes}
                onUpdateClassType={onUpdateClassType}
                onAddClassType={onAddClassType}
                onRemoveClassType={onRemoveClassType}
                onAddQuestion={onAddQuestion}
                onRemoveQuestion={onRemoveQuestion}
                onUpdateQuestion={onUpdateQuestion}
                editingOlympiad={editingOlympiad}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
            <button
              type="button"
              onClick={onResetForm}
              className="px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
              disabled={isSubmitting}
            >
              Reset Form
            </button>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {editingOlympiad && (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4741A6] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-[#9BBBFC] hover:to-[#4741A6] transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      {editingOlympiad ? "Update Olympiad" : "Request Olympiad"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
