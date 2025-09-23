"use client";
import Image from "next/image";
import { Trophy, Lock, Shield, Users } from "lucide-react";
import {
  useGetAllStudentQuery,
  useAllOlympiadsQuery,
  useGetAllOrganizersQuery,
} from "@/generated";
import { useMemo } from "react";

export const Section = () => {
  const { data: studentsData } = useGetAllStudentQuery();
  const { data: olympiadsData } = useAllOlympiadsQuery();
  const { data: organizersData } = useGetAllOrganizersQuery();

  const stats = useMemo(() => {
    const students = studentsData?.getAllStudent || [];
    const olympiads = olympiadsData?.allOlympiads || [];
    const organizers = organizersData?.getAllOrganizers || [];

    // Calculate total competitions held (olympiads with status "FINISHED" or "CLOSED")
    const competitionsHeld = olympiads.filter(
      (olympiad) =>
        olympiad.status === "FINISHED" || olympiad.status === "CLOSED"
    ).length;

    // Get top performer (student with highest ranking)
    const topPerformer =
      students.length > 0
        ? students.reduce((top, student) =>
            student.ranking > top.ranking ? student : top
          )
        : null;

    return {
      activeStudents: students.length,
      hostOrganizations: organizers.length,
      competitionsHeld,
      topPerformer,
    };
  }, [studentsData, olympiadsData, organizersData]);

  return (
    <div className="px-6 pt-8 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                Тавтай <span className="text-[#ff8400]">морилно</span> уу
              </h1>
            </div>

            <p className="text-xl text-black leading-relaxed max-w-lg">
              Олимпиад зохион байгуулагч, сурагчдын автомат бүртгэл, шуурхай
              онооны систем, динамик ранкын дүрслэлээр холбон, олимпиадын
              удирдлагыг оновчтой болгоно.
            </p>

            <div className="grid grid-cols-3 gap-8 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ff8400]">
                  {stats.activeStudents.toLocaleString()}
                </div>
                <div className="text-sm text-black">Идэвхитэй сурагчид</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ff8400]">
                  {stats.hostOrganizations.toLocaleString()}
                </div>
                <div className="text-sm text-black">Зохион байгуулагчид</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ff8400]">
                  {stats.competitionsHeld.toLocaleString()}
                </div>
                <div className="text-sm text-black">
                  Зохион байгуулсан тэмцээнүүд
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-[800px] h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <Image
                  src="/images/section_image_2.png"
                  alt="Students collaborating"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-6 right-6 bg-white  rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-black-600">
                  <Trophy className="w-5 h-5 text-[#ff8400]" />
                  <div>
                    <div className="font-bold text-sm">Тэргүүлэгч сурагч</div>
                    <div className="text-xs text-black-600">
                      {stats.topPerformer
                        ? `${stats.topPerformer.name} - Байр #${1}`
                        : "Мэдээлэл олдсонгүй"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-white  rounded-xl px-4 py-3">
                <div className="flex items-center gap-4 text-black-600">
                  <div className="text-center">
                    <div className="font-bold text-lg text-[#ff8400]">
                      {stats.activeStudents > 0 ? "100%" : "0%"}
                    </div>
                    <div className="text-xs text-black-600">
                      Идэвхитэй сурагч
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-600"></div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-black-600">
                      <span className="font-bold text-lg text-[#ff8400]">
                        {stats.competitionsHeld > 0 ? "5.0" : "0.0"}
                      </span>
                    </div>
                    <div className="text-xs text-black-600">Үнэлгээ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
