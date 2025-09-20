"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Building2,
  ChevronDown,
  Medal,
  Trophy,
  Star,
  Crown,
  Award,
} from "lucide-react";
import { Input } from "../ui/input";

const mockUsers = [
  {
    id: 1,
    rank: 1,
    name: "yuanzhe zhou",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    tier: "grandmaster",
    joined: "6 years ago",
    medals: { gold: 12, silver: 13, bronze: 9 },
    points: 164846,
  },
  {
    id: 2,
    rank: 2,
    name: "Dieter",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    tier: "grandmaster",
    joined: "8 years ago",
    medals: { gold: 47, silver: 17, bronze: 3 },
    points: 152340,
  },
  {
    id: 3,
    rank: 3,
    name: "c-number",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    tier: "grandmaster",
    joined: "5 years ago",
    medals: { gold: 8, silver: 15, bronze: 12 },
    points: 145230,
  },
  {
    id: 4,
    rank: 4,
    name: "hyd",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    tier: "grandmaster",
    joined: "4 years ago",
    medals: { gold: 6, silver: 8, bronze: 14 },
    points: 138920,
  },
  {
    id: 5,
    rank: 5,
    name: "James Day",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    tier: "master",
    joined: "3 years ago",
    medals: { gold: 4, silver: 6, bronze: 8 },
    points: 125430,
  },
  {
    id: 6,
    rank: 6,
    name: "tascj",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    tier: "grandmaster",
    joined: "7 years ago",
    medals: { gold: 3, silver: 5, bronze: 7 },
    points: 118750,
  },
  {
    id: 7,
    rank: 7,
    name: "daiwakun",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    tier: "grandmaster",
    joined: "6 years ago",
    medals: { gold: 2, silver: 4, bronze: 6 },
    points: 112340,
  },
  {
    id: 8,
    rank: 8,
    name: "Raja Biswas",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    tier: "grandmaster",
    joined: "5 years ago",
    medals: { gold: 1, silver: 3, bronze: 5 },
    points: 105680,
  },
  {
    id: 9,
    rank: 9,
    name: "Eduardo Rocha de Andrade",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    tier: "grandmaster",
    joined: "4 years ago",
    medals: { gold: 0, silver: 2, bronze: 4 },
    points: 98750,
  },
  {
    id: 10,
    rank: 10,
    name: "Rib~",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    tier: "grandmaster",
    joined: "3 years ago",
    medals: { gold: 0, silver: 1, bronze: 3 },
    points: 83943,
  },
];

const tierStats = {
  grandmaster: { count: 378, icon: Crown, color: "text-yellow-600" },
  master: { count: 2201, icon: Trophy, color: "text-orange-600" },
  expert: { count: 10931, icon: Star, color: "text-purple-600" },
};

const getTierIcon = (tier: string) => {
  switch (tier) {
    case "grandmaster":
      return <Crown className="w-5 h-5 text-yellow-600" />;
    case "master":
      return <Trophy className="w-5 h-5 text-orange-600" />;
    case "expert":
      return <Star className="w-5 h-5 text-purple-600" />;
    default:
      return <Award className="w-5 h-5 text-gray-600" />;
  }
};

const formatPoints = (points: number) => {
  return points.toLocaleString();
};

export const StudentsRanking = () => {
  const [searchStudentsName, setSearchStudentsName] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedOrg, setSelectedOrg] = useState("All Organizations");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStudentsName(event.target.value);
  };

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchStudentsName.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Student Rankings
          </h1>

          <div className="flex flex-wrap gap-6 mb-8">
            {Object.entries(tierStats).map(([tier, stats]) => {
              const IconComponent = stats.icon;
              return (
                <div key={tier} className="flex items-center gap-2">
                  <IconComponent className={`w-6 h-6 ${stats.color}`} />
                  <span className="text-lg font-semibold text-gray-700">
                    {stats.count} {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    s
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by username"
              value={searchStudentsName}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <MapPin className="w-4 h-4" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Building2 className="w-4 h-4" />
              <span>{selectedOrg}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Tier
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Medals
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-gray-900">
                        #{user.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getTierIcon(user.tier)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.joined}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-700">
                            {user.medals.gold}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {user.medals.silver}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-gray-700">
                            {user.medals.bronze}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {formatPoints(user.points)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline" className="px-6 py-2">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};
