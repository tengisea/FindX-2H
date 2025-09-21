"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Medal,
  Trophy,
  Star,
  Crown,
  Award,
  School,
  MapPin,
  Eye,
} from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useStudentRanking } from "@/hooks/useStudentRanking";
import { useAllOlympiadsQuery } from "@/generated";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const getMedalStats = (students: any[]) => {
  const goldStudents = students.filter(
    (student) => student.goldCount > 0,
  ).length;
  const silverStudents = students.filter(
    (student) => student.silverCount > 0,
  ).length;
  const bronzeStudents = students.filter(
    (student) => student.bronzeCount > 0,
  ).length;

  return {
    gold: { count: goldStudents, icon: Crown, color: "text-yellow-600" },
    silver: { count: silverStudents, icon: Trophy, color: "text-gray-400" },
    bronze: { count: bronzeStudents, icon: Star, color: "text-amber-600" },
  };
};

const getTierIcon = (ranking: number) => {
  if (ranking <= 10) {
    return <Crown className="w-5 h-5 text-yellow-600" />;
  } else if (ranking <= 50) {
    return <Trophy className="w-5 h-5 text-orange-600" />;
  } else if (ranking <= 100) {
    return <Star className="w-5 h-5 text-purple-600" />;
  } else {
    return <Award className="w-5 h-5 text-gray-600" />;
  }
};

const getStudentOlympiads = (student: any) => {
  const olympiads = new Set();

  // Add olympiads where student won gold medals
  if (student.gold && Array.isArray(student.gold)) {
    student.gold.forEach((olympiad: string) => olympiads.add(olympiad));
  }

  // Add olympiads where student won silver medals
  if (student.silver && Array.isArray(student.silver)) {
    student.silver.forEach((olympiad: string) => olympiads.add(olympiad));
  }

  // Add olympiads where student won bronze medals
  if (student.bronze && Array.isArray(student.bronze)) {
    student.bronze.forEach((olympiad: string) => olympiads.add(olympiad));
  }

  return Array.from(olympiads);
};

