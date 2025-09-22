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
    <div className="bg-black min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Elevate Academic
                <br />
                <span className="text-orange-500">Competition</span>
                <br />
                Excellence
              </h1>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Streamline Olympiad competition management by connecting
              administrators, host organizations, and students through automated
              registration, real-time scoring, and dynamic ranking
              visualization.
            </p>

            <div className="grid grid-cols-3 gap-8 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {stats.activeStudents.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Идэвхитэй оюутан</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {stats.hostOrganizations.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Зохион байгуулагчид</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {stats.competitionsHeld.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">
                  Зохион байгуулсан тэмцээнүүд
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Lock className="w-4 h-4 text-green-500" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Certified Platform</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4 text-green-500" />
                <span>Trusted by Schools</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <Image
                  src="/images/photo.avif"
                  alt="Students collaborating"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-6 right-6 bg-gray-800/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-gray-700">
                <div className="flex items-center gap-2 text-white">
                  <Trophy className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="font-bold text-sm">Top Performer</div>
                    <div className="text-xs text-gray-300">
                      {stats.topPerformer
                        ? `${stats.topPerformer.name} - Rank #${1}`
                        : "No data available"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-gray-800/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-gray-700">
                <div className="flex items-center gap-4 text-white">
                  <div className="text-center">
                    <div className="font-bold text-lg text-orange-500">
                      {stats.activeStudents > 0 ? "100%" : "0%"}
                    </div>
                    <div className="text-xs text-gray-300">Active Rate</div>
                  </div>
                  <div className="w-px h-8 bg-gray-600"></div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-lg text-orange-500">
                        {stats.competitionsHeld > 0 ? "5.0" : "0.0"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-300">Platform Rating</div>
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
