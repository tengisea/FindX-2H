import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

export const CompleteRank = () => {
  const rankings = [
    {
      rank: 1,
      name: "Sarah Chen",
      institution: "Lincoln High School",
      points: 2450,
      change: { type: "up", value: 12 },
      profilePicture: "🏔️",
    },
    {
      rank: 2,
      name: "Marcus Johnson",
      institution: "Roosevelt Academy",
      points: 2380,
      change: { type: "up", value: 8 },
      profilePicture: "👨",
    },
    {
      rank: 3,
      name: "Emma Rodriguez",
      institution: "Washington Prep",
      points: 2320,
      change: { type: "up", value: 15 },
      profilePicture: "👩",
    },
    {
      rank: 4,
      name: "David Kim",
      institution: "Jefferson Institute",
      points: 2280,
      change: { type: "down", value: 3 },
      profilePicture: "👨‍💼",
    },
    {
      rank: 5,
      name: "Aisha Patel",
      institution: "Madison High",
      points: 2250,
      change: { type: "up", value: 7 },
      profilePicture: "👩‍💼",
    },
  ];

  return (
    <div className=" p-8">
      <h1 className="text-3xl font-bold text-center text-black mb-8">
        Complete Rankings
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {rankings.map((person) => (
          <div
            key={person.rank}
            className=" p-6  hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    person.rank <= 3 ? "bg-yellow-400" : "bg-gray-400"
                  }`}
                >
                  {person.rank}
                </div>

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                  {person.profilePicture}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black">
                    {person.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{person.institution}</p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {person.points.toLocaleString()}
                  </div>
                  <p className="text-gray-500 text-sm">points</p>
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
                    {person.change.type === "up" ? "Up" : "Down"}
                    {person.change.value}
                  </span>
                </div>

                <Button className="text-gray-600 bg-white font-medium text-sm hover:bg-blue-600 hover:text-white">
                  View &gt;
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button className="inline-flex bg-white items-center space-x-2 text-blue-600 font-medium">
          <span>👥</span>
          <span>View All Rankings</span>
        </Button>
      </div>
    </div>
  );
};
