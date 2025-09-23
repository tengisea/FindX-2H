"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Star,
  Users,
  Calendar,
  MapPin,
  Building,
  ExternalLink,
} from "lucide-react";
import { useGetOlympiadQuery, useGetFilteredStudentsQuery } from "@/generated";

const formatClassYear = (classYear: string | null | undefined) => {
  if (!classYear) return "Unknown";

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

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString || dateString === null || dateString === undefined) {
    return "Огноо тодорхойлогдоогүй";
  }
  
  try {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Огноо тодорхойлогдоогүй";
    }
    
    // Format as YYYY.MM.DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  } catch (error) {
    return "Огноо тодорхойлогдоогүй";
  }
};

const getMedalIcon = (medal: string) => {
  switch (medal) {
    case "GOLD":
      return <Medal className="w-5 h-5 text-yellow-500" />;
    case "SILVER":
      return <Medal className="w-5 h-5 text-gray-400" />;
    case "BRONZE":
      return <Medal className="w-5 h-5 text-amber-600" />;
    default:
      return null;
  }
};

const getMedalColor = (medal: string) => {
  switch (medal) {
    case "GOLD":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "SILVER":
      return "bg-gray-400/20 text-gray-300 border-gray-400/30";
    case "BRONZE":
      return "bg-amber-600/20 text-amber-400 border-amber-600/30";
    default:
      return "bg-gray-600/20 text-gray-400 border-gray-600/30";
  }
};

const getMedalName = (medal: string) => {
  switch (medal) {
    case "GOLD":
      return "Алтан медаль";
    case "SILVER":
      return "Мөнгөн медаль";
    case "BRONZE":
      return "Хүрэл медаль";
    default:
      return medal;
  }
};

