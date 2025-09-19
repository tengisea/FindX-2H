"use client";

import { formatDate, safeFormatDate } from "@/lib/dateUtils";
import { GetAllApprovedOlympiadsQuery, GetStudentQuery } from "@/generated";

type Student = GetStudentQuery["getStudent"];
type Olympiad = GetAllApprovedOlympiadsQuery["getAllApprovedOlympiads"][0];

interface OlympiadsTabProps {
  olympiads: any[];
  student: any;
  loading: boolean;
  onViewDetails: (olympiad: any) => void;
  onRegister: (olympiad: any) => void;
  isStudentRegistered: (olympiad: any) => boolean;
  registering: boolean;
}

const OlympiadsTab = ({
  olympiads,
  student,
  loading,
  onViewDetails,
  onRegister,
  isStudentRegistered,
  registering,
}: OlympiadsTabProps) => {
  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#4741A6" }}
        >
          Available Olympiads
        </h2>
        <div className="rounded-xl shadow-lg p-6 bg-white">
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-3 border-blue-200">
                <div className="h-4 rounded w-3/4 mb-2 bg-blue-100"></div>
                <div className="h-3 rounded w-1/2 bg-blue-100"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (olympiads.length === 0) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#4741A6" }}
        >
          Available Olympiads
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-3"
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
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            No Olympiads Available
          </h3>
          <p className="text-sm text-gray-600">
            There are currently no approved olympiads available for
            registration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2
        className="text-2xl font-bold mb-4 text-center"
        style={{ color: "#4741A6" }}
      >
        Available Olympiads
      </h2>
      <div className="space-y-4">
        <div className="rounded-xl shadow-lg p-6 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3
              className="text-base font-semibold text-center"
              style={{ color: "#4741A6" }}
            >
              {olympiads.length} Olympiad{olympiads.length !== 1 ? "s" : ""}{" "}
              Available
            </h3>
            <div className="text-xs text-blue-300">
              Filter by grade: {student?.class || "All"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {olympiads.map((olympiad) => (
            <div
              key={olympiad.id}
              className="rounded-xl shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4
                    className="text-lg font-bold mb-1"
                    style={{ color: "#4741A6" }}
                  >
                    {olympiad.name}
                  </h4>
                  <p className="text-xs mb-2 line-clamp-2 text-blue-300">
                    {olympiad.description}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    olympiad.status === "OPEN"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {olympiad.status}
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center text-xs text-blue-300">
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#4741A6" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {safeFormatDate(olympiad.occurringDay)}
                </div>
                <div className="flex items-center text-xs text-blue-300">
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#4741A6" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {olympiad.location}
                </div>

                <div className="flex items-center text-xs text-blue-300">
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#4741A6" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {olympiad.organizer?.organizationName || "Unknown Organizer"}
                </div>
              </div>

              {/* Class Types */}
              <div className="mb-3">
                <h5
                  className="text-xs font-semibold mb-2 text-center"
                  style={{ color: "#4741A6" }}
                >
                  Available Grades:
                </h5>
                <div className="flex flex-wrap gap-1 justify-center">
                  {olympiad.classtypes.map((classType: any) => (
                    <span
                      key={classType.id}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        String(classType.classYear) === String(student?.class)
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {classType.classYear.replace("GRADE_", "Grade ")}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => onViewDetails(olympiad)}
                  className="flex-1 px-3 py-2 rounded-lg transition-colors duration-200 text-xs font-medium bg-blue-600 text-white hover:bg-blue-400"
                >
                  View Details
                </button>
                {isStudentRegistered(olympiad) ? (
                  <button
                    className="flex-1 px-3 py-2 rounded-lg cursor-not-allowed text-xs font-medium bg-blue-100 text-blue-600"
                    disabled
                  >
                    Registered
                  </button>
                ) : (
                  <button
                    onClick={() => onRegister(olympiad)}
                    disabled={registering}
                    className="flex-1 px-3 py-2 rounded-lg transition-colors duration-200 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-yellow-400 text-black hover:bg-yellow-300"
                  >
                    {registering ? "Registering..." : "Register"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OlympiadsTab;