export const StudentsRanking = () => {
  const [searchStudentsName, setSearchStudentsName] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Classes");
  const [selectedOrg, setSelectedOrg] = useState("All Provinces");
  const [selectedOlympiads, setSelectedOlympiads] = useState<any[]>([]);

  const router = useRouter();

  const { data: allOlympiadsData } = useAllOlympiadsQuery();

  const handleClick = (id: string) => {
    router.push(`/student/${id}`);
  };

  const handleViewOlympiads = (student: any, event: React.MouseEvent) => {
    event.stopPropagation();

    const olympiadIds = getStudentOlympiads(student);

    const olympiadDetails = olympiadIds
      .map((olympiadId: any) => {
        const olympiad = allOlympiadsData?.allOlympiads?.find(
          (o: any) => o.id === olympiadId,
        );

        if (olympiad) {
          let medalType = "";
          let medalColor = "";
          let medalCount = 0;

          if (student.gold?.includes(olympiadId)) {
            medalType = "Алт";
            medalColor = "text-yellow-600";
            medalCount = student.gold.filter(
              (id: string) => id === olympiadId,
            ).length;
          } else if (student.silver?.includes(olympiadId)) {
            medalType = "Мөнгө";
            medalColor = "text-gray-500";
            medalCount = student.silver.filter(
              (id: string) => id === olympiadId,
            ).length;
          } else if (student.bronze?.includes(olympiadId)) {
            medalType = "Хүрэл";
            medalColor = "text-amber-600";
            medalCount = student.bronze.filter(
              (id: string) => id === olympiadId,
            ).length;
          }

          return {
            id: olympiadId,
            name: olympiad.name,
            medalType,
            medalColor,
            medalCount,
            rankingType: olympiad.rankingType,
            location: olympiad.location,
          };
        }
        return null;
      })
      .filter(Boolean);

    setSelectedOlympiads(olympiadDetails);
  };

  const { allStudents, loading, error } = useStudentRanking();

  console.log("yu yu nbaina:", allStudents);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStudentsName(event.target.value);
  };

  const filteredUsers = allStudents
    .filter((user) => {
      const matchesName = user.name
        ?.toLowerCase()
        .includes(searchStudentsName.toLowerCase());
      const matchesClass =
        selectedCity === "All Classes" || user.class === selectedCity;
      const matchesProvince =
        selectedOrg === "All Provinces" || user.province === selectedOrg;

      return matchesName && matchesClass && matchesProvince;
    })
    .sort((a, b) => b.totalMedals - a.totalMedals); // Sort by points (total medals) descending

  const medalStats = getMedalStats(filteredUsers);

  const uniqueClasses = Array.from(
    new Set(allStudents.map((student) => student.class)),
  ).filter(Boolean);
  const uniqueProvinces = Array.from(
    new Set(allStudents.map((student) => student.province)),
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Student Rankings
          </h1>

          <div className="flex flex-wrap gap-6 mb-8">
            {Object.entries(medalStats).map(([medalType, stats]) => {
              const IconComponent = stats.icon;
              return (
                <div key={medalType} className="flex items-center gap-2">
                  <IconComponent className={`w-6 h-6 ${stats.color}`} />
                  <span className="text-lg font-semibold text-gray-700">
                    {stats.count}{" "}
                    {medalType.charAt(0).toUpperCase() + medalType.slice(1)}{" "}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by username"
              value={searchStudentsName}
              onChange={handleChangeSearch}
              className=" pl-10  text-black bg-white  focus:outline-none  focus:border-black "
            />
          </div>

          <div className="flex gap-4 text-black">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4" />
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-48 bg-white text-black border border-gray-300">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border border-gray-300">
                  <SelectItem
                    value="All Classes"
                    className="text-black focus:bg-[#ff8300]"
                  >
                    All Classes
                  </SelectItem>
                  {uniqueClasses.map((className) => (
                    <SelectItem
                      key={className}
                      value={className}
                      className="text-black focus:bg-[#ff8300]"
                    >
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                <SelectTrigger className="w-48 bg-white text-black border border-gray-300">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border border-gray-300">
                  <SelectItem
                    value="All Provinces"
                    className="text-black focus:bg-[#ff8300]"
                  >
                    All Provinces
                  </SelectItem>
                  {uniqueProvinces.map((province) => (
                    <SelectItem
                      key={province}
                      value={province}
                      className="text-black focus:bg-[#ff8300]"
                    >
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Olympiads
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleClick(user.id)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-gray-900">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getTierIcon(user.ranking)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* <div className="w-10 h-10 rounded-full overflow-hidden">
                          {user.profilePicture ? (
                            <Image
                              src={user.profilePicture}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-600 font-medium">
                                {user.name?.charAt(0)?.toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div> */}
                        <span className="font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">-</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-700">
                            {user.goldCount}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {user.silverCount}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-gray-700">
                            {user.bronzeCount}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {user.ranking}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 bg-white text-black border "
                            onClick={(e) => handleViewOlympiads(user, e)}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white text-black border border-gray-300 p-4 w-96">
                          <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-600" />
                            Шагнал авсан олимпиадууд
                          </h4>
                          {selectedOlympiads.length > 0 ? (
                            <div className="space-y-3">
                              {selectedOlympiads.map((olympiad: any, idx) => (
                                <div
                                  key={idx}
                                  className="border-l-4 border-gray-200 pl-3 py-2"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-gray-900">
                                      {olympiad.name}
                                    </span>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${olympiad.medalColor} bg-gray-100`}
                                    >
                                      {olympiad.medalType}-{olympiad.medalCount}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-3 h-3" />
                                      <span>{olympiad.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Award className="w-3 h-3" />
                                      <span>{olympiad.rankingType}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm text-center py-4">
                              Энэ сурагч шагнал авсан олимпиад байхгүй байна
                            </p>
                          )}
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline" className="px-6 py-2 bg-black text-white">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};
