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
import { getRankingTypeDisplayName } from "@/utils/rankingUtils";
import { mapClassToMongolian, mapClassToEnglish } from "@/utils/classUtils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const getMedalStats = (students: any[]) => {
  const goldStudents = students.filter(
    (student) => student.goldCount > 0
  ).length;
  const silverStudents = students.filter(
    (student) => student.silverCount > 0
  ).length;
  const bronzeStudents = students.filter(
    (student) => student.bronzeCount > 0
  ).length;

  return {
    gold: { count: goldStudents, icon: Crown, color: "text-yellow-600" },
    silver: { count: silverStudents, icon: Trophy, color: "text-" },
    bronze: { count: bronzeStudents, icon: Star, color: "text-a" },
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
    return <Award className="w-5 h-5 text-" />;
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
  const [selectedCity, setSelectedCity] = useState("12р анги");
  const [selectedOrg, setSelectedOrg] = useState("Бүх аймаг");
  const [selectedOlympiads, setSelectedOlympiads] = useState<any[]>([]);
  const [displayCount, setDisplayCount] = useState(10);

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
          (o: any) => o.id === olympiadId
        );

        if (olympiad) {
          let medalType = "";
          let medalColor = "";
          let medalCount = 0;

          if (student.gold?.includes(olympiadId)) {
            medalType = "Алт";
            medalColor = "text-yellow-600";
            medalCount = student.gold.filter(
              (id: string) => id === olympiadId
            ).length;
          } else if (student.silver?.includes(olympiadId)) {
            medalType = "Мөнгө";
            medalColor = "text-";
            medalCount = student.silver.filter(
              (id: string) => id === olympiadId
            ).length;
          } else if (student.bronze?.includes(olympiadId)) {
            medalType = "Хүрэл";
            medalColor = "text-amber-600";
            medalCount = student.bronze.filter(
              (id: string) => id === olympiadId
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
    setDisplayCount(10);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  const filteredUsers = allStudents
    .filter((user) => {
      const matchesName = user.name
        ?.toLowerCase()
        .includes(searchStudentsName.toLowerCase());

      const userClassMongolian = mapClassToMongolian(user.class);
      const matchesClass =
        selectedCity === "Бүх анги" || userClassMongolian === selectedCity;

      const matchesProvince =
        selectedOrg === "Бүх аймаг" || user.province === selectedOrg;

      return matchesName && matchesClass && matchesProvince;
    })
    .sort((a, b) => b.totalMedals - a.totalMedals);

  const displayedUsers = filteredUsers.slice(0, displayCount);
  const hasMoreUsers = displayCount < filteredUsers.length;

  const medalStats = getMedalStats(filteredUsers);

  const uniqueClasses = Array.from(
    new Set(allStudents.map((student) => mapClassToMongolian(student.class)))
  ).filter(Boolean);
  const uniqueProvinces = Array.from(
    new Set(allStudents.map((student) => student.province))
  ).filter(Boolean);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-6">
            Сурагчидын эрэмбэ
          </h1>

          {/* <div className="flex flex-wrap gap-6 mb-8">
            {Object.entries(medalStats).map(([medalType, stats]) => {
              const IconComponent = stats.icon;
              return (
                <div key={medalType} className="flex items-center gap-2">
                  <IconComponent className={`w-6 h-6 ${stats.color}`} />
                  <span className="text-lg font-semibold ">
                    {stats.count}{" "}
                    {medalType.charAt(0).toUpperCase() + medalType.slice(1)}{" "}
                  </span>
                </div>
              );
            })}
          </div> */}
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 " />
            <Input
              type="text"
              placeholder="Сурагчын нэрээр хайх"
              value={searchStudentsName}
              onChange={handleChangeSearch}
              className=" pl-10  text-black border-gray-300 focus:outline-none focus:border-orange-500 "
            />
          </div>

          <div className="flex gap-4 text-black">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4" />
              <Select
                value={selectedCity}
                onValueChange={(value) => {
                  setSelectedCity(value);
                  setDisplayCount(10);
                }}
              >
                <SelectTrigger className="w-48 text-black border-gray-300">
                  <SelectValue placeholder="Анги сонгох" />
                </SelectTrigger>
                <SelectContent className="text-black border-gray-300">
                  <SelectItem
                    value="Бүх анги"
                    className="text-black focus:bg-[#ff8300]"
                  >
                    Бүх анги
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
              <Select
                value={selectedOrg}
                onValueChange={(value) => {
                  setSelectedOrg(value);
                  setDisplayCount(10);
                }}
              >
                <SelectTrigger className="w-48 text-black border-gray-300">
                  <SelectValue placeholder="Аймаг сонгох" />
                </SelectTrigger>
                <SelectContent className="text-black border-gray-300">
                  <SelectItem
                    value="Бүх аймаг"
                    className="text-black focus:bg-[#ff8300]"
                  >
                    Бүх аймаг
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

        <div className="rounded-lg border border-gray-300 overflow-hidden">
          <div className="overflow-x-auto bg-white  ">
            <table className="w-full">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Эрэмбэ
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Төгсөгч
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Хэрэглэгч
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Бүртгүүлсэн огноо
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Шагнал
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Оноо
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Олимпиадууд
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {displayedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-200/50 transition-colors cursor-pointer"
                    onClick={() => handleClick(user.id)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-black">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getTierIcon(user.ranking)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                          {user.profilePicture &&
                          user.profilePicture.trim() !== "" &&
                          user.profilePicture !== ".////" &&
                          (user.profilePicture.startsWith("http") ||
                            user.profilePicture.startsWith("/") ||
                            user.profilePicture.startsWith("data:")) ? (
                            <Image
                              src={user.profilePicture}
                              alt={user.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextElementSibling?.classList.remove(
                                  "hidden"
                                );
                              }}
                            />
                          ) : null}
                          <span
                            className={` font-semibold text-lg ${
                              user.profilePicture &&
                              user.profilePicture.trim() !== "" &&
                              user.profilePicture !== ".////" &&
                              (user.profilePicture.startsWith("http") ||
                                user.profilePicture.startsWith("/") ||
                                user.profilePicture.startsWith("data:"))
                                ? "hidden"
                                : ""
                            }`}
                          >
                            {user.name?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-black text-lg">
                            {user.name}
                          </span>
                          <span className=" text-sm">
                            {mapClassToMongolian(user.class) ||
                              "Анги тодорхойгүй"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 ">-</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm ">{user.goldCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 " />
                          <span className="text-sm ">{user.silverCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-amber-600" />
                          <span className="text-sm ">{user.bronzeCount}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-black">
                        {user.ranking}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-black border-gray-300 hover:bg-gray-200"
                            onClick={(e) => handleViewOlympiads(user, e)}
                          >
                            <Eye className="w-4 h-4" />
                            Үзэх
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="text-black border-gray-300 p-4 w-96">
                          <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-600" />
                            Шагнал авсан олимпиадууд
                          </h4>
                          {selectedOlympiads.length > 0 ? (
                            <div className="space-y-3">
                              {selectedOlympiads.map((olympiad: any, idx) => (
                                <div
                                  key={idx}
                                  className="border-l-4 border-gray-300 pl-3 py-2"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-black">
                                      {olympiad.name}
                                    </span>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${olympiad.medalColor} `}
                                    >
                                      {olympiad.medalType}-{olympiad.medalCount}
                                    </span>
                                  </div>
                                  <div className="text-sm  space-y-1">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-3 h-3" />
                                      <span>{olympiad.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Award className="w-3 h-3" />
                                      <span>
                                        {getRankingTypeDisplayName(
                                          olympiad.rankingType
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className=" text-sm text-center py-4">
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

        {hasMoreUsers && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              className="px-6 py-2 text-black border-gray-300 hover:bg-gray-200"
              onClick={handleLoadMore}
            >
              Дараах үзэх
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
