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
    <div className="bg-black min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Complete Rankings
      </h1>

      <div className="max-w-7xl mx-auto space-y-6">
        {allStudents.slice(0, 5).map((person, index) => (
          <div
            key={person.id}
            className=" hover:shadow-md cursor-pointer"
            onClick={() => handleViewProfile(person.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gray-600">
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
                  <h3 className="text-lg font-bold text-white">
                    {person.name}
                  </h3>
                  <p className="text-gray-400 text-sm">Student</p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">
                    {person.ranking.toLocaleString()}
                  </div>
                  <p className="text-gray-400 text-sm">points</p>
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
                  className="text-white bg-transparent border-0 font-medium text-sm hover:bg-transparent hover:text-gray-300 cursor-pointer"
                >
                  View &gt;
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={handleClickViewAllRankings}
          className="inline-flex bg-transparent border border-gray-600 items-center space-x-2 text-white font-medium hover:bg-gray-700"
        >
          <Users className="w-4 h-4" />
          <span>View All Rankings</span>
        </Button>
      </div>
    </div>
  );
};
