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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRankingTypeDisplayName } from "@/utils/rankingUtils";
import { OlympiadEditModal } from "./OlympiadEditModal";

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
    if (!dateString) return "Тогтоогоогүй";
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getClassYearDisplay = (classYear: ClassYear) => {
    const yearMap: { [key in ClassYear]: string } = {
      [ClassYear.Grade_1]: "1р анги",
      [ClassYear.Grade_2]: "2р анги",
      [ClassYear.Grade_3]: "3р анги",
      [ClassYear.Grade_4]: "4р анги",
      [ClassYear.Grade_5]: "5р анги",
      [ClassYear.Grade_6]: "6р анги",
      [ClassYear.Grade_7]: "7р анги",
      [ClassYear.Grade_8]: "8р анги",
      [ClassYear.Grade_9]: "9р анги",
      [ClassYear.Grade_10]: "10р анги",
      [ClassYear.Grade_11]: "11р анги",
      [ClassYear.Grade_12]: "12р анги",
      [ClassYear.CClass]: "C анги",
      [ClassYear.DClass]: "D анги",
      [ClassYear.EClass]: "E анги",
      [ClassYear.FClass]: "F анги",
    };
    return yearMap[classYear] || classYear;
  };

  const getStatusDisplay = (status: string) => {
    const statusMap: { [key: string]: string } = {
      [OlympiadStatus.Draft]: "Идэвхгүй",
      [OlympiadStatus.UnderReview]: "Шалгагдаж байна",
      [OlympiadStatus.Open]: "Нээлттэй",
      [OlympiadStatus.Closed]: "Хаагдсан",
      [OlympiadStatus.Finished]: "Дууссан",
    };
    return statusMap[status] || status;
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
    if (!window.confirm("Та энэ олимпиадыг устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.")) {
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
        <h3 className="text-2xl font-bold text-gray-900 mb-2 pl-8">Олимпиад байхгүй</h3>
        <p className="text-gray-600 pl-8">Та одоогоор олимпиад үүсгээгүй байна.</p>
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
              placeholder="Олимпиад, байршил, тайлбар хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
          </div>
          <div className="flex gap-4">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                <SelectValue placeholder="Бүх төлөв" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүх төлөв</SelectItem>
                <SelectItem value={OlympiadStatus.Draft}>Идэвхгүй</SelectItem>
                <SelectItem value={OlympiadStatus.UnderReview}>Шалгагдаж байна</SelectItem>
                <SelectItem value={OlympiadStatus.Open}>Нээлттэй</SelectItem>
                <SelectItem value={OlympiadStatus.Closed}>Хаагдсан</SelectItem>
                <SelectItem value={OlympiadStatus.Finished}>Дууссан</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={rankingFilter}
              onValueChange={setRankingFilter}
            >
              <SelectTrigger className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                <SelectValue placeholder="Бүх зэрэглэл" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүх зэрэглэл</SelectItem>
                <SelectItem value={OlympiadRankingType.School}>Сургууль</SelectItem>
                <SelectItem value={OlympiadRankingType.District}>Аймаг/Дүүрэг</SelectItem>
                <SelectItem value={OlympiadRankingType.Regional}>Бүс</SelectItem>
                <SelectItem value={OlympiadRankingType.National}>Улс</SelectItem>
                <SelectItem value={OlympiadRankingType.ATier}>A зэрэглэл</SelectItem>
                <SelectItem value={OlympiadRankingType.BTier}>B зэрэглэл</SelectItem>
                <SelectItem value={OlympiadRankingType.CTier}>C зэрэглэл</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredOlympiads.length} / {myOlympiads.length} олимпиад харуулж байна
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredOlympiads.length > 0 && (
            <span className="text-primary font-medium">
              {filteredOlympiads.filter(o => o.status === OlympiadStatus.Open).length} идэвхитэй
            </span>
          )}
        </div>
      </div>

      {/* Olympiad Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOlympiads.map((olympiad) => (
          <div
            key={olympiad.id}
            className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 group"
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
                {getStatusDisplay(olympiad.status)}
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
                <span>Хаах: {formatDate(olympiad.closeDay)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Олимпиад: {formatDate(olympiad.occurringDay)}</span>
              </div>
            </div>

            {/* Class Types Summary */}
            {olympiad.classtypes && olympiad.classtypes.length > 0 && (
              <div className="mb-4">
                <h4 className="text-base font-medium text-foreground mb-2">Ангийн төрлүүд:</h4>
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
                      +{olympiad.classtypes.length - 3} нэмэгдэл
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Select
                value={olympiad.status}
                onValueChange={(value) => handleQuickStatusUpdate(olympiad.id, value as OlympiadStatus)}
              >
                <SelectTrigger className="text-sm border border-border rounded-lg px-3 py-1 bg-background text-foreground hover:bg-accent transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={OlympiadStatus.Draft}>Идэвхгүй</SelectItem>
                  <SelectItem value={OlympiadStatus.UnderReview}>Шалгагдаж байна</SelectItem>
                  <SelectItem value={OlympiadStatus.Open}>Нээлттэй</SelectItem>
                  <SelectItem value={OlympiadStatus.Closed}>Хаагдсан</SelectItem>
                  <SelectItem value={OlympiadStatus.Finished}>Дууссан</SelectItem>
                </SelectContent>
              </Select>

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

    </div>
  );
};