export default function OlympiadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const olympiadId = params.id as string;

  const [selectedClassType, setSelectedClassType] = useState<string | null>(null);

  const { data: olympiadData, loading: olympiadLoading } = useGetOlympiadQuery({
    variables: { olympiadId },
  });

  const { data: studentsData, loading: studentsLoading } = useGetFilteredStudentsQuery({
    variables: { olympiadId },
  });

  const olympiad = olympiadData?.olympiad;
  const students = studentsData?.students || [];

  // Remove loading state - show content immediately with skeleton or empty states

  if (!olympiad && !olympiadLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Olympiad not found</h1>
            <Button onClick={() => router.back()} variant="outline" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get unique class types from students
  const availableClassTypes = [...new Set(students.map(student => student.class).filter(Boolean))];

  // Sort class types by grade level
  const sortedClassTypes = availableClassTypes.sort((a, b) => {
    const getGradeNumber = (classType: string) => {
      if (classType.startsWith('GRADE_')) {
        return parseInt(classType.replace('GRADE_', ''));
      }
      if (classType.startsWith('ANGI_')) {
        return parseInt(classType.replace('ANGI_', ''));
      }
      return 999; // Unknown class types go to the end
    };
    return getGradeNumber(a) - getGradeNumber(b);
  });

  // Set default selected class type to the first one
  if (sortedClassTypes.length > 0 && !selectedClassType) {
    setSelectedClassType(sortedClassTypes[0]);
  }

  // Filter students by selected class type and sort by medals
  const filteredStudents = selectedClassType
    ? students.filter(student => student.class === selectedClassType)
    : [];

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (olympiad?.status === "FINISHED") {
      // Sort by medals for finished olympiads
      const medalPriority = { GOLD: 1, SILVER: 2, BRONZE: 3, NONE: 4 };
      const aMedal = (a.gold && a.gold.length > 0) ? "GOLD" : (a.silver && a.silver.length > 0) ? "SILVER" : (a.bronze && a.bronze.length > 0) ? "BRONZE" : "NONE";
      const bMedal = (b.gold && b.gold.length > 0) ? "GOLD" : (b.silver && b.silver.length > 0) ? "SILVER" : (b.bronze && b.bronze.length > 0) ? "BRONZE" : "NONE";
      return medalPriority[aMedal] - medalPriority[bMedal];
    } else {
      // Sort by ranking for non-finished olympiads
      return (a.ranking || 0) - (b.ranking || 0);
    }
  });

  const getStudentMedal = (student: any) => {
    // Only show medals for finished olympiads
    if (olympiad?.status !== "FINISHED") return "NONE";

    if (student.gold && student.gold.length > 0) return "GOLD";
    if (student.silver && student.silver.length > 0) return "SILVER";
    if (student.bronze && student.bronze.length > 0) return "BRONZE";
    return "NONE";
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ y: 100, scaleY: 0 }}
      animate={{ y: 0, scaleY: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "bottom" }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-4 bg-white border-gray-300 text-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Буцах
          </Button>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-black">
                    {olympiad?.name || "Loading..."}
                  </h1>
                  {olympiad?.status && (
                    <Badge className={`${olympiad.status === "OPEN" ? "bg-orange-500" :
                        olympiad.status === "CLOSED" ? "bg-orange-600" :
                          olympiad.status === "FINISHED" ? "bg-orange-700" :
                            "bg-orange-400"
                      } text-white border-0`}>
                      {olympiad.status === "OPEN" ? "Нээлттэй" :
                        olympiad.status === "CLOSED" ? "Хаалттай" :
                          olympiad.status === "FINISHED" ? "Дууссан" :
                            olympiad.status}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {olympiad?.description || "Loading description..."}
                </p>
              </div>
              {olympiad?.rankingType === "NATIONAL" && (
                <Badge className="bg-orange-500 text-white border-0 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Building className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Зохион байгуулагч</p>
                  <p className="font-semibold text-black">
                    {olympiad?.organizer?.organizationName || "Loading..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Тэмцээний өдөр</p>
                  <p className="font-semibold text-black">
                    {olympiad?.occurringDay ? formatDate(olympiad.occurringDay) : "Loading..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Байршил</p>
                  <p className="font-semibold text-black">
                    {olympiad?.location || "Loading..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Users className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Оролцогчдын тоо</p>
                  <p className="font-semibold text-black">
                    {studentsLoading ? "Loading..." : students.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students Ranking */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-black flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-orange-500" />
                  Оролцогчдын жагсаалт
                </CardTitle>
                {olympiad?.status && olympiad.status !== "FINISHED" && (
                  <p className="text-sm text-gray-600 mt-1">
                    {olympiad.status === "OPEN"
                      ? "Тэмцээн хараахан эхлээгүй байна. Медаль тэмцээн дууссаны дараа харуулагдана."
                      : "Тэмцээн дуусаагүй байна. Медаль тэмцээн дууссаны дараа харуулагдана."
                    }
                  </p>
                )}
              </div>

              {/* Class Type Tabs */}
              {students.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {sortedClassTypes.map((classType) => {
                    const studentsInClass = students.filter(student => student.class === classType);
                    return (
                      <button
                        key={classType}
                        onClick={() => setSelectedClassType(classType)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${selectedClassType === classType
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-black'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{formatClassYear(classType)}</span>
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                            {studentsInClass.length}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="!pt-0">
            {studentsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Оролцогчдын мэдээллийг ачааллаж байна...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">Оролцогч байхгүй</h3>
                <p className="text-gray-600">Энэ тэмцээнд оролцогч бүртгэгдээгүй байна.</p>
              </div>
            ) : (
              <div>
                {/* Selected Class Type Students */}
                {selectedClassType && (
                  <div>
                    <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Оролцогч дээр дарж дэлгэрэнгүй мэдээллийг үзэх боломжтой
                    </p>

                    <div className="space-y-3">
                      {sortedStudents.map((student, index) => {
                        const medal = getStudentMedal(student);
                        return (
                          <div
                            key={student.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                            onClick={() => router.push(`/student/${student.id}`)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white font-bold rounded-full text-sm">
                                {index + 1}
                              </div>

                              <div className="flex items-center gap-3">
                                {student.profilePicture ? (
                                  <img
                                    src={student.profilePicture}
                                    alt={student.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                    <Users className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}

                                <div>
                                  <h3 className="font-semibold text-black">{student.name}</h3>
                                  <p className="text-sm text-gray-600">{student.school}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              {medal !== "NONE" && (
                                <Badge className={`${getMedalColor(medal)} border`}>
                                  {getMedalIcon(medal)}
                                  <span className="ml-1">{getMedalName(medal)}</span>
                                </Badge>
                              )}

                              <div className="text-right">

                                <p className="font-semibold text-black">#{student.ranking || "N/A"}</p>
                              </div>

                              <ExternalLink className="w-4 h-4 text-gray-500 hover:text-black transition-colors" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
