"use client";

import { useState } from "react";
import Stepper, { Step } from "../ui/Stepper";
import { ClassTypeSection } from "./ClassTypeSection";
import { CustomDateTimePicker } from "../ui/custom-date-picker";
import {
  type CreateClassTypeInput,
  type CreateOlympiadRequestInput,
  useCreateOlympiadMutation,
  OlympiadRankingType,
} from "@/generated";
import { useAlert } from "@/components/ui/alert-system";

interface FormData {
  name: string;
  description: string;
  closeDay: Date | undefined;
  occurringDay: Date | undefined;
  location: string;
  organizerId: string;
  invitation: boolean;
  rankingType: OlympiadRankingType;
}

interface OlympiadFormProps {
  formData: FormData;
  classTypes: CreateClassTypeInput[];
  editingOlympiad?: any;
  onSubmit: (e: React.FormEvent) => void;
  onUpdateFormData: (
    field: string,
    value: string | boolean | Date | undefined
  ) => void;
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
  onRefetch?: () => void;
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
  onRefetch,
}: OlympiadFormProps) => {
  const { showSuccess, showError, showWarning } = useAlert();
  const [createOlympiad, { loading: mutationLoading, error: mutationError }] =
    useCreateOlympiadMutation();
  const [currentStep, setCurrentStep] = useState(1);

  const handleFinalSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.description || !formData.location) {
      showWarning("Please fill in all required fields.", "Validation Error");
      return;
    }

    if (classTypes.length === 0) {
      showWarning("Please add at least one class type.", "Validation Error");
      return;
    }

    // Validate class types have questions
    for (const classType of classTypes) {
      if (classType.questions.length === 0) {
        showWarning(
          "Each class type must have at least one question.",
          "Validation Error"
        );
        return;
      }
    }

    try {
      // Filter out classRoom field from classTypes as it's not part of CreateClassTypeInput
      const cleanedClassTypes = classTypes.map((classType: any) => {
        const { classRoom, ...cleanedClassType } = classType;
        return cleanedClassType;
      });

      const input: CreateOlympiadRequestInput = {
        name: formData.name,
        description: formData.description,
        closeDay: formData.closeDay?.toISOString() || null,
        occurringDay: formData.occurringDay?.toISOString() || null,
        location: formData.location,
        organizerId: formData.organizerId,
        invitation: formData.invitation,
        rankingType: formData.rankingType,
        classtypes: cleanedClassTypes,
      };

      console.log("Submitting olympiad with input:", input);

      const result = await createOlympiad({
        variables: { input },
      });

      if (result.data?.createOlympiad) {
        showSuccess("Olympiad created successfully!", "Success");
        onResetForm();
        setCurrentStep(1);
        // Refetch data to show the new olympiad
        if (onRefetch) {
          onRefetch();
        }
      }
    } catch (error) {
      console.error("Error creating olympiad:", error);
      showError(
        `Failed to create olympiad: ${error instanceof Error ? error.message : "Unknown error"
        }`,
        "Creation Failed"
      );
    }
  };

  return (
    <div className="w-full">
      <Stepper
        initialStep={currentStep}
        onStepChange={(step) => {
          setCurrentStep(step);
        }}
        onFinalStepCompleted={handleFinalSubmit}
        backButtonText="Өмнөх"
        nextButtonText="Дараах"
        nextButtonProps={{
          disabled: mutationLoading,
        }}
      >
        {/* Step 1: Basic Information */}
        <Step>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 pl-1">
                Олимпиадын мэдээлэл
              </h2>
              <p className="text-sm text-gray-600 pl-1">
                Олимпиадын мэдээлэл оруулна уу
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Олимпиадын нэр *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => onUpdateFormData("name", e.target.value)}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:bg-gray-100 ${formData.name ? 'bg-gray-100' : 'bg-gray-300'
                    }`}
                  placeholder="Олимпиадын нэр оруулна уу"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Дэлгэрэнгүй тайлбар *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    onUpdateFormData("description", e.target.value)
                  }
                  rows={4}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl resize-none text-sm text-gray-900 focus:outline-none focus:bg-gray-100 ${formData.description ? 'bg-gray-100' : 'bg-gray-300'
                    }`}
                  placeholder="Олимпиадын тайлбар оруулна уу"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Байршил *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => onUpdateFormData("location", e.target.value)}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:bg-gray-100 ${formData.location ? 'bg-gray-100' : 'bg-gray-300'
                    }`}
                  placeholder="Олимпиадын байршил оруулна уу"
                  required
                />
              </div>
            </div>
          </div>
        </Step>

        {/* Step 2: Dates and Settings */}
        <Step>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-black mb-1">
                Онцгой огноо & Тохиргоо
              </h2>
              <p className="text-sm text-gray-600">
                Олимпиадын бүртгэл хаагдах огноо
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Бүртгэл хаагдах огноо
                </label>
                <CustomDateTimePicker
                  value={formData.closeDay}
                  onChange={(date) => onUpdateFormData("closeDay", date)}
                  placeholder="Бүртгэл хаагдах огноо сонгоно уу"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Олимпиад болох огноо
                </label>
                <CustomDateTimePicker
                  value={formData.occurringDay}
                  onChange={(date) => onUpdateFormData("occurringDay", date)}
                  placeholder="Олимпиадын болох огноо сонгоно уу"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Олимпиадын түвшин
                </label>
                <select
                  value={formData.rankingType}
                  onChange={(e) =>
                    onUpdateFormData(
                      "rankingType",
                      e.target.value as OlympiadRankingType
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-200 text-gray-900 focus:outline-none"
                  required
                >
                  <option value={OlympiadRankingType.School}>
                    School Level
                  </option>
                  <option value={OlympiadRankingType.District}>
                    District Level
                  </option>
                  <option value={OlympiadRankingType.Regional}>
                    Regional Level
                  </option>
                  <option value={OlympiadRankingType.National}>
                    National Level
                  </option>
                  <option value={OlympiadRankingType.ATier}>A Tier</option>
                  <option value={OlympiadRankingType.BTier}>B Tier</option>
                  <option value={OlympiadRankingType.CTier}>C Tier</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="invitation"
                  checked={formData.invitation}
                  onChange={(e) =>
                    onUpdateFormData("invitation", e.target.checked)
                  }
                  className="w-4 h-4 rounded border border-gray-300 
               accent-[#FF8400]"
                />
                <label
                  htmlFor="invitation"
                  className="text-sm font-medium text-gray-700 pl-1"
                >
                  Хаалттай олимпиад болгох уу?
                </label>
              </div>


            </div>
          </div>
        </Step>

        {/* Step 3: Class Types and Questions */}
        <Step>
          <div className="space-y-4">
            <div>

            </div>

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
        </Step>

        {/* Step 4: Review and Submit */}
        <Step>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 pl-1">
                Шалгах & Илгээх
              </h2>
              <p className="text-sm text-gray-600 pl-8">
                Олимпиадын мэдээлэл шалгаж, илгээх
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 relative overflow-hidden pl-1"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>
              {/* Notebook margin line */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-b from-red-200 to-red-300 opacity-30"></div>
              <div className="absolute left-6 top-0 bottom-0 w-px bg-red-300 opacity-50"></div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4 pl-1">
                Olympiad Summary
              </h3>

              <div className="space-y-3 pl-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="text-gray-900 font-medium">
                    {formData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-gray-900 font-medium">
                    {formData.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Registration Closes:
                  </span>
                  <span className="text-gray-900 font-medium">
                    {formData.closeDay?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Olympiad Date:</span>
                  <span className="text-gray-900 font-medium">
                    {formData.occurringDay?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class Types:</span>
                  <span className="text-gray-900 font-medium">
                    {classTypes.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Total Questions:
                  </span>
                  <span className="text-gray-900 font-medium">
                    {classTypes.reduce(
                      (total, ct) => total + ct.questions.length,
                      0
                    )}
                  </span>
                </div>
              </div>

              {mutationError && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">
                    Error: {mutationError.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};
