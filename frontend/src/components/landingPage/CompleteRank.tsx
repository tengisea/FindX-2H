"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Users } from "lucide-react";
import { useStudentRanking } from "@/hooks/useStudentRanking";

export const CompleteRank = () => {
  const { allStudents } = useStudentRanking();

  const router = useRouter();

  const handleViewProfile = (id: string) => {
    router.push(`/student/${id}`);
  };

  const handleClickViewAllRankings = () => {
    router.push("/students-rankings");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Сурагчидын эрэмбэ
      </h1>

      <div className="max-w-7xl mx-auto space-y-6 ">
        {allStudents.slice(0, 5).map((person, index) => (
          <div
            key={person.id}
            className=" hover:shadow-md cursor-pointer"
            onClick={() => handleViewProfile(person.id)}
          >
            <div className="flex items-center justify-between bg-white rounded-lg border border-black">
              <div className="flex items-center space-x-6">
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
                  <p className="text-black text-sm">points</p>
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

                <Button
                  onClick={() => handleViewProfile(person.id)}
                  className="text-black  bg-transparent font-medium text-sm hover:bg-transparent hover:text-gray-600 cursor-pointer"
                >
                  Үзэх &gt;
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={handleClickViewAllRankings}
          className="inline-flex bg-transparent border border-black items-center space-x-2 text-black font-medium hover:bg-gray-200"
        >
          <Users className="w-4 h-4" />
          <span>Бүх сурагчидын эрэмбэ</span>
        </Button>
      </div>
    </div>
  );
};
