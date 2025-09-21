"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllStudentQuery } from "@/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Certificate } from "../certificate";
import { getProvinceName } from "@/lib/province-utils";

interface MedalWinner {
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
  district: string;
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
    category: string;
    completionTime: string;
    certificateId: string;
    date: string;
  }
>(
  (
    { name, event, rank, rankLabel, score, category, certificateId, date },
    ref,
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
              <div className="w-96 h-1 bg-gray-800 mx-auto"></div>
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
                Final Score: {score}/100
              </p>
              <p className="mb-4">Category: {category}</p>
              <p className="italic">
                Hopefully this certificate will be a great motivation for
                continued excellence.
              </p>
            </div>

            <div className="flex justify-between items-end mt-16">
              <div className="text-center">
                <div className="w-32 h-1 bg-gray-800 mb-2"></div>
                <p className="text-sm font-semibold text-gray-700">SIGNATURE</p>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {date}
                </p>
                <p className="text-xs text-gray-600">DATE OF ISSUE</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-1 bg-gray-800 mb-2"></div>
                <p className="text-sm font-semibold text-gray-700">
                  OFFICIAL SEAL
                </p>
              </div>
            </div>

            <div className="mt-8 text-xs text-gray-500">
              Certificate ID: {certificateId}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

PDFCertificate.displayName = "PDFCertificate";

const AchievementsTab = () => {
  const [selectedMedalType, setSelectedMedalType] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<MedalWinner | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const certificateRef = useRef<HTMLDivElement>(null);

  // Fetch all students with medal data
  const { data: studentsData, loading, error } = useGetAllStudentQuery();

  // Filter students who have medals
  const medalWinners = useMemo(() => {
    if (!studentsData?.getAllStudent) return [];

    return studentsData.getAllStudent.filter(
      (student: any) =>
        student.gold.length > 0 ||
        student.silver.length > 0 ||
        student.bronze.length > 0,
    ) as MedalWinner[];
  }, [studentsData]);

  // Simple filtering logic
  const filteredWinners = useMemo(() => {
    return medalWinners.filter((student) => {
      // Medal type filter
      const hasMedal =
        selectedMedalType === "all" ||
        (selectedMedalType === "gold" && student.gold.length > 0) ||
        (selectedMedalType === "silver" && student.silver.length > 0) ||
        (selectedMedalType === "bronze" && student.bronze.length > 0);

      // Search filter
      const matchesSearch =
        !searchTerm ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getProvinceName(student.province)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return hasMedal && matchesSearch;
    });
  }, [medalWinners, selectedMedalType, searchTerm]);

  // Generate certificate data for selected student
  const getCertificateData = (student: MedalWinner) => {
    let rank: "gold" | "silver" | "bronze" = "bronze";
    let rankLabel = "Bronze Medalist";
    let score = 75;

    if (student.gold.length > 0) {
      rank = "gold";
      rankLabel = "Gold Medalist";
      score = 95;
    } else if (student.silver.length > 0) {
      rank = "silver";
      rankLabel = "Silver Medalist";
      score = 85;
    }

    return {
      name: student.name,
      event: `Olympiad Competition ${new Date().getFullYear()}`,
      rank,
      rankLabel,
      score,
      category: `Grade ${student.class.replace(
        "GRADE_",
        "",
      )} - ${getProvinceName(student.province)}`,
      completionTime: "60 minutes",
      certificateId: `CERT-${student.id.slice(-8).toUpperCase()}`,
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
    documentTitle: `${selectedStudent?.name || "Student"}_Certificate`,
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
        <h2 className="text-5xl font-bold mb-8 text-center text-foreground">
          Achievements
        </h2>
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 rounded w-1/3 bg-muted"></div>
            <div className="h-4 rounded w-1/2 bg-muted"></div>
            <div className="h-4 rounded w-1/4 bg-muted"></div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-foreground">
          Achievements
        </h2>
        <Card className="border-destructive/20 bg-destructive/10">
          <CardContent className="p-6">
            <p className="text-destructive text-center text-xl">
              Error loading medal winners: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="content-wrapper container">
      <h2 className="text-4xl font-bold mb-8 text-center text-foreground">
        Medal Winners Hall of Fame
      </h2>

      {/* Simple Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Search by name, school, or province..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={selectedMedalType === "all" ? "default" : "outline"}
                onClick={() => setSelectedMedalType("all")}
                size="sm"
              >
                All ({medalWinners.length})
              </Button>
              <Button
                variant={selectedMedalType === "gold" ? "default" : "outline"}
                onClick={() => setSelectedMedalType("gold")}
                size="sm"
                className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              >
                Gold ({medalWinners.filter((s) => s.gold.length > 0).length})
              </Button>
              <Button
                variant={selectedMedalType === "silver" ? "default" : "outline"}
                onClick={() => setSelectedMedalType("silver")}
                size="sm"
                className="text-gray-600 border-gray-600 hover:bg-gray-50"
              >
                Silver ({medalWinners.filter((s) => s.silver.length > 0).length}
                )
              </Button>
              <Button
                variant={selectedMedalType === "bronze" ? "default" : "outline"}
                onClick={() => setSelectedMedalType("bronze")}
                size="sm"
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                Bronze ({medalWinners.filter((s) => s.bronze.length > 0).length}
                )
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medal Winners Grid */}
      {filteredWinners.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <span className="text-2xl text-muted-foreground">★</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm
                ? "No medal winners found matching your search."
                : "No medal winners found."}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Check back later for new achievements!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWinners.map((student) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <div className="flex gap-1">
                      {student.gold.length > 0 && (
                        <span className="text-yellow-500 font-bold">G</span>
                      )}
                      {student.silver.length > 0 && (
                        <span className="text-gray-400 font-bold">S</span>
                      )}
                      {student.bronze.length > 0 && (
                        <span className="text-orange-600 font-bold">B</span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>
                      <strong>School:</strong> {student.school}
                    </p>
                    <p>
                      <strong>Grade:</strong>{" "}
                      {student.class.replace("GRADE_", "")}
                    </p>
                    <p>
                      <strong>Location:</strong> {student.district},{" "}
                      {getProvinceName(student.province)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {student.gold.length > 0 && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        {student.gold.length} Gold
                      </span>
                    )}
                    {student.silver.length > 0 && (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        {student.silver.length} Silver
                      </span>
                    )}
                    {student.bronze.length > 0 && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                        {student.bronze.length} Bronze
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => setSelectedStudent(student)}
                    className="w-full group-hover:bg-primary/90"
                  >
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* 3D Certificate Modal */}
      <AnimatePresence>
        {selectedStudent && (
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
              className="bg-background rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden relative"
            >
              {/* PDF Download Button - Outside the border */}
              <Button
                onClick={handlePrint}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-primary hover:bg-primary/90"
                size="sm"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>

              {/* Close Button */}
              <Button
                variant="outline"
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 left-4 z-10 bg-primary border-primary"
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
                <Certificate {...getCertificateData(selectedStudent)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementsTab;
