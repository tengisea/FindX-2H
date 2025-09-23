"use client";

import { RankingChart } from "@/components/student/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentRankingDisplay from "@/components/student/StudentRankingDisplay";
import { getProvinceName } from "@/lib/province-utils";
import { useStudentRanking } from "@/hooks/useStudentRanking";

interface ProfileTabProps {
  student: any;
  loading: boolean;
  error: any;
}

const ProfileTab = ({ student, loading, error }: ProfileTabProps) => {
  // Get the actual ranking placement
  const { currentStudentRank } = useStudentRanking(student?.id);

  if (loading) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Profile
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-gray-200"></div>
              <div className="space-y-2 flex-1">
                <div className="h-6 rounded w-1/3 bg-gray-200"></div>
                <div className="h-4 rounded w-1/2 bg-gray-200"></div>
                <div className="h-4 rounded w-1/4 bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Profile
        </h2>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600 text-center text-xl">
              Error loading student data: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Profile
        </h2>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 text-xl text-center">
              No student data found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalMedals =
    Array.isArray(student.gold) &&
    Array.isArray(student.silver) &&
    Array.isArray(student.bronze)
      ? student.gold.length + student.silver.length + student.bronze.length
      : 0;

  return (
    <div className="content-wrapper container">
      <h2 className="text-5xl font-bold mb-8 text-center text-gray-800 items-center justify-center mt-20">
        Хувийн мэдээлэл
      </h2>

      <div className="space-y-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center bg-primary shadow-lg">
                  {student.profilePicture ? (
                    <img
                      src={student.profilePicture}
                      alt={student.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-2xl sm:text-4xl text-white">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {currentStudentRank && (
                  <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded-full shadow-md">
                    #{currentStudentRank}
                  </div>
                )}
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
                  {student.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 text-lg sm:text-xl flex items-center justify-center lg:justify-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <span className="truncate">{student.email}</span>
                  </p>
                  <p className="text-gray-800 text-lg sm:text-xl flex items-center justify-center lg:justify-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="truncate">
                      {student.school} • Grade{" "}
                      {student.class.replace("GRADE_", "")}
                    </span>
                  </p>
                  <p className="text-gray-800 text-lg sm:text-xl flex items-center justify-center lg:justify-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                    <span className="truncate">
                      {student.region} {getProvinceName(student.province)}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-[#FF8400]/10 text-[#FF8400]">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    {totalMedals} Medals
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-blue-500/10 text-blue-500">
                    <svg
                      className="w-4 h-4 mr-1"
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
                    {Array.isArray(student.participatedOlympiads)
                      ? student.participatedOlympiads.length
                      : 0}{" "}
                    Olympiads
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Dynamic Ranking Card */}
          <StudentRankingDisplay
            studentId={student.id}
            showDetails={true}
            className="hover:shadow-lg transition-shadow duration-200"
          />

          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-gray-600 mb-1">
                    Total Medals
                  </p>
                  <p className="text-4xl font-bold text-[#FF8400]">
                    {totalMedals}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-yellow-500/10">
                  <svg
                    className="w-7 h-7 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-gray-600 mb-1">
                    Olympiads
                  </p>
                  <p className="text-4xl font-bold text-[#FF8400]">
                    {Array.isArray(student.participatedOlympiads)
                      ? student.participatedOlympiads.length
                      : 0}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-500/10">
                  <svg
                    className="w-7 h-7 text-blue-500"
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ranking History Chart */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-gray-800">Түүх</CardTitle>
            <p className="text-center text-gray-600">Түүх</p>
          </CardHeader>
          <CardContent>
            <RankingChart
              rankingHistory={student?.rankingHistory || []}
              currentRanking={student?.ranking || 0}
            />

            {/* Ranking Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#FF8400]/10 rounded-lg border border-[#FF8400]/20">
                <div className="text-2xl font-bold text-[#FF8400]">
                  {currentStudentRank ? `#${currentStudentRank}` : "N/A"}
                </div>
                <div className="text-base text-orange-600">Одоогийн байр</div>
              </div>

              <div className="text-center p-4 bg-[#FF8400]/10 rounded-lg border border-[#FF8400]/20">
                <div className="text-2xl font-bold text-[#FF8400]">
                  {student?.rankingHistory && student.rankingHistory.length > 0
                    ? (() => {
                        const lastEntry =
                          student.rankingHistory[
                            student.rankingHistory.length - 1
                          ];
                        const change = lastEntry.changedBy;
                        return change > 0
                          ? `+${change}`
                          : change < 0
                          ? `${change}`
                          : "0";
                      })()
                    : "0"}
                </div>
                <div className="text-base text-orange-600">
                  Сүүлийн өөрчлөлт
                </div>
              </div>

              <div className="text-center p-4 bg-[#FF8400]/10 rounded-lg border border-[#FF8400]/20">
                <div className="text-2xl font-bold text-[#FF8400]">
                  {student?.participatedOlympiads?.length || 0}
                </div>
                <div className="text-base text-orange-600">
                  Олимпиад оролцсон тоо
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTab;
