"use client";

import { useState, useEffect } from "react";
import {
  useUpdateOlympiadComprehensiveMutation,
  useDeleteOlympiadMutation,
  useAllClassRoomsQuery,
  Olympiad,
  ClassYear,
  OlympiadStatus,
  OlympiadRankingType
} from "@/generated";
import { getRankingTypeDisplayName } from "@/utils/rankingUtils";
import { OlympiadEditModal } from "./OlympiadEditModal";
import { OlympiadDetailModal } from "./OlympiadDetailModal";

interface ManageOlympiadsProps {
  organizerId: string;
  olympiads?: any[]; // Optional prop to pass olympiads from parent
  onRefetch?: () => void; // Optional refetch function from parent
}

export const ManageOlympiads = ({ organizerId, olympiads, onRefetch }: ManageOlympiadsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rankingFilter, setRankingFilter] = useState<string>("all");
  const [selectedOlympiad, setSelectedOlympiad] = useState<Olympiad | null>(null);
  const [selectedOlympiadId, setSelectedOlympiadId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Only use the passed olympiads from parent, no separate query needed
  const myOlympiads = olympiads || [];

  // Still need these for mutations and class rooms
  const [updateOlympiadComprehensive] = useUpdateOlympiadComprehensiveMutation();
  const [deleteOlympiad] = useDeleteOlympiadMutation();
  const { data: classRoomsData } = useAllClassRoomsQuery();

  // Use parent's refetch function if available
  const refetch = onRefetch || (() => {
    console.warn("No refetch function provided");
  });

  // Debug logging (can be removed in production)
  // console.log("Passed olympiads:", olympiads);
  // console.log("Final olympiads:", myOlympiads);

  const filteredOlympiads = myOlympiads.filter((olympiad) => {
    const matchesSearch =
      olympiad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      olympiad.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (olympiad.location?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesStatus = statusFilter === "all" || olympiad.status === statusFilter;
    const matchesRanking = rankingFilter === "all" || olympiad.rankingType === rankingFilter;

    return matchesSearch && matchesStatus && matchesRanking;
  });

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getClassYearDisplay = (classYear: ClassYear) => {
    const yearMap: { [key in ClassYear]: string } = {
      [ClassYear.Grade_1]: "Grade 1",
      [ClassYear.Grade_2]: "Grade 2",
      [ClassYear.Grade_3]: "Grade 3",
      [ClassYear.Grade_4]: "Grade 4",
      [ClassYear.Grade_5]: "Grade 5",
      [ClassYear.Grade_6]: "Grade 6",
      [ClassYear.Grade_7]: "Grade 7",
      [ClassYear.Grade_8]: "Grade 8",
      [ClassYear.Grade_9]: "Grade 9",
      [ClassYear.Grade_10]: "Grade 10",
      [ClassYear.Grade_11]: "Grade 11",
      [ClassYear.Grade_12]: "Grade 12",
      [ClassYear.CClass]: "C Class",
      [ClassYear.DClass]: "D Class",
      [ClassYear.EClass]: "E Class",
      [ClassYear.FClass]: "F Class",
    };
    return yearMap[classYear] || classYear;
  };

  const handleQuickStatusUpdate = async (olympiadId: string, newStatus: OlympiadStatus) => {
    try {
      await updateOlympiadComprehensive({
        variables: {
          updateOlympiadComprehensiveId: olympiadId,
          input: { status: newStatus }
        }
      });
      refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleDelete = async (olympiadId: string) => {
    if (!window.confirm("Are you sure you want to delete this olympiad? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteOlympiad({
        variables: { deleteOlympiadId: olympiadId }
      });
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (olympiad: any) => {
    setSelectedOlympiad(olympiad);
    setIsEditing(true);
  };

  // No loading/error states needed since we're using parent's data

  if (!myOlympiads || myOlympiads.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center relative overflow-hidden"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2 pl-8">No Olympiads Yet</h3>
        <p className="text-gray-600 pl-8">You haven&apos;t created any olympiad requests yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-2xl  border border-gray-200 p-6 relative overflow-hidden"
      >


        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 pl-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search olympiads, locations, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            >
              <option value="all">All Status</option>
              <option value={OlympiadStatus.Draft}>Draft</option>
              <option value={OlympiadStatus.UnderReview}>Under Review</option>
              <option value={OlympiadStatus.Open}>Open</option>
              <option value={OlympiadStatus.Closed}>Closed</option>
              <option value={OlympiadStatus.Finished}>Finished</option>
            </select>
            <select
              value={rankingFilter}
              onChange={(e) => setRankingFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            >
              <option value="all">All Rankings</option>
              <option value={OlympiadRankingType.School}>School Level</option>
              <option value={OlympiadRankingType.District}>District Level</option>
              <option value={OlympiadRankingType.Regional}>Regional Level</option>
              <option value={OlympiadRankingType.National}>National Level</option>
              <option value={OlympiadRankingType.ATier}>A Tier</option>
              <option value={OlympiadRankingType.BTier}>B Tier</option>
              <option value={OlympiadRankingType.CTier}>C Tier</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredOlympiads.length} of {myOlympiads.length} olympiads
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredOlympiads.length > 0 && (
            <span className="text-primary font-medium">
              {filteredOlympiads.filter(o => o.status === OlympiadStatus.Open).length} active
            </span>
          )}
        </div>
      </div>

      {/* Olympiad Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOlympiads.map((olympiad) => (
          <div
            key={olympiad.id}
            onClick={() => setSelectedOlympiadId(olympiad.id)}
            className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">

                <div>
                  <h3 className="text-[30px] font-semibold text-foreground mb-1 line-clamp-1">
                    {olympiad.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {olympiad.description}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium border text-[#ff8400]">
                {olympiad.status}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-base text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{olympiad.location}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Close: {formatDate(olympiad.closeDay)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Event: {formatDate(olympiad.occurringDay)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ranking: {getRankingTypeDisplayName(olympiad.rankingType)}</span>
              </div>
            </div>

            {/* Class Types Summary */}
            {olympiad.classtypes && olympiad.classtypes.length > 0 && (
              <div className="mb-4">
                <h4 className="text-base font-medium text-foreground mb-2">Class Types:</h4>
                <div className="flex flex-wrap gap-1">
                  {olympiad.classtypes.slice(0, 3).map((classType: any) => (
                    <span
                      key={classType.id}
                      className="bg-muted/50 rounded-md px-2 py-1 text-sm"
                    >
                      {getClassYearDisplay(classType.classYear)}
                    </span>
                  ))}
                  {olympiad.classtypes.length > 3 && (
                    <span className="bg-muted/50 rounded-md px-2 py-1 text-sm">
                      +{olympiad.classtypes.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border" onClick={(e) => e.stopPropagation()}>
              <select
                value={olympiad.status}
                onChange={(e) => handleQuickStatusUpdate(olympiad.id, e.target.value as OlympiadStatus)}
                className="text-sm border border-border rounded-lg px-3 py-1 bg-background text-foreground hover:bg-accent transition-colors"
              >
                <option value={OlympiadStatus.Draft}>Draft</option>
                <option value={OlympiadStatus.UnderReview}>Under Review</option>
                <option value={OlympiadStatus.Open}>Open</option>
                <option value={OlympiadStatus.Closed}>Closed</option>
                <option value={OlympiadStatus.Finished}>Finished</option>
              </select>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(olympiad)}
                  className="px-3 py-1  text-[#ff8400] rounded-lg hover:bg-[#ff8400]/80 transition-colors text-sm flex items-center space-x-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(olympiad.id)}
                  disabled={isDeleting}
                  className="text-destructive hover:text-destructive/80 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && selectedOlympiad && (
        <OlympiadEditModal
          olympiad={selectedOlympiad as any}
          isOpen={isEditing}
          onClose={() => {
            setIsEditing(false);
            setSelectedOlympiad(null);
          }}
          onRefetch={refetch}
        />
      )}

      {/* Detail Modal */}
      {selectedOlympiadId && (
        <OlympiadDetailModal
          isOpen={!!selectedOlympiadId}
          onClose={() => {
            setSelectedOlympiadId(null);
            // Refetch data to ensure consistency
            refetch();
          }}
          olympiadId={selectedOlympiadId}
        />
      )}
    </div>
  );
};
