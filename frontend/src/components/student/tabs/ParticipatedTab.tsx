"use client";

import { useOlympiadQuery } from "@/generated";
import { formatDate, safeFormatDate } from "@/lib/dateUtils";
import { GetStudentQuery } from "@/generated";

type Student = GetStudentQuery["getStudent"];

interface ParticipatedOlympiadRowProps {
  olympiadId: string;
  onViewDetails: (olympiad: any) => void;
}

const ParticipatedOlympiadRow = ({
  olympiadId,
  onViewDetails,
}: ParticipatedOlympiadRowProps) => {
  const {
    data: olympiadData,
    loading,
    error,
  } = useOlympiadQuery({
    variables: { olympiadId: olympiadId },
  });

  if (loading) {
    return (
      <tr>
        <td colSpan={5} className="px-6 py-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </td>
      </tr>
    );
  }

  if (error || !olympiadData?.olympiad) {
    return (
      <tr>
        <td colSpan={5} className="px-6 py-4 text-red-600 text-sm">
          Error loading olympiad details (ID: {olympiadId})
        </td>
      </tr>
    );
  }

  const olympiad = olympiadData.olympiad;

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">
            {olympiad.name}
          </div>
          <div className="text-sm text-gray-500 truncate max-w-xs">
            {olympiad.description}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {safeFormatDate(olympiad.occurringDay)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {olympiad.location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => onViewDetails(olympiad)}
          className="text-blue-600 hover:text-blue-900 mr-3"
        >
          View Details
        </button>
        <span className="text-gray-500">Participated</span>
      </td>
    </tr>
  );
};

interface ParticipatedTabProps {
  student: any;
  loading: boolean;
  onViewDetails: (olympiad: any) => void;
  onBrowseOlympiads: () => void;
}

const ParticipatedTab = ({
  student,
  loading,
  onViewDetails,
  onBrowseOlympiads,
}: ParticipatedTabProps) => {
  if (
    !student?.participatedOlympiads ||
    student.participatedOlympiads.length === 0
  ) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#4741A6" }}
        >
          Participated Olympiads
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Participated Olympiads
          </h3>
          <p className="text-gray-600">
            You haven't participated in any olympiads yet.
          </p>
          <button
            onClick={onBrowseOlympiads}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Available Olympiads
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#4741A6" }}
      >
        Participated Olympiads
      </h2>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold text-center"
              style={{ color: "#4741A6" }}
            >
              {student.participatedOlympiads.length} Olympiad
              {student.participatedOlympiads.length !== 1 ? "s" : ""}{" "}
              Participated
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Olympiad Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {student.participatedOlympiads.map((olympiadId: string) => (
                  <ParticipatedOlympiadRow
                    key={olympiadId}
                    olympiadId={olympiadId}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipatedTab;
