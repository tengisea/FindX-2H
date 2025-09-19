"use client";

import { formatDate, safeFormatDate, formatClassYear } from "@/lib/dateUtils";
import { GetStudentQuery } from "@/generated";
import { RankingChart } from "@/components/student/charts";

type Student = GetStudentQuery["getStudent"];

interface ProfileTabProps {
  student: any;
  loading: boolean;
  error: any;
}

const ProfileTab = ({ student, loading, error }: ProfileTabProps) => {
  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#4741A6" }}
        >
          Profile
        </h2>
        <div className="rounded-xl shadow-lg p-6 bg-white">
          <div className="animate-pulse">
            <div className="h-5 rounded w-1/4 mb-3 bg-blue-100"></div>
            <div className="h-4 rounded w-1/2 mb-2 bg-blue-100"></div>
            <div className="h-4 rounded w-1/3 bg-blue-100"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#4741A6" }}
        >
          Profile
        </h2>
        <div className="rounded-xl p-6 bg-yellow-100 border border-yellow-300">
          <p className="text-black text-center">
            Error loading student data: {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6" style={{ color: "#4741A6" }}>
          Profile
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600">No student data found.</p>
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
        Profile
      </h2>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="rounded-xl shadow-lg p-6 bg-white">
          <div className="flex items-center space-x-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#4741A6" }}
            >
              {student.profilePicture ? (
                <img
                  src={student.profilePicture}
                  alt={student.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="font-bold text-2xl" style={{ color: "white" }}>
                  {student.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold" style={{ color: "#4741A6" }}>
                {student.name}
              </h3>
              <p style={{ color: "#9BBBFC" }}>{student.email}</p>
              <p style={{ color: "#4741A6" }}>
                {student.school} • Grade {student.class}
              </p>
              <p style={{ color: "#4741A6" }}>
                {student.district}, {student.province}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl shadow-lg p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-300">
                  Current Ranking
                </p>
                <p className="text-3xl font-bold" style={{ color: "#4741A6" }}>
                  {student.ranking || "N/A"}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#4741A6" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-300">Medals</p>
                <p className="text-3xl font-bold text-yellow-500">
                  {Array.isArray(student.gold) &&
                  Array.isArray(student.silver) &&
                  Array.isArray(student.bronze)
                    ? student.gold.length +
                      student.silver.length +
                      student.bronze.length 
                    : 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#F9CE69" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-300">Olympiads</p>
                <p className="text-3xl font-bold" style={{ color: "#4741A6" }}>
                  {Array.isArray(student.participatedOlympiads)
                    ? student.participatedOlympiads.length
                    : 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#4741A6" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-xl shadow-lg p-6 bg-white">
          <h4
            className="text-lg font-semibold mb-4 text-center"
            style={{ color: "#4741A6" }}
          >
            Account Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-xs font-medium text-blue-300">
                Student ID
              </label>
              <p className="mt-1 text-sm" style={{ color: "#4741A6" }}>
                {student.id}
              </p>
            </div> */}
            <div>
              <label className="block text-xs font-medium text-blue-300">
                Member Since
              </label>
              <p className="mt-1 text-sm" style={{ color: "#4741A6" }}>
                {safeFormatDate(student.createdAt)}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-300">
                Last Updated
              </label>
              <p className="mt-1 text-sm" style={{ color: "#4741A6" }}>
                {safeFormatDate(student.updatedAt)}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-300">
                Current Grade
              </label>
              <p className="mt-1 text-sm" style={{ color: "#4741A6" }}>
                {formatClassYear(student.class)}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-300">
                District
              </label>
              <p className="mt-1 text-sm" style={{ color: "#4741A6" }}>
                {student.district}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-300">
                Province
              </label>
              <p className="mt-1 text-sm" style={{ color: "#4741A6" }}>
                {student.province}
              </p>
            </div>
          </div>
        </div>

        {/* Ranking History Chart */}
        <div className="rounded-xl shadow-lg p-6 bg-white">
          <h4
            className="text-lg font-semibold mb-3 text-center"
            style={{ color: "#4741A6" }}
          >
            Ranking History
          </h4>
          <p className="text-sm mb-4 text-center text-blue-300">
            Track your ranking progress over time
          </p>
          <RankingChart
            rankingHistory={student?.rankingHistory || []}
            currentRanking={student?.ranking || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
