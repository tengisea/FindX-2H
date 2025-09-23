"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetStudentQuery,
  useAllOlympiadsQuery,
  useGetAllOrganizersQuery,
} from "@/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Trophy, Award, Medal } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Certificate } from "../certificate";
import { getProvinceName } from "@/lib/province-utils";

interface AchievementsTabProps {
  studentId: string;
}

interface Student {
  id: string;
  name: string;
  gold: string[];
  silver: string[];
  bronze: string[];
  top10: string[];
  participatedOlympiads: string[];
  school: string;
  class: string;
  province: string;
  region: string;
}

// PDF Certificate Component
const PDFCertificate = React.forwardRef<
  HTMLDivElement,
  {
    name: string;
    event: string;
    rank: "gold" | "silver" | "bronze";
    rankLabel: string;
    score: number;
    maxScore: number;
    category: string;
    completionTime: string;
    certificateId: string;
    date: string;
  }
>(
  (
    {
      name,
      event,
      rank,
      rankLabel,
      score,
      maxScore,
      category,
      certificateId,
      date,
    },
    ref
  ) => {
    const rankColor =
      rank === "gold" ? "#FFD700" : rank === "silver" ? "#E5E5E5" : "#CD7F32";

    return (
      <div
        ref={ref}
        className="w-full h-screen bg-white p-8"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <div className="border-4 border-gray-800 h-full flex flex-col items-center justify-center relative">
          {/* Decorative corners */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-800">
            ✦
          </div>
          <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-800">
            ✦
          </div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-800">
            ✦
          </div>
          <div className="absolute bottom-8 right-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-800">
            ✦
          </div>

          {/* Main content */}
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-wider">
              CERTIFICATE
            </h1>
            <h2 className="text-2xl text-gray-800 mb-8 tracking-wide">
              OF ACHIEVEMENT
            </h2>

            <p className="text-lg text-gray-700 mb-8 italic">
              This certificate is proudly awarded to
            </p>

            <div className="mb-8">
              <h3
                className="text-6xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "serif" }}
              >
                {name}
              </h3>
              <div className="w-96 h-1 bg-orange-500 mx-auto"></div>
            </div>

            <div className="text-lg text-gray-700 mb-8 leading-relaxed">
              <p className="mb-4">
                This certificate is given to <strong>{name}</strong> for
                achieving{" "}
                <span className="font-bold" style={{ color: rankColor }}>
                  {rankLabel}
                </span>{" "}
                in {event}.
              </p>
              <p
                className="text-2xl font-bold mb-4"
                style={{ color: rankColor }}
              >
                Final Score: {score}/{maxScore}
              </p>
              <p className="mb-4">Category: {category}</p>
              <p className="italic">
                Hopefully this certificate will be a great motivation for
                continued excellence.
              </p>
            </div>

            <div className="flex justify-between items-end mt-16">
              <div className="text-center">
                <div className="w-32 h-1 bg-orange-500 mb-2"></div>
                <p className="text-base font-semibold text-gray-700">
                  SIGNATURE
                </p>
              </div>

              <div className="text-center">
                <p className="text-base font-semibold text-gray-700 mb-2">
                  {date}
                </p>
                <p className="text-sm text-gray-600">DATE OF ISSUE</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-1 bg-orange-500 mb-2"></div>
                <p className="text-base font-semibold text-gray-700">
                  OFFICIAL SEAL
                </p>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              Certificate ID: {certificateId}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PDFCertificate.displayName = "PDFCertificate";

const AchievementsTab = ({ studentId }: AchievementsTabProps) => {
  const [selectedMedalType, setSelectedMedalType] = useState<string>("all");
  const [selectedCertificate, setSelectedCertificate] = useState<{
    olympiadId: string;
    medalType: "gold" | "silver" | "bronze";
    olympiadDetails: any;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const certificateRef = useRef<HTMLDivElement>(null);

  // Fetch specific student data
  const {
    data: studentData,
    loading,
    error,
  } = useGetStudentQuery({
    variables: { getStudentId: studentId },
  });

  // Fetch all olympiads data
  const { data: olympiadsData } = useAllOlympiadsQuery();

  // Fetch all organizers data
  const { data: organizersData } = useGetAllOrganizersQuery();

  const student = studentData?.getStudent;

  // Helper function to get olympiad details
  const getOlympiadDetails = (olympiadId: string) => {
    const olympiad = olympiadsData?.allOlympiads?.find(
      (o: any) => o.id === olympiadId
    );

    if (olympiad) {
      console.log("Olympiad found:", olympiad);
      console.log("Olympiad organizer:", olympiad.organizer);

      // Try to get organizer name from different possible fields
      let organizationName = "";

      // Check if organizer is populated with organizationName
      if (olympiad.organizer?.organizationName) {
        organizationName = olympiad.organizer.organizationName;
      }
      // Try to find in organizers data by ID
      else if (olympiad.organizer?.id) {
        const organizer = organizersData?.getAllOrganizers?.find(
          (org: any) => org.id === olympiad.organizer?.id
        );
        if (organizer?.organizationName) {
          organizationName = organizer.organizationName;
        }
      }

      // Fallback: Try to find organizer by matching olympiad ID in organizer's olympiads
      if (!organizationName && organizersData?.getAllOrganizers) {
        for (const organizer of organizersData.getAllOrganizers) {
          if (organizer.Olympiads?.some((ol: any) => ol.id === olympiadId)) {
            organizationName = organizer.organizationName;
            break;
          }
        }
      }

      console.log("Organization name found:", organizationName);

      return {
        name: olympiad.name,
        organization: organizationName || "Unknown Organization",
      };
    }

    return null;
  };

  // Get student's achievements (olympiads where they won medals)
  const studentAchievements = useMemo(() => {
    if (!student) return [];

    const achievements: Array<{
      olympiadId: string;
      medalType: "gold" | "silver" | "bronze";
      olympiadDetails: any;
    }> = [];

    // Add gold medals
    student.gold.forEach((olympiadId) => {
      const olympiadDetails = getOlympiadDetails(olympiadId);
      if (olympiadDetails) {
        achievements.push({
          olympiadId,
          medalType: "gold",
          olympiadDetails,
        });
      }
    });

    // Add silver medals
    student.silver.forEach((olympiadId) => {
      const olympiadDetails = getOlympiadDetails(olympiadId);
      if (olympiadDetails) {
        achievements.push({
          olympiadId,
          medalType: "silver",
          olympiadDetails,
        });
      }
    });

    // Add bronze medals
    student.bronze.forEach((olympiadId) => {
      const olympiadDetails = getOlympiadDetails(olympiadId);
      if (olympiadDetails) {
        achievements.push({
          olympiadId,
          medalType: "bronze",
          olympiadDetails,
        });
      }
    });

    return achievements;
  }, [student, olympiadsData, organizersData]);

  // Filter achievements based on medal type and search
  const filteredAchievements = useMemo(() => {
    return studentAchievements.filter((achievement) => {
      // Medal type filter
      const matchesMedalType =
        selectedMedalType === "all" ||
        selectedMedalType === achievement.medalType;

      // Search filter
      const matchesSearch =
        !searchTerm ||
        (() => {
          const searchLower = searchTerm.toLowerCase();

          // Search in olympiad name and organization
          const olympiadMatch =
            achievement.olympiadDetails.name
              .toLowerCase()
              .includes(searchLower) ||
            achievement.olympiadDetails.organization
              .toLowerCase()
              .includes(searchLower);

          // Search in class type details if available
          const olympiad = olympiadsData?.allOlympiads?.find(
            (o: any) => o.id === achievement.olympiadId
          );
          let classTypeMatch = false;

          if (olympiad?.classtypes) {
            classTypeMatch = olympiad.classtypes.some((classType: any) => {
              return (
                classType.classYear?.toLowerCase().includes(searchLower) ||
                classType.maxScore?.toString().includes(searchTerm) ||
                classType.occurringTime?.toLowerCase().includes(searchLower)
              );
            });
          }

          return olympiadMatch || classTypeMatch;
        })();

      return matchesMedalType && matchesSearch;
    });
  }, [studentAchievements, selectedMedalType, searchTerm, olympiadsData]);

  // Generate certificate data for specific achievement
  const getCertificateData = (achievement: {
    olympiadId: string;
    medalType: "gold" | "silver" | "bronze";
    olympiadDetails: any;
  }) => {
    if (!student) return null;

    const rankLabels = {
      gold: "Gold Medalist",
      silver: "Silver Medalist",
      bronze: "Bronze Medalist",
    };

    // Get the actual maxScore from the olympiad's class types
    const olympiad = olympiadsData?.allOlympiads?.find(
      (o: any) => o.id === achievement.olympiadId
    );

    // Find the class type that matches the student's grade
    const studentClassType = olympiad?.classtypes?.find(
      (ct: any) => ct.classYear === student.class
    );

    // Use the actual maxScore from the database, or fallback to medal-based scores
    const maxScore = studentClassType?.maxScore || 100;

    // Calculate score based on medal type and maxScore
    const scorePercentages = {
      gold: 0.95, // 95% of max score
      silver: 0.85, // 85% of max score
      bronze: 0.75, // 75% of max score
    };

    const actualScore = Math.round(
      maxScore * scorePercentages[achievement.medalType]
    );

    return {
      name: student.name,
      event: achievement.olympiadDetails.name,
      rank: achievement.medalType,
      rankLabel: rankLabels[achievement.medalType],
      score: actualScore,
      maxScore: maxScore,
      category: `Grade ${student.class.replace(
        "GRADE_",
        ""
      )} - ${getProvinceName(student.province)}`,
      completionTime: "60 minutes",
      certificateId: `CERT-${student.id
        .slice(-8)
        .toUpperCase()}-${achievement.olympiadId.slice(-4).toUpperCase()}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  // PDF print handler - capture the 3D certificate
  const handlePrint = useReactToPrint({
    contentRef: certificateRef,
    documentTitle: `${student?.name || "Student"}_Certificate`,
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
      }
    `,
  });

  if (loading) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-10">
          My Achievements
        </h2>
        <Card className="bg-white border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 rounded w-1/3 bg-gray-200"></div>
            <div className="h-4 rounded w-1/2 bg-gray-200"></div>
            <div className="h-4 rounded w-1/4 bg-gray-200"></div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-10">
          My Achievements
        </h2>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600 text-center text-xl">
              Error loading achievements: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-10">
          My Achievements
        </h2>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-600">👤</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Student not found
            </h3>
            <p className="text-gray-600">
              The requested student could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="content-wrapper container">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-10">
        My Achievements
      </h2>

      {/* Search and Filter */}
      <Card className="bg-white border border-gray-200 mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Search by olympiad name, organization, or class type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 bg-white text-gray-800 border-gray-300 focus:border-orange-500 placeholder:text-gray-500 focus-visible:ring-orange-500"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={selectedMedalType === "all" ? "default" : "outline"}
                onClick={() => setSelectedMedalType("all")}
                size="sm"
                className={
                  selectedMedalType === "all"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-500"
                }
              >
                All ({studentAchievements.length})
              </Button>
              <Button
                variant={selectedMedalType === "gold" ? "default" : "outline"}
                onClick={() => setSelectedMedalType("gold")}
                size="sm"
                className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              >
                Gold ({student.gold.length})
              </Button>
              <Button
                variant={selectedMedalType === "silver" ? "default" : "outline"}
                onClick={() => setSelectedMedalType("silver")}
                size="sm"
                className="text-gray-600 border-gray-600 hover:bg-gray-50"
              >
                Silver ({student.silver.length})
              </Button>
              <Button
                variant={selectedMedalType === "bronze" ? "default" : "outline"}
                onClick={() => setSelectedMedalType("bronze")}
                size="sm"
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                Bronze ({student.bronze.length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      {filteredAchievements.length === 0 ? (
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-600">🏆</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm
                ? "No achievements found matching your search."
                : "No achievements yet."}
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Participate in olympiads to earn medals and certificates!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => {
            const medalType =
              achievement.medalType.charAt(0).toUpperCase() +
              achievement.medalType.slice(1);
            const medalColor =
              achievement.medalType === "gold"
                ? "text-yellow-600"
                : achievement.medalType === "silver"
                ? "text-gray-600"
                : "text-orange-600";

            return (
              <motion.div
                key={`${achievement.olympiadId}-${achievement.medalType}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-800 mb-1">
                          {achievement.olympiadDetails.name}
                        </CardTitle>
                        <p className="text-base text-gray-600 font-medium">
                          {achievement.olympiadDetails.organization}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${medalColor}`}>
                          {medalType}
                        </div>
                        <div className="text-sm text-gray-500">
                          Medal Winner
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Achievement Details */}
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-gray-800 mb-2">
                              {medalType} Medal Winner
                            </div>
                            <div className="text-base text-gray-600">
                              Congratulations on your outstanding performance in
                              this olympiad!
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            {achievement.medalType === "gold" && (
                              <Trophy className="w-16 h-16 text-yellow-500" />
                            )}
                            {achievement.medalType === "silver" && (
                              <Award className="w-16 h-16 text-gray-400" />
                            )}
                            {achievement.medalType === "bronze" && (
                              <Medal className="w-16 h-16 text-orange-600" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={() => setSelectedCertificate(achievement)}
                        className="w-full bg-orange-500 text-white hover:bg-orange-600 py-3 text-base font-medium"
                      >
                        View Full Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 3D Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden relative border border-gray-200"
            >
              {/* PDF Download Button - Outside the border */}
              <Button
                onClick={handlePrint}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600"
                size="sm"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>

              {/* Close Button */}
              <Button
                variant="outline"
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 left-4 z-10 bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
                size="sm"
              >
                Close
              </Button>

              {/* 3D Certificate Display */}
              <div
                className="h-full"
                data-certificate-container
                ref={certificateRef}
              >
                {selectedCertificate &&
                  getCertificateData(selectedCertificate) && (
                    <Certificate
                      {...getCertificateData(selectedCertificate)!}
                    />
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementsTab;
