"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { safeFormatDate } from "@/lib/dateUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface OlympiadsTabProps {
  olympiads: any[];
  student: any;
  loading: boolean;
  onViewDetails: (olympiad: any) => void;
  onRegister: (olympiad: any) => void;
  isStudentRegistered: (olympiad: any) => boolean;
  registering: boolean;
}

const OlympiadsTab = ({
  olympiads,
  student,
  loading,
  onViewDetails,
  onRegister,
  isStudentRegistered,
  registering,
}: OlympiadsTabProps) => {
  const [showAllGrades, setShowAllGrades] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRankingType, setSelectedRankingType] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Helper function to get grade number from class string
  const getGradeNumber = (classString: string) => {
    const match = classString.match(/GRADE_(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Get unique values for filter options
  const uniqueRankingTypes = useMemo(() => {
    const types = new Set<string>();
    olympiads.forEach((olympiad) => {
      if (olympiad.rankingType) {
        types.add(olympiad.rankingType);
      }
    });
    return Array.from(types).sort();
  }, [olympiads]);

  const uniqueGrades = useMemo(() => {
    const grades = new Set<string>();
    olympiads.forEach((olympiad) => {
      olympiad.classtypes.forEach((classType: any) => {
        grades.add(classType.classYear);
      });
    });
    return Array.from(grades).sort((a, b) => {
      const gradeA = getGradeNumber(a);
      const gradeB = getGradeNumber(b);
      return gradeA - gradeB;
    });
  }, [olympiads]);

  const uniqueRegions = useMemo(() => {
    const regions = new Set<string>();
    olympiads.forEach((olympiad) => {
      if (olympiad.location) {
        // Extract region from location (assuming format like "Ulaanbaatar, Mongolia")
        const region =
          olympiad.location.split(",")[1]?.trim() || olympiad.location;
        regions.add(region);
      }
    });
    return Array.from(regions).sort();
  }, [olympiads]);

  // Count OPEN olympiads for display
  const openOlympiadsCount = useMemo(() => {
    return olympiads.filter((olympiad) => olympiad.status === "OPEN").length;
  }, [olympiads]);

  // Filter olympiads based on all filter criteria
  const filteredOlympiads = useMemo(() => {
    let filtered = olympiads;

    // Status filter - only show OPEN olympiads
    filtered = filtered.filter((olympiad) => olympiad.status === "OPEN");

    // Grade filter (student's grade and higher) - students can register for their grade and higher grades
    if (!showAllGrades && student?.class) {
      const studentGrade = getGradeNumber(student.class);
      filtered = filtered.filter((olympiad) => {
        return olympiad.classtypes.some((classType: any) => {
          const classTypeGrade = getGradeNumber(classType.classYear);
          // Students can register for their grade and higher grades
          return classTypeGrade >= studentGrade;
        });
      });
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((olympiad) =>
        olympiad.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ranking type filter
    if (selectedRankingType !== "all") {
      filtered = filtered.filter(
        (olympiad) => olympiad.rankingType === selectedRankingType
      );
    }

    // Grade filter (specific grade selection)
    if (selectedGrade !== "all") {
      filtered = filtered.filter((olympiad) =>
        olympiad.classtypes.some(
          (classType: any) => classType.classYear === selectedGrade
        )
      );
    }

    // Region filter
    if (selectedRegion !== "all") {
      filtered = filtered.filter((olympiad) => {
        if (!olympiad.location) return false;
        const region =
          olympiad.location.split(",")[1]?.trim() || olympiad.location;
        return region === selectedRegion;
      });
    }

    return filtered;
  }, [
    olympiads,
    student?.class,
    showAllGrades,
    searchTerm,
    selectedRankingType,
    selectedGrade,
    selectedRegion,
  ]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedRankingType("all");
    setSelectedGrade("all");
    setSelectedRegion("all");
    setShowAllGrades(false);
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm ||
    selectedRankingType !== "all" ||
    selectedGrade !== "all" ||
    selectedRegion !== "all" ||
    !showAllGrades;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.02,
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
    },
    exit: {
      opacity: 0,
      height: 0,
    },
  };
  if (loading) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800 items-center justify-center mt-20">
          Available Olympiads
        </h2>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                >
                  <div className="h-4 rounded w-3/4 mb-2 bg-gray-200"></div>
                  <div className="h-3 rounded w-1/2 bg-gray-200"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      className="content-wrapper container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, staggerChildren: 0.1 }}
    >
      <motion.h2
        className="text-5xl font-bold mb-8 text-center text-gray-800 items-center justify-center mt-20"
        variants={itemVariants}
        transition={{ duration: 0.4 }}
      >
        Available Olympiads
      </motion.h2>
      <motion.div className="space-y-8" variants={containerVariants}>
        {/* Search and Filter Controls */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search olympiads by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 bg-white text-gray-800 border-gray-300 focus-visible:ring-0 focus-visible:border-orange-500 focus:ring-0 focus:border-orange-500 focus:outline-none placeholder:text-gray-500"
                  />
                  <AnimatePresence>
                    {searchTerm && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Filter Toggle and Clear */}
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-500"
                      >
                        <Filter className="w-4 h-4" />
                        Filters
                      </Button>
                    </motion.div>
                    <AnimatePresence>
                      {hasActiveFilters && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Clear All
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.div
                    className="text-base text-gray-600"
                    key={filteredOlympiads.length}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {filteredOlympiads.length} of {openOlympiadsCount} olympiads
                  </motion.div>
                </motion.div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200"
                      variants={filterVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      {/* Ranking Type Filter */}
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Label className="text-base font-medium">
                          Ranking Type
                        </Label>
                        <Select
                          value={selectedRankingType}
                          onValueChange={setSelectedRankingType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All ranking types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {uniqueRankingTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      {/* Grade Filter */}
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Label className="text-base font-medium">
                          Grade Level
                        </Label>
                        <Select
                          value={selectedGrade}
                          onValueChange={setSelectedGrade}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All grades" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Grades</SelectItem>
                            {uniqueGrades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade.replace("GRADE_", "Grade ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      {/* Region Filter */}
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Label className="text-base font-medium">Region</Label>
                        <Select
                          value={selectedRegion}
                          onValueChange={setSelectedRegion}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All regions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Regions</SelectItem>
                            {uniqueRegions.map((region) => (
                              <SelectItem key={region} value={region}>
                                {region}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {filteredOlympiads.length === 0 ? (
          <motion.div variants={itemVariants}>
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6 text-center">
                <svg
                  className="w-12 h-12 text-gray-500 mx-auto mb-3"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Olympiads Available
                </h3>
                <p className="text-gray-600 text-lg">
                  {hasActiveFilters
                    ? "No olympiads match your current filters. Try adjusting your search criteria."
                    : "There are currently no approved olympiads available for registration."}
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-500"
                  >
                    Clear All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr"
            variants={containerVariants}
          >
            <AnimatePresence mode="popLayout">
              {filteredOlympiads.map((olympiad, index) => (
                <motion.div
                  key={olympiad.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  layout
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2 text-orange-600">
                            {olympiad.name}
                          </h4>
                          <p className="text-base mb-3 line-clamp-3 text-gray-600 min-h-[3.5rem]">
                            {olympiad.description}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-base font-semibold ${
                            olympiad.status === "OPEN"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {olympiad.status}
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-base text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2 text-orange-500"
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
                          {safeFormatDate(olympiad.occurringDay)}
                        </div>
                        <div className="flex items-center text-base text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2 text-orange-500"
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
                          {olympiad.location}
                        </div>

                        <div className="flex items-center text-base text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2 text-orange-500"
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
                          {olympiad.organizer?.organizationName ||
                            "Unknown Organizer"}
                        </div>
                      </div>

                      {/* Class Types */}
                      <div className="mb-4 flex-grow">
                        <h5 className="text-base font-semibold mb-3 text-center text-gray-800">
                          Available Grades:
                        </h5>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {olympiad.classtypes
                            .filter((classType: any) => {
                              // Only show class types that the student can register for (their grade and higher)
                              const classTypeGrade = getGradeNumber(
                                classType.classYear
                              );
                              const studentGrade = student?.class
                                ? getGradeNumber(student.class)
                                : 0;
                              return classTypeGrade >= studentGrade;
                            })
                            .map((classType: any) => {
                              const classTypeGrade = getGradeNumber(
                                classType.classYear
                              );
                              const studentGrade = student?.class
                                ? getGradeNumber(student.class)
                                : 0;
                              const isStudentGrade =
                                String(classType.classYear) ===
                                String(student?.class);
                              const isHigherGrade =
                                classTypeGrade > studentGrade;
                              const isLowerGrade =
                                classTypeGrade < studentGrade;

                              return (
                                <span
                                  key={classType.id}
                                  className={`px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                                    isStudentGrade
                                      ? "bg-orange-100 text-orange-600 border border-orange-200 shadow-sm"
                                      : isHigherGrade
                                      ? "bg-green-100 text-green-700 border border-green-200 shadow-sm"
                                      : isLowerGrade
                                      ? "bg-gray-200 text-gray-600 border border-gray-300 shadow-sm"
                                      : "bg-gray-100 text-gray-600 border border-gray-200"
                                  }`}
                                  title={
                                    isStudentGrade
                                      ? "Your current grade"
                                      : isHigherGrade
                                      ? "Higher grade (available for registration)"
                                      : isLowerGrade
                                      ? "Lower grade (not available for registration)"
                                      : "Available grade"
                                  }
                                >
                                  {classType.classYear.replace(
                                    "GRADE_",
                                    "Grade "
                                  )}
                                  {isStudentGrade && " (You)"}
                                  {isHigherGrade && " ↑"}
                                  {isLowerGrade && " ↓"}
                                </span>
                              );
                            })}
                        </div>
                      </div>

                      <motion.div
                        className="flex space-x-2 mt-auto pt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onViewDetails(olympiad)}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors duration-200 text-base font-medium bg-gray-600 text-white hover:bg-gray-700"
                        >
                          View Details
                        </motion.button>
                        {isStudentRegistered(olympiad) ? (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-1 px-3 py-2 rounded-lg cursor-not-allowed text-base font-medium bg-gray-200 text-gray-600"
                            disabled
                          >
                            Registered
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onRegister(olympiad)}
                            disabled={registering}
                            className="flex-1 px-3 py-2 rounded-lg transition-colors duration-200 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-orange-500 text-white hover:bg-orange-600"
                          >
                            {registering ? "Registering..." : "Register"}
                          </motion.button>
                        )}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OlympiadsTab;
