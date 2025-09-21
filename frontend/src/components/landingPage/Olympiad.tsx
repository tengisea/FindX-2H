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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar,
  Trophy,
  MapPin,
  Clock,
  Building,
  Users,
  Eye,
  Star,
  Info,
} from "lucide-react";
import { useGetAllOlympiadsQuery } from "@/generated";

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

const formatClassYears = (classYears: string[]) => {
  return classYears
    .map((year) => {
      const numYear = parseInt(year);
      if (!isNaN(numYear)) {
        return `${numYear} дугаар анги`;
      }
      return year;
    })
    .join(", ");
};

export const Olympiad = () => {
  const [selectedRankingType, setSelectedRankingType] = useState("all");

  const { data, loading, error } = useGetAllOlympiadsQuery();

  const olympiads = data?.allOlympiads || [];

  const rankingTypes = Array.from(
    new Set(olympiads.map((olympiad) => olympiad.rankingType))
  );

  const filteredOlympiads =
    selectedRankingType === "all"
      ? olympiads
      : olympiads.filter(
          (olympiad) => olympiad.rankingType === selectedRankingType
        );

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
        <Button
          variant={selectedRankingType === "all" ? "default" : "outline"}
          size="lg"
          onClick={() => setSelectedRankingType("all")}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${
              selectedRankingType === "all"
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                : "bg-gray-800 hover:bg-gray-700 text-white border-gray-600 hover:border-orange-500/50"
            }
          `}
        >
          <Trophy className="w-5 h-5" />
          All Types
        </Button>
        {rankingTypes.map((rankingType) => {
          const isSelected = selectedRankingType === rankingType;

          return (
            <Button
              key={rankingType}
              variant={isSelected ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedRankingType(rankingType)}
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
              {rankingType}
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
                  <Badge className="bg-gray-600 text-white border-0 flex items-center gap-1">
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
                      .map((classtype) => classtype.classYear)
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
