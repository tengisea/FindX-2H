"use client";

import { useState } from "react";
import Stepper, { Step } from "../ui/Stepper";
import { ClassTypeSection } from "./ClassTypeSection";
import { DateTimePicker } from "../ui/date-picker";
import {
  type CreateClassTypeInput,
  type CreateOlympiadRequestInput,
  useCreateOlympiadMutation,
  OlympiadRankingType,
} from "@/generated";

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
  onUpdateFormData: (field: string, value: string | boolean | Date | undefined) => void;
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
  const [createOlympiad, { loading: mutationLoading, error: mutationError }] = useCreateOlympiadMutation();
  const [currentStep, setCurrentStep] = useState(1);

  const handleFinalSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.description || !formData.location) {
      alert("Please fill in all required fields.");
      return;
    }

    if (classTypes.length === 0) {
      alert("Please add at least one class type.");
      return;
    }

    // Validate class types have questions
    for (const classType of classTypes) {
      if (classType.questions.length === 0) {
        alert("Each class type must have at least one question.");
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
        alert("Olympiad created successfully!");
        onResetForm();
        setCurrentStep(1);
        // Refetch data to show the new olympiad
        if (onRefetch) {
          onRefetch();
        }
      }
    } catch (error) {
      console.error("Error creating olympiad:", error);
      alert(`Failed to create olympiad: ${error instanceof Error ? error.message : "Unknown error"}`);
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
        backButtonText="Previous"
        nextButtonText="Next"
        nextButtonProps={{
          disabled: mutationLoading,
        }}
      >
        {/* Step 1: Basic Information */}
        <Step>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Olympiad Information</h2>
              <p className="text-sm text-muted-foreground">Enter the basic details for your olympiad</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Olympiad Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => onUpdateFormData("name", e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-background text-foreground"
                  placeholder="Enter olympiad name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => onUpdateFormData("description", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm bg-background text-foreground"
                  placeholder="Describe the olympiad event..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => onUpdateFormData("location", e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-background text-foreground"
                  placeholder="Enter event location"
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
              <h2 className="text-xl font-bold text-foreground mb-1">Dates & Settings</h2>
              <p className="text-sm text-muted-foreground">Set the dates and configuration for your olympiad</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Registration Close Date
                </label>
                <DateTimePicker
                  value={formData.closeDay}
                  onChange={(date) => onUpdateFormData("closeDay", date)}
                  placeholder="Select registration close date and time"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Olympiad Date
                </label>
                <DateTimePicker
                  value={formData.occurringDay}
                  onChange={(date) => onUpdateFormData("occurringDay", date)}
                  placeholder="Select olympiad date and time"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ranking Type *
                </label>
                <select
                  value={formData.rankingType}
                  onChange={(e) => onUpdateFormData("rankingType", e.target.value as OlympiadRankingType)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-background text-foreground"
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

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="invitation"
                  checked={formData.invitation}
                  onChange={(e) => onUpdateFormData("invitation", e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                />
                <label htmlFor="invitation" className="text-sm font-medium text-foreground">
                  Require invitation to participate
                </label>
              </div>
            </div>
          </div>
        </Step>

        {/* Step 3: Class Types and Questions */}
        <Step>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Class Types & Questions</h2>
              <p className="text-sm text-muted-foreground">Configure the grade levels and questions for your olympiad</p>
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
              <h2 className="text-xl font-bold text-foreground mb-1">Review & Submit</h2>
              <p className="text-sm text-muted-foreground">Review your olympiad details before submitting</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Olympiad Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground font-medium">{formData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration Closes:</span>
                  <span className="text-foreground font-medium">{formData.closeDay?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Olympiad Date:</span>
                  <span className="text-foreground font-medium">{formData.occurringDay?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class Types:</span>
                  <span className="text-foreground font-medium">{classTypes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Questions:</span>
                  <span className="text-foreground font-medium">
                    {classTypes.reduce((total, ct) => total + ct.questions.length, 0)}
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
