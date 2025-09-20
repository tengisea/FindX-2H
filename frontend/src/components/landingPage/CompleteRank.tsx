import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Users } from "lucide-react";

export const CompleteRank = () => {
  const rankings = [
    {
      rank: 1,
      name: "Sarah Chen",
      institution: "Lincoln High School",
      points: 2450,
      change: { type: "up", value: 12 },
      profilePicture: "/images/photo.avif",
    },
  ];

  return (
    <div className="bg-[#0A101A] min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Complete Rankings
      </h1>

      <div className="max-w-7xl mx-auto space-y-6">
        {rankings.map((person) => (
          <div
            key={person.rank}
            className=" cursor-pointer         hover:shadow-md 
"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gray-600">
                  {person.rank}
                </div>

                <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={person.profilePicture}
                    alt="profile"
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {person.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{person.institution}</p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">
                    {person.points.toLocaleString()}
                  </div>
                  <p className="text-gray-400 text-sm">points</p>
                </div>

                <div className="flex items-center space-x-2">
                  {person.change.type === "up" ? (
                    <TrendingUp className="text-green-500 text-lg" />
                  ) : (
                    <TrendingDown className="text-orange-500 text-lg" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      person.change.type === "up"
                        ? "text-green-500"
                        : "text-orange-500"
                    }`}
                  >
                    {person.change.type === "up"}
                    {person.change.value}
                  </span>
                </div>

                <Button className="text-white bg-transparent border-0 font-medium text-sm hover:bg-transparent hover:text-gray-300">
                  View &gt;
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button className="inline-flex bg-transparent border border-gray-600 items-center space-x-2 text-white font-medium hover:bg-gray-700">
          <Users className="w-4 h-4" />
          <span>View All Rankings</span>
        </Button>
      </div>
    </div>
  );
};
