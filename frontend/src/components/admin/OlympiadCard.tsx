'use client';

import { type GetAllOlympiadsQuery } from '@/generated';

interface OlympiadCardProps {
  olympiad: GetAllOlympiadsQuery['allOlympiads'][0];
  showApprove?: boolean;
  isClickable?: boolean;
  onOlympiadClick?: (olympiad: GetAllOlympiadsQuery['allOlympiads'][0]) => void;
  onApprove?: (olympiadId: string, score: number) => void;
  approveScore?: string;
  onScoreChange?: (olympiadId: string, score: string) => void;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Date not set";
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return "Date not set";
  }
};

export const OlympiadCard = ({
  olympiad,
  showApprove = false,
  isClickable = false,
  onOlympiadClick,
  onApprove,
  approveScore = '',
  onScoreChange
}: OlympiadCardProps) => (
  <div
    className={`group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden ${isClickable ? 'cursor-pointer' : ''
      }`}
    onClick={isClickable ? () => onOlympiadClick?.(olympiad) : undefined}
  >
    {/* Gradient Background */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

    {/* Header */}
    <div className="flex justify-between items-start mb-6">
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{olympiad.name}</h3>
        <p className="text-gray-600 text-lg leading-relaxed">{olympiad.description}</p>
      </div>
      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${olympiad.status === 'APPROVED'
          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
          : 'bg-amber-100 text-amber-800 border border-amber-200'
        }`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${olympiad.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-amber-500'
          }`}></div>
        {olympiad.status}
      </span>
    </div>

    {/* Details Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold text-gray-900">{formatDate(olympiad.date)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold text-gray-900">{olympiad.location}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Organizer</p>
            <p className="font-semibold text-gray-900">{olympiad.organizer?.organizationName || 'Unknown'}</p>
          </div>
        </div>

        {olympiad.scoreOfAward && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Award Score</p>
              <p className="font-semibold text-gray-900">{olympiad.scoreOfAward}</p>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Class Types */}
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-900">Class Types</h4>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
          {olympiad.classtypes.length} classes
        </span>
      </div>
      <div className="grid gap-3">
        {olympiad.classtypes.map((classType) => (
          <div key={classType.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-800 text-lg">{classType.classYear}</span>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {classType.questions.length} questions
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  {classType.medalists} medalists
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Max Score</span>
              <span className="font-bold text-blue-600 text-lg">{classType.maxScore}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Approve Section */}
    {showApprove && olympiad.status === "PENDING" && (
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h5 className="font-semibold text-green-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Approve Olympiad
          </h5>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Award Score
              </label>
              <input
                type="number"
                value={approveScore}
                onChange={(e) => onScoreChange?.(olympiad.id, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter award score"
                min="1"
              />
            </div>
            <button
              onClick={() => onApprove?.(olympiad.id, parseInt(approveScore))}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
