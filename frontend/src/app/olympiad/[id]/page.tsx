"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Star,
  Users,
  Calendar,
  MapPin,
  Building,
  Clock,
  Award,
  ChevronUp,
  ChevronDown,
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

const getMedalIcon = (medal: string) => {
  switch (medal) {
    case "GOLD":
      return <Medal className="w-5 h-5 text-yellow-500" />;
    case "SILVER":
      return <Medal className="w-5 h-5 text-gray-400" />;
    case "BRONZE":
      return <Medal className="w-5 h-5 text-amber-600" />;
    case "TOP10":
      return <Star className="w-5 h-5 text-blue-400" />;
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
    case "TOP10":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
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
    case "TOP10":
      return "Топ 10";
    default:
      return medal;
  }
};

export default function OlympiadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const olympiadId = params.id as string;

  const [sortBy, setSortBy] = useState<"ranking" | "name" | "medal">("ranking");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data: olympiadData, loading: olympiadLoading } = useGetOlympiadQuery({
    variables: { olympiadId },
  });

  const { data: studentsData, loading: studentsLoading } = useGetFilteredStudentsQuery({
    variables: { olympiadId },
  });

  const olympiad = olympiadData?.olympiad;
  const students = studentsData?.students || [];

  if (olympiadLoading || studentsLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading olympiad details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!olympiad) {
    return (
      <div className="min-h-screen bg-black">
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

  // Sort students based on current sort criteria
  const sortedStudents = [...students].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "ranking":
        comparison = (a.ranking || 0) - (b.ranking || 0);
        break;
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "medal":
        // Only sort by medals for finished olympiads, otherwise sort by ranking
        if (olympiad?.status === "FINISHED") {
          const medalPriority = { GOLD: 1, SILVER: 2, BRONZE: 3, TOP10: 4, NONE: 5 };
          const aMedal = (a.gold && a.gold.length > 0) ? "GOLD" : (a.silver && a.silver.length > 0) ? "SILVER" : (a.bronze && a.bronze.length > 0) ? "BRONZE" : (a.top10 && a.top10.length > 0) ? "TOP10" : "NONE";
          const bMedal = (b.gold && b.gold.length > 0) ? "GOLD" : (b.silver && b.silver.length > 0) ? "SILVER" : (b.bronze && b.bronze.length > 0) ? "BRONZE" : (b.top10 && b.top10.length > 0) ? "TOP10" : "NONE";
          comparison = medalPriority[aMedal] - medalPriority[bMedal];
        } else {
          // For non-finished olympiads, fall back to ranking
          comparison = (a.ranking || 0) - (b.ranking || 0);
        }
        break;
    }
    
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const getStudentMedal = (student: any) => {
    // Only show medals for finished olympiads
    if (olympiad?.status !== "FINISHED") return "NONE";
    
    if (student.gold && student.gold.length > 0) return "GOLD";
    if (student.silver && student.silver.length > 0) return "SILVER";
    if (student.bronze && student.bronze.length > 0) return "BRONZE";
    if (student.top10 && student.top10.length > 0) return "TOP10";
    return "NONE";
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-4 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Буцах
          </Button>
          
          <div className="bg-[#27272a] rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{olympiad.name}</h1>
                  <Badge className={`${
                    olympiad.status === "OPEN" ? "bg-green-500" :
                    olympiad.status === "CLOSED" ? "bg-yellow-500" :
                    olympiad.status === "FINISHED" ? "bg-blue-500" :
                    "bg-gray-500"
                  } text-white border-0`}>
                    {olympiad.status === "OPEN" ? "Нээлттэй" :
                     olympiad.status === "CLOSED" ? "Хаалттай" :
                     olympiad.status === "FINISHED" ? "Дууссан" :
                     olympiad.status}
                  </Badge>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{olympiad.description}</p>
              </div>
              {olympiad.rankingType === "NATIONAL" && (
                <Badge className="bg-orange-500 text-white border-0 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Building className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Зохион байгуулагч</p>
                  <p className="font-semibold text-white">{olympiad.organizer?.organizationName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Тэмцээний өдөр</p>
                  <p className="font-semibold text-white">{formatDate(olympiad.occurringDay)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Байршил</p>
                  <p className="font-semibold text-white">{olympiad.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Оролцогчдын тоо</p>
                  <p className="font-semibold text-white">{students.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students Ranking */}
        <Card className="bg-[#27272a] border border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-orange-500" />
                  Оролцогчдын жагсаалт
                </CardTitle>
                {olympiad?.status !== "FINISHED" && (
                  <p className="text-sm text-gray-400 mt-1">
                    {olympiad?.status === "OPEN" 
                      ? "Тэмцээн хараахан эхлээгүй байна. Медаль тэмцээн дууссаны дараа харуулагдана."
                      : "Тэмцээн дуусаагүй байна. Медаль тэмцээн дууссаны дараа харуулагдана."
                    }
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                  <SelectTrigger className="w-[140px] bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="ranking" className="text-white hover:bg-gray-700">
                      Эрэмбэ
                    </SelectItem>
                    <SelectItem value="name" className="text-white hover:bg-gray-700">
                      Нэр
                    </SelectItem>
                    {olympiad?.status === "FINISHED" && (
                      <SelectItem value="medal" className="text-white hover:bg-gray-700">
                        Медаль
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                
                <Button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                >
                  {sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Оролцогч байхгүй</h3>
                <p className="text-gray-400">Энэ тэмцээнд оролцогч бүртгэгдээгүй байна.</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Оролцогч дээр дарж дэлгэрэнгүй мэдээллийг үзэх боломжтой
                </p>
                <div className="space-y-3">
                {sortedStudents.map((student, index) => {
                  const medal = getStudentMedal(student);
                  return (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg hover:bg-gray-700/40 transition-colors cursor-pointer border border-gray-700/50"
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
                            <h3 className="font-semibold text-white">{student.name}</h3>
                            <p className="text-sm text-gray-400">{student.school}</p>
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
                          <p className="text-sm text-gray-400">Эрэмбэ</p>
                          <p className="font-semibold text-white">#{student.ranking || "N/A"}</p>
                        </div>
                        
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
