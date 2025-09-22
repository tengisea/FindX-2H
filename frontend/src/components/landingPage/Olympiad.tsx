"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  const [selectedStatus, setSelectedStatus] = useState("OPEN");

  const { data, loading, error } = useAllOlympiadsQuery();

  const olympiads = data?.allOlympiads || [];

  // Only show OPEN, CLOSED, FINISHED status types
  const statusTypes = ["OPEN", "CLOSED", "FINISHED"];

  const filteredOlympiads = olympiads.filter(
    (olympiad) => olympiad.status === selectedStatus
  );

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Olympiad Competitions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Loading olympiads...
          </p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Olympiad Competitions
          </h2>
          <p className="text-lg text-red-400 max-w-2xl mx-auto">
            Error loading olympiads: {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (olympiads.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Olympiad Competitions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            No olympiads available at the moment. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Featured Olympiad Competitions
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Join prestigious academic competitions and showcase your skills
          against the best students worldwide.
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
                    : "bg-[#0A0F1A] hover:bg-gray-700 text-white border-gray-600 hover:border-orange-500/50"
                }
              `}
            >
              <Star className="w-5 h-5" />
              {getStatusDisplayName(status)}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredOlympiads.map((olympiad) => (
          <Card key={olympiad.id} className="bg-[#0A0F1A]">
            <div className="relative h-48 bg-gradient-to-br from-blue-900 to-purple-900 overflow-hidden">
              {olympiad.rankingType === "NATIONAL" && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-white text-black border-0 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-white">
                {olympiad.name}
              </CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                {olympiad.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  {olympiad.organizer?.organizationName}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Competition Date</span>
                  </div>
                  <div className="text-white font-semibold">
                    {formatDate(olympiad.occurringDay)}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">Class</span>
                  </div>
                  <div className="text-white font-semibold">
                    {olympiad.classtypes
                      .map((classtype) => formatClassYear(classtype.classYear))
                      .join(", ")}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">Location</span>
                  </div>
                  <div className="text-white font-semibold">
                    {olympiad.location}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Registration</span>
                  </div>
                  <div className="text-white font-semibold">
                    {formatDate(olympiad.closeDay)}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800"
              >
                <Eye className="w-4 h-4 mr-2" />
                Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
