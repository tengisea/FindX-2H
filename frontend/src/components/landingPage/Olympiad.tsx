"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/PageTransition";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Calendar,
  Trophy,
  MapPin,
  Clock,
  Building,
  Eye,
  Star,
  ArrowRight,
} from "lucide-react";
import { useAllOlympiadsQuery } from "@/generated";

const formatClassYear = (classYear: string | null | undefined) => {
  if (!classYear) return "Unknown";

  // Mapping from English enum values to Mongolian display format
  const classYearMapping: { [key: string]: string } = {
    GRADE_1: "1р анги",
    GRADE_2: "2р анги",
    GRADE_3: "3р анги",
    GRADE_4: "4р анги",
    GRADE_5: "5р анги",
    GRADE_6: "6р анги",
    GRADE_7: "7р анги",
    GRADE_8: "8р анги",
    GRADE_9: "9р анги",
    GRADE_10: "10р анги",
    GRADE_11: "11р анги",
    GRADE_12: "12р анги",
    C_CLASS: "C анги",
    D_CLASS: "D анги",
    E_CLASS: "E анги",
    F_CLASS: "F анги",
  };

  return classYearMapping[classYear] || classYear;
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

const getStatusDisplayName = (status: string) => {
  switch (status) {
    case "OPEN":
      return "Open";
    case "CLOSED":
      return "Closed";
    case "FINISHED":
      return "Finished";
    case "DRAFT":
      return "Draft";
    default:
      return status;
  }
};

export const Olympiad = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("OPEN");
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean;
  }>({});

  const { data, loading, error } = useAllOlympiadsQuery();

  const DESCRIPTION_LIMIT = 150; // Character limit for truncated description

  const toggleDescription = (olympiadId: string, event: React.MouseEvent) => {
    // Prevent event bubbling if needed
    event.preventDefault();
    event.stopPropagation();

    setExpandedDescriptions((prev) => ({
      ...prev,
      [olympiadId]: !prev[olympiadId],
    }));
  };

  const olympiads = data?.allOlympiads || [];

  // Only show OPEN, CLOSED, FINISHED status types
  const statusTypes = ["OPEN", "CLOSED", "FINISHED"];

  const filteredOlympiads = olympiads.filter(
    (olympiad) => olympiad.status === selectedStatus
  );

  if (loading) {
    return (
      <div className="bg-gray-100 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Olympiad Competitions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading olympiads...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-gray-100 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Olympiad Competitions
            </h2>
            <p className="text-lg text-red-500 max-w-2xl mx-auto">
              Error loading olympiads: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (olympiads.length === 0) {
    return (
      <div className="bg-gray-100 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Olympiad Competitions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No olympiads available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Олимпиадуудын мэдээлэл
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Академик тэмцээнүүдэд оролцож, шилдэг оюутнуудтай өрсөлдөн ур
            чадвараа харуул
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {statusTypes.map((status) => {
            const isSelected = selectedStatus === status;

            return (
              <Button
                key={status}
                variant={isSelected ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedStatus(status)}
                className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  isSelected
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                    : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-orange-500/50 shadow-sm"
                }
              `}
              >
                <Star className="w-5 h-5" />
                {getStatusDisplayName(status)}
              </Button>
            );
          })}
        </div>

        {filteredOlympiads.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No {getStatusDisplayName(selectedStatus).toLowerCase()}{" "}
                olympiads
              </h3>
              <p className="text-gray-600 mb-4">
                There are currently no{" "}
                {getStatusDisplayName(selectedStatus).toLowerCase()} olympiads
                available. Please check back later or try a different status.
              </p>
              {/* <div className="flex flex-wrap justify-center gap-2">
              {statusTypes.filter(status => status !== selectedStatus).map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600 hover:border-orange-500/50"
                >
                  <Star className="w-4 h-4 mr-1" />
                  {getStatusDisplayName(status)}
                </Button>
              ))}
            </div> */}
            </div>
            <Button
              onClick={() => router.push("/olympiads")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              View All Olympiads
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {filteredOlympiads.map((olympiad) => {
              const isExpanded = expandedDescriptions[olympiad.id];
              const shouldTruncate =
                olympiad.description.length > DESCRIPTION_LIMIT;
              const displayDescription =
                shouldTruncate && !isExpanded
                  ? olympiad.description.substring(0, DESCRIPTION_LIMIT) + "..."
                  : olympiad.description;

              return (
                <Card
                  key={olympiad.id}
                  className="bg-white flex flex-col border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
                >
                  {/* Header with orange gradient */}
                  <div className="relative h-32 bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden">
                    {olympiad.rankingType === "NATIONAL" && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-white text-orange-600 border-0 flex items-center gap-1 shadow-lg font-semibold">
                          <Star className="w-3 h-3" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="p-6 flex-grow">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                      {olympiad.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed mb-6">
                      {displayDescription}
                      {shouldTruncate && (
                        <button
                          onClick={(e) => toggleDescription(olympiad.id, e)}
                          className="ml-2 text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 inline-block"
                        >
                          {isExpanded ? "See less" : "See more"}
                        </button>
                      )}
                    </CardDescription>

                    {/* Information cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">Competition Date</span>
                        </div>
                        <div className="text-gray-900 font-semibold">
                          {formatDate(olympiad.occurringDay)}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
                          <Trophy className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">Class</span>
                        </div>
                        <div className="text-gray-900 font-semibold">
                          {olympiad.classtypes
                            .map((classtype) =>
                              formatClassYear(classtype.classYear)
                            )
                            .join(", ")}
                        </div>
                      </div>

                      <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">Location</span>
                        </div>
                        <div className="text-gray-900 font-semibold">
                          {olympiad.location}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">Registration</span>
                        </div>
                        <div className="text-gray-900 font-semibold">
                          {formatDate(olympiad.closeDay)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardFooter className="pt-4 bg-gray-800/20 rounded-b-lg">
                    <PageTransition href={`/olympiad/${olympiad.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-orange-500/50 text-white hover:bg-orange-500 hover:text-black transition-all duration-300 font-medium"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </PageTransition>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        {/* View All Olympiads Section */}
        {filteredOlympiads.length > 0 && (
          <div className="text-center mt-12">
            <div className="bg-gray-900/50 rounded-lg p-8 max-w-2xl mx-auto border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">
                Explore All Competitions
              </h3>
              <p className="text-gray-300 mb-6">
                Discover more olympiad competitions with advanced filtering
                options, detailed information, and comprehensive search
                capabilities.
              </p>
              <Button
                onClick={() => router.push("/olympiads")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                View All Olympiads
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
