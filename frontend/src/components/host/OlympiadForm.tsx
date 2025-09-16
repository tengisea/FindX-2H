'use client';

import { ClassTypeSection } from './ClassTypeSection';
import { type CreateClassTypeInput } from '@/generated';

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
  onUpdateQuestion: (classTypeIndex: number, questionIndex: number, field: string, value: any) => void;
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
  isSubmitting
}: OlympiadFormProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {editingOlympiad ? 'Edit Olympiad' : 'Create New Olympiad'}
          </h2>
          <p className="text-gray-600">
            {editingOlympiad 
              ? 'Update your olympiad details and class types' 
              : 'Fill in the details to request a new olympiad event'
            }
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Olympiad Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onUpdateFormData('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                onChange={(e) => onUpdateFormData('date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => onUpdateFormData('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
              onChange={(e) => onUpdateFormData('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event location"
              required
            />
          </div>

          {/* Class Types Section */}
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

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onResetForm}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={isSubmitting}
            >
              Reset Form
            </button>

            <div className="flex items-center space-x-4">
              {editingOlympiad && (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{editingOlympiad ? 'Update Olympiad' : 'Request Olympiad'}</span>
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
