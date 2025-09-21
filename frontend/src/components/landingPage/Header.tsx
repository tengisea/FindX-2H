"use client";
import { Button } from "@/components/ui/button";
import { Trophy, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();

  const handleHostClick = () => {
    router.push("/host");
  };

  const handleStudentClick = () => {
    router.push("/student");
  };
  return (
    <header className="relative w-full bg-[#0A0F1A] px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          className="flex font-[800] text-2xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          Find
          <div className="flex font-[800] text-2xl text-orange-500">X</div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors no-underline"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            href="/students-rankings"
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors no-underline"
          >
            <Trophy className="w-4 h-4" /> Student Ranking
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            className="text-white  bg-orange-500  cursor-pointer"
            onClick={handleHostClick}
          >
            Host
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 cursor-pointer"
            onClick={handleStudentClick}
          >
            Student
          </Button>
        </div>
      </div>
    </header>
  );
};
