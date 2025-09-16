"use client";

import { useState } from "react";
import {
  useGetPendingOlympiadsQuery,
  useGetApprovedOlympiadsQuery,
  useGetAllOlympiadsQuery,
  useApproveOlympiadMutation,
  useGetAllOrganizersQuery,
  type GetAllOlympiadsQuery,
} from "@/generated";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { OlympiadCard } from "@/components/admin/OlympiadCard";
import { OlympiadModal } from "@/components/admin/OlympiadModal";
import { OrganizerCard } from "@/components/admin/OrganizerCard";
import { CreateTournament } from "@/components/admin/CreateTournament";
import { formatDate } from "@/lib/dateUtils";

type TabType = "pending" | "approved" | "all" | "organizers" | "tournaments";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [approveScore, setApproveScore] = useState<{ [key: string]: string }>(
    {}
  );
  const [selectedOlympiad, setSelectedOlympiad] = useState<
    GetAllOlympiadsQuery["allOlympiads"][0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: pendingData,
    loading: pendingLoading,
    refetch: refetchPending,
  } = useGetPendingOlympiadsQuery();
  const {
    data: approvedData,
    loading: approvedLoading,
    refetch: refetchApproved,
  } = useGetApprovedOlympiadsQuery();
  const {
    data: allData,
    loading: allLoading,
    refetch: refetchAll,
  } = useGetAllOlympiadsQuery();
  const { data: organizersData, loading: organizersLoading } =
    useGetAllOrganizersQuery();

  const [approveOlympiad] = useApproveOlympiadMutation({
    onCompleted: () => {
      refetchPending();
      refetchApproved();
      refetchAll();
    },
  });

  const handleApprove = async (olympiadId: string, score: number) => {
    if (score <= 0) {
      alert("Please enter a valid score for award");
      return;
    }

    try {
      await approveOlympiad({
        variables: {
          approveOlympiadId: olympiadId,
          input: { scoreOfAward: score },
        },
      });
      setApproveScore((prev) => ({ ...prev, [olympiadId]: "" }));
      alert("Olympiad approved successfully!");
    } catch (error) {
      console.error("Error approving olympiad:", error);
      alert("Failed to approve olympiad");
    }
  };

  const handleOlympiadClick = (
    olympiad: GetAllOlympiadsQuery["allOlympiads"][0]
  ) => {
    setSelectedOlympiad(olympiad);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOlympiad(null);
  };

  const handleScoreChange = (olympiadId: string, score: string) => {
    setApproveScore((prev) => ({ ...prev, [olympiadId]: score }));
  };

  const renderContent = () => {
    if (activeTab === "pending") {
      if (pendingLoading) {
        return (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
              <div className="text-gray-600 font-medium">
                Loading pending olympiads...
              </div>
            </div>
          </div>
        );
      }
      if (!pendingData?.getPendingOlympiads?.length) {
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg
                className="w-16 h-16 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              All Caught Up!
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              No pending olympiads to review at the moment.
            </p>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 max-w-md mx-auto">
              <p className="text-amber-700 font-medium">
                Great job! All olympiad requests have been processed.
              </p>
            </div>
          </div>
        );
      }
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          {pendingData.getPendingOlympiads.map((olympiad) => (
            <OlympiadCard
              key={olympiad.id}
              olympiad={olympiad}
              showApprove={true}
              onApprove={handleApprove}
              approveScore={approveScore[olympiad.id] || ""}
              onScoreChange={handleScoreChange}
            />
          ))}
        </div>
      );
    } else if (activeTab === "approved") {
      if (approvedLoading) {
        return (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-4"></div>
              <div className="text-gray-600 font-medium">
                Loading approved olympiads...
              </div>
            </div>
          </div>
        );
      }
      if (!approvedData?.getAllApprovedOlympiads?.length) {
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg
                className="w-16 h-16 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Approved Olympiads Yet
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Start by reviewing and approving pending olympiad requests.
            </p>
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200 max-w-md mx-auto">
              <p className="text-emerald-700 font-medium">
                Approved olympiads will appear here once they&apos;re reviewed.
              </p>
            </div>
          </div>
        );
      }
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          {approvedData.getAllApprovedOlympiads.map((olympiad) => (
            <OlympiadCard key={olympiad.id} olympiad={olympiad} />
          ))}
        </div>
      );
    } else if (activeTab === "all") {
      if (allLoading) {
        return (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
              <div className="text-gray-600 font-medium">
                Loading all olympiads...
              </div>
            </div>
          </div>
        );
      }
      if (!allData?.allOlympiads?.length) {
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg
                className="w-16 h-16 text-blue-500"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Olympiads Found
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              The system is ready for your first olympiad event.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 max-w-md mx-auto">
              <p className="text-blue-700 font-medium">
                Organizers can start creating olympiad requests to get started.
              </p>
            </div>
          </div>
        );
      }

      const sortedOlympiads = [...allData.allOlympiads].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      return (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                All Olympiads
              </h2>
              <p className="text-gray-600 mt-1">
                Sorted by date (newest first)
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {sortedOlympiads.map((olympiad, index) => (
                <div
                  key={olympiad.id}
                  className="p-8 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleOlympiadClick(olympiad)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-2xl font-bold text-gray-400">
                          #{index + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {olympiad.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            olympiad.status === "APPROVED"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-amber-100 text-amber-800 border border-amber-200"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              olympiad.status === "APPROVED"
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          ></div>
                          {olympiad.status}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 text-lg">
                        {olympiad.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-gray-500">Date:</span>
                          <span className="font-semibold text-gray-900">
                            {formatDate(olympiad.date)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
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
                          <span className="text-gray-500">Location:</span>
                          <span className="font-semibold text-gray-900">
                            {olympiad.location}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="text-gray-500">Organizer:</span>
                          <span className="font-semibold text-gray-900">
                            {olympiad.organizer?.organizationName || "Unknown"}
                          </span>
                        </div>
                      </div>

                      {olympiad.scoreOfAward && (
                        <div className="mt-3 flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                          <span className="text-gray-500">Award Score:</span>
                          <span className="font-semibold text-gray-900">
                            {olympiad.scoreOfAward}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="ml-6 text-right">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-1">
                          Class Types
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {olympiad.classtypes.length}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {olympiad.classtypes
                            .map((ct) => ct.classYear)
                            .join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "organizers") {
      if (organizersLoading) {
        return (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
              <div className="text-gray-600 font-medium">
                Loading organizers...
              </div>
            </div>
          </div>
        );
      }

      const organizers = organizersData?.getAllOrganizers || [];

      if (organizers.length === 0) {
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg
                className="w-16 h-16 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Organizers Found
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              No organizers have been registered in the system yet.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 max-w-md mx-auto">
              <p className="text-purple-700 font-medium">
                Organizers need to register before they can create olympiads.
              </p>
            </div>
          </div>
        );
      }

      const sortedOrganizers = [...organizers].sort((a, b) =>
        a.organizationName.localeCompare(b.organizationName)
      );

      return (
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    All Organizers
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Manage organizer accounts and view their olympiad activities
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {organizers.length}
                  </div>
                  <div className="text-sm text-gray-500">Total Organizers</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {sortedOrganizers.map((organizer, index) => (
              <OrganizerCard
                key={organizer.id}
                organizer={{
                  id: organizer.id,
                  organizationName: organizer.organizationName,
                  email: organizer.email,
                  Olympiads: organizer.Olympiads ?? [],
                }}
                index={index}
              />
            ))}
          </div>
        </div>
      );
    } else if (activeTab === "tournaments") {
      return <CreateTournament />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingCount={pendingData?.getPendingOlympiads?.length || 0}
        approvedCount={approvedData?.getAllApprovedOlympiads?.length || 0}
        allCount={allData?.allOlympiads?.length || 0}
      />

      <div className="ml-80 p-8 relative overflow-hidden min-h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-400 to-pink-600 rounded-full blur-3xl transform -translate-x-24 translate-y-24"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Header */}
          <div className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      {activeTab === "pending" && (
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      {activeTab === "approved" && (
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      {activeTab === "all" && (
                        <svg
                          className="w-8 h-8 text-white"
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
                      )}
                      {activeTab === "organizers" && (
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                        {activeTab === "pending" && "Pending Olympiads"}
                        {activeTab === "approved" && "Approved Olympiads"}
                        {activeTab === "all" && "All Olympiads"}
                        {activeTab === "organizers" && "Organizers"}
                      </h1>
                      <p className="text-gray-600 text-lg">
                        {activeTab === "pending" &&
                          "Review and approve olympiad requests"}
                        {activeTab === "approved" &&
                          "View all approved olympiad events"}
                        {activeTab === "all" &&
                          "Overview of all olympiad events"}
                        {activeTab === "organizers" &&
                          "Manage organizer accounts and permissions"}
                      </p>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-amber-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-700">
                            {pendingData?.getPendingOlympiads?.length || 0}
                          </div>
                          <div className="text-sm text-amber-600">
                            Pending Review
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-emerald-700">
                            {approvedData?.getAllApprovedOlympiads?.length || 0}
                          </div>
                          <div className="text-sm text-emerald-600">
                            Approved Events
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-700">
                            {organizersData?.getAllOrganizers?.length || 0}
                          </div>
                          <div className="text-sm text-blue-600">
                            Active Organizers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content with enhanced styling */}
          <div className="relative">{renderContent()}</div>
        </div>
      </div>

      <OlympiadModal
        olympiad={selectedOlympiad}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default AdminPage;
