"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Users } from "lucide-react";
import { useStudentRanking } from "@/hooks/useStudentRanking";
import { useAllOlympiadsQuery } from "@/generated";

export const CompleteRank = () => {
  const { allStudents } = useStudentRanking();
  const { data: allOlympiadsData } = useAllOlympiadsQuery();

  const router = useRouter();

  const handleViewProfile = (id: string) => {
    router.push(`/student/${id}`);
  };

  const handleClickViewAllRankings = () => {
    router.push("/students-rankings");
  };

  const getOlympiadName = (olympiadId: string) => {
    const olympiad = allOlympiadsData?.allOlympiads?.find(
      (o: any) => o.id === olympiadId
    );
    return olympiad?.name || "Unknown Olympiad";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRecentActivity = (student: any) => {
    const activities: Array<{
      olympiadId: string;
      reason: string;
      date: string;
    }> = [];

    if (student.gold && Array.isArray(student.gold)) {
      student.gold.forEach((olympiadId: string) => {
        activities.push({
          olympiadId,
          reason: "Алт медаль",
          date: new Date().toISOString(),
        });
      });
    }

    if (student.silver && Array.isArray(student.silver)) {
      student.silver.forEach((olympiadId: string) => {
        activities.push({
          olympiadId,
          reason: "Мөнгө медаль",
          date: new Date().toISOString(),
        });
      });
    }

    if (student.bronze && Array.isArray(student.bronze)) {
      student.bronze.forEach((olympiadId: string) => {
        activities.push({
          olympiadId,
          reason: "Хүрэл медаль",
          date: new Date().toISOString(),
        });
      });
    }

    return activities.slice(0, 3);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Сурагчидын эрэмбэ
      </h1>

      <div className="max-w-7xl mx-auto space-y-6 bg-white border border-gray-200 p-2 rounded-xl">
        {allStudents.slice(0, 5).map((person, index) => (
          <div
            key={person.id}
            className=" hover:shadow-md cursor-pointer"
            onClick={() => handleViewProfile(person.id)}
          >
            <div className="flex items-center justify-between rounded-lg ">
              <div className="flex items-center space-x-6 p-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg bg-gray-200">
                  {index + 1}
                </div>

                <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/photo.avif"
                    alt="profile"
                    width={64}
                    height={64}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black">
                    {person.name}
                  </h3>
                  <p className="text-black text-sm">Сурагч</p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">
                    {person.ranking.toLocaleString()}
                  </div>
                  <p className="text-black text-sm">оноо</p>
                </div>

                <div className="flex items-center space-x-2">
                  {person.totalMedals > 0 ? (
                    <>
                      <TrendingUp className="text-green-500 text-lg" />
                      <span className="text-sm font-medium text-green-500">
                        ↑ {person.totalMedals}
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="text-orange-500 text-lg" />
                      <span className="text-sm font-medium text-orange-500">
                        ↓ 0
                      </span>
                    </>
                  )}
                </div>

                <div className="relative group">
                  <Button
                    onClick={() => handleViewProfile(person.id)}
                    className="text-black  bg-transparent hover:bg-[#ff8400]  hover:text-white font-medium text-sm  cursor-pointer"
                  >
                    Үзэх &gt;
                  </Button>

                  {/* Activity Tooltip */}
                  {getRecentActivity(person).length > 0 && (
                    <div className="absolute left-full top-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      <div className="bg-white text-black text-sm rounded-lg py-3 px-4 shadow-lg w-80 border border-gray-300">
                        <div className="font-semibold mb-3 text-center text-black text-base">
                          Сүүлийн үр дүн
                        </div>
                        <div className="space-y-2">
                          {getRecentActivity(person).map(
                            (activity: any, index: number) => (
                              <div
                                key={index}
                                className="text-left border-b border-gray-100 pb-2 last:border-b-0"
                              >
                                <div className="font-medium text-black text-sm">
                                  {getOlympiadName(activity.olympiadId)}
                                </div>
                                <div className="text-gray-600 text-xs mt-1">
                                  {activity.reason} •{" "}
                                  {formatDate(activity.date)}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div className="absolute top-4 -left-2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={handleClickViewAllRankings}
          className="inline-flex bg-transparent border border-gray-300 items-center space-x-2 text-black font-medium hover:bg-[#ff8400]  hover:text-white"
        >
          <Users className="w-4 h-4" />
          <span>Бүх сурагчидын эрэмбэ</span>
        </Button>
      </div>
    </div>
  );
};
