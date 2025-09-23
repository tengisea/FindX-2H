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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAlert } from "@/components/ui/alert-system";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SuccessAlert from "@/components/ui/success-alert";

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
  onNavigateToManage?: () => void;
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
  onNavigateToManage,
}: OlympiadFormProps) => {
  const { showSuccess, showError, showWarning } = useAlert();
  const router = useRouter();
  const [createOlympiad, { loading: mutationLoading, error: mutationError }] =
    useCreateOlympiadMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<{ [step: number]: string }>({});
  const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Validation functions for each step
  const validateStep1 = (): boolean => {
    const errors: string[] = [];
    const newFieldErrors: { [field: string]: string } = {};

    if (!formData.name?.trim()) {
      errors.push("Олимпиадын нэр заавал оруулах ёстой");
      newFieldErrors.name = "Олимпиадын нэр заавал оруулах ёстой";
    }

    if (!formData.description?.trim()) {
      errors.push("Дэлгэрэнгүй тайлбар заавал оруулах ёстой");
      newFieldErrors.description = "Дэлгэрэнгүй тайлбар заавал оруулах ёстой";
    }

    if (!formData.location?.trim()) {
      errors.push("Байршил заавал оруулах ёстой");
      newFieldErrors.location = "Байршил заавал оруулах ёстой";
    }

    if (errors.length > 0) {
      setValidationErrors({ ...validationErrors, 1: errors.join(", ") });
      setFieldErrors({ ...fieldErrors, ...newFieldErrors });
      return false;
    }

    // Clear validation errors for this step
    const newErrors = { ...validationErrors };
    delete newErrors[1];
    setValidationErrors(newErrors);

    // Clear field errors for step 1 fields
    const clearedFieldErrors = { ...fieldErrors };
    delete clearedFieldErrors.name;
    delete clearedFieldErrors.description;
    delete clearedFieldErrors.location;
    setFieldErrors(clearedFieldErrors);
    return true;
  };

  const validateStep2 = (): boolean => {
    const errors: string[] = [];
    const newFieldErrors: { [field: string]: string } = {};

    console.log("Validating Step 2:", { closeDay: formData.closeDay, occurringDay: formData.occurringDay });

    // Only validate if dates are set - make this step optional for now
    // Check if closeDay is in the future (only if it's set)
    if (formData.closeDay && formData.closeDay <= new Date()) {
      errors.push("Бүртгэл хаагдах огноо ирээдүйд байх ёстой");
      newFieldErrors.closeDay = "Бүртгэл хаагдах огноо ирээдүйд байх ёстой";
    }

    // Check if occurringDay is after closeDay (only if both are set)
    if (formData.closeDay && formData.occurringDay && formData.occurringDay <= formData.closeDay) {
      errors.push("Олимпиадын болох огноо бүртгэл хаагдах огнооноос хойш байх ёстой");
      newFieldErrors.occurringDay = "Олимпиадын болох огноо бүртгэл хаагдах огнооноос хойш байх ёстой";
    }

    console.log("Step 2 validation errors:", errors);

    if (errors.length > 0) {
      setValidationErrors({ ...validationErrors, 2: errors.join(", ") });
      setFieldErrors({ ...fieldErrors, ...newFieldErrors });
      return false;
    }

    // Clear validation errors for this step
    const newErrors = { ...validationErrors };
    delete newErrors[2];
    setValidationErrors(newErrors);

    // Clear field errors for step 2 fields
    const clearedFieldErrors = { ...fieldErrors };
    delete clearedFieldErrors.closeDay;
    delete clearedFieldErrors.occurringDay;
    setFieldErrors(clearedFieldErrors);
    return true;
  };

  const validateStep3 = (): boolean => {
    const errors: string[] = [];

    if (classTypes.length === 0) {
      errors.push("Дор хаяж нэг ангийн төрөл нэмэх ёстой");
    } else {
      // Check each class type has at least one question
      for (let i = 0; i < classTypes.length; i++) {
        const classType = classTypes[i];
        if (!classType.classYear) {
          errors.push(`${i + 1}-р ангийн төрлийн анги сонгох ёстой`);
        }
        if (classType.questions.length === 0) {
          const classYearName = classType.classYear ? `${classType.classYear} ангид` : `${i + 1}-р ангийн төрөлд`;
          errors.push(`${classYearName} дор хаяж нэг асуулт нэмэх ёстой`);
        }
      }
    }

    if (errors.length > 0) {
      setValidationErrors({ ...validationErrors, 3: errors.join(", ") });
      return false;
    }

    // Clear validation error for this step
    const newErrors = { ...validationErrors };
    delete newErrors[3];
    setValidationErrors(newErrors);
    return true;
  };

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      default:
        return true;
    }
  };

  // Clear validation errors when user makes changes
  const clearValidationError = (step: number, field?: string) => {
    if (validationErrors[step]) {
      const newErrors = { ...validationErrors };
      delete newErrors[step];
      setValidationErrors(newErrors);
    }

    if (field && fieldErrors[field]) {
      const newFieldErrors = { ...fieldErrors };
      delete newFieldErrors[field];
      setFieldErrors(newFieldErrors);
    }
  };

  const handleGoToManageOlympiad = () => {
    setShowSuccessAlert(false);
    if (onNavigateToManage) {
      onNavigateToManage();
    } else {
      router.push('/host');
    }
  };

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
        location: formData.location,
        organizerId: formData.organizerId,
        invitation: formData.invitation,
        rankingType: formData.rankingType,
        classtypes: cleanedClassTypes,
      };

      // Only add dates if they are provided
      if (formData.closeDay) {
        input.closeDay = formData.closeDay.toISOString();
      }
      if (formData.occurringDay) {
        input.occurringDay = formData.occurringDay.toISOString();
      }

      console.log("Submitting olympiad with input:", input);

      const result = await createOlympiad({
        variables: { input },
      });

      if (result.data?.createOlympiad) {
        showSuccess("Olympiad created successfully!", "Success");
        setShowSuccessAlert(true);
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
      {/* Success Alert */}
      {showSuccessAlert && (
        <SuccessAlert handleGoToManageOlympiad={handleGoToManageOlympiad} />
      )}

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
        validateStep={validateStep}
        validationErrors={validationErrors}
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
                  onChange={(e) => {
                    onUpdateFormData("name", e.target.value);
                    clearValidationError(1, "name");
                  }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-gray-50 ${fieldErrors.name
                    ? 'border-red-300 bg-red-50'
                    : formData.name
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-gray-200 bg-gray-100'
                    }`}
                  placeholder="Олимпиадын нэр оруулна уу"
                  required
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-sm mt-1 pl-1">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Дэлгэрэнгүй тайлбар *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    onUpdateFormData("description", e.target.value);
                    clearValidationError(1, "description");
                  }}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl resize-none text-sm text-gray-700 focus:outline-none focus:bg-gray-50 ${fieldErrors.description
                    ? 'border-red-300 bg-red-50'
                    : formData.description
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-gray-200 bg-gray-100'
                    }`}
                  placeholder="Олимпиадын тайлбар оруулна уу"
                  required
                />
                {fieldErrors.description && (
                  <p className="text-red-500 text-sm mt-1 pl-1">{fieldErrors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Байршил *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => {
                    onUpdateFormData("location", e.target.value);
                    clearValidationError(1, "location");
                  }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-gray-50 ${fieldErrors.location
                    ? 'border-red-300 bg-red-50'
                    : formData.location
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-gray-200 bg-gray-100'
                    }`}
                  placeholder="Олимпиадын байршил оруулна уу"
                  required
                />
                {fieldErrors.location && (
                  <p className="text-red-500 text-sm mt-1 pl-1">{fieldErrors.location}</p>
                )}
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
                  onChange={(date) => {
                    onUpdateFormData("closeDay", date);
                    clearValidationError(2, "closeDay");
                  }}
                  placeholder="Бүртгэл хаагдах огноо сонгоно уу"
                />
                {fieldErrors.closeDay && (
                  <p className="text-red-500 text-sm mt-1 pl-1">{fieldErrors.closeDay}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Олимпиад болох огноо
                </label>
                <CustomDateTimePicker
                  value={formData.occurringDay}
                  onChange={(date) => {
                    onUpdateFormData("occurringDay", date);
                    clearValidationError(2, "occurringDay");
                  }}
                  placeholder="Олимпиадын болох огноо сонгоно уу"
                />
                {fieldErrors.occurringDay && (
                  <p className="text-red-500 text-sm mt-1 pl-1">{fieldErrors.occurringDay}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
                  Олимпиадын түвшин
                </label>
                <Select
                  value={formData.rankingType}
                  onValueChange={(value) =>
                    onUpdateFormData(
                      "rankingType",
                      value as OlympiadRankingType
                    )
                  }
                >
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-100 text-gray-700 focus:outline-none focus:bg-gray-50">
                    <SelectValue placeholder="Олимпиадын түвшин сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={OlympiadRankingType.School}>
                      Сургууль
                    </SelectItem>
                    <SelectItem value={OlympiadRankingType.District}>
                      Аймаг/Дүүрэг
                    </SelectItem>
                    <SelectItem value={OlympiadRankingType.Regional}>
                      Бүс
                    </SelectItem>
                    <SelectItem value={OlympiadRankingType.National}>
                      Улс
                    </SelectItem>
                    <SelectItem value={OlympiadRankingType.ATier}>A зэрэглэл</SelectItem>
                    <SelectItem value={OlympiadRankingType.BTier}>B зэрэглэл</SelectItem>
                    <SelectItem value={OlympiadRankingType.CTier}>C зэрэглэл</SelectItem>
                  </SelectContent>
                </Select>
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

            <div className="bg-white rounded-xl p-6 border border-gray-200 relative overflow-hidden pl-1">

              <h3 className="text-lg font-semibold text-gray-900 mb-4 pl-1">
                Хянах самбар
              </h3>

              <div className="space-y-3 pl-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Олимпиадын нэр:</span>
                  <span className="text-gray-900 font-medium">
                    {formData.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Байршил:</span>
                  <span className="text-gray-900 font-medium">
                    {formData.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Бүртгэл хаагдах огноо:
                  </span>
                  <span className="text-gray-900 font-medium">
                    {formData.closeDay?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Олимпиадын болох огноо:</span>
                  <span className="text-gray-900 font-medium">
                    {formData.occurringDay?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ангилал:</span>
                  <span className="text-gray-900 font-medium">
                    {classTypes.length}
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
