"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trophy, Home, Menu, X, BookOpen } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHostClick = () => {
    router.push("/host");
  };

  const handleStudentClick = () => {
    router.push("/student");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 w-full bg-white backdrop-blur-md border-b border-gray-200 px-4 py-3 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex font-[800] text-2xl cursor-pointer group transition-all duration-300 hover:scale-105 relative"
          onClick={() => router.push("/")}
        >
          <span className="text-black group-hover:text-gray-600 transition-colors">
            Find
          </span>
          <Image
            src="/images/Remove.png"
            alt="logo"
            width={40}
            height={40}
            className="absolute top-0.5 right-[-30px]"
          />
        </div>

        <div className="hidden md:flex items-center gap-1.5">
          <Link
            href="/"
            className={cn(
              "inline-flex h-7 items-center justify-center rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200 no-underline",
              pathname === "/"
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-gray-100 hover:bg-orange-500/10 border-gray-300 hover:border-orange-500/50 text-black hover:text-orange-400"
            )}
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>

          <Link
            href="/students-rankings"
            className={cn(
              "inline-flex h-7 items-center justify-center rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200 no-underline",
              pathname === "/students-rankings"
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-gray-100 hover:bg-orange-500/10 border-gray-300 hover:border-orange-500/50 text-black hover:text-orange-400"
            )}
          >
            <Trophy className="w-3.5 h-3.5 mr-1" />
            Ranking
          </Link>

          <button
            className={cn(
              "inline-flex h-7 items-center justify-center rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200",
              pathname === "/host"
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-gray-100 hover:bg-orange-500/10 border-gray-300 hover:border-orange-500/50 text-black hover:text-orange-400"
            )}
            onClick={handleHostClick}
          >
            Host
          </button>

          <button
            className={cn(
              "inline-flex h-7 items-center justify-center rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200",
              pathname === "/student"
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-gray-100 hover:bg-orange-500/10 border-gray-300 hover:border-orange-500/50 text-black hover:text-orange-400"
            )}
            onClick={handleStudentClick}
          >
            Student
          </button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-black hover:bg-gray-100 p-2"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pb-3">
          <Separator className="mb-3 bg-gray-300" />
          <nav className="flex flex-col space-y-2 px-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 no-underline",
                pathname === "/"
                  ? "text-orange-400 bg-orange-500/10 border border-orange-500/30"
                  : "text-black hover:text-orange-400 hover:bg-gray-100"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            <Link
              href="/olympiads"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 no-underline",
                pathname === "/olympiads"
                  ? "text-orange-400 bg-orange-500/10 border border-orange-500/30"
                  : "text-black hover:text-orange-400 hover:bg-gray-100"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="w-4 h-4" />
              Olympiads
            </Link>

            <Link
              href="/students-rankings"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 no-underline",
                pathname === "/students-rankings"
                  ? "text-orange-400 bg-orange-500/10 border border-orange-500/30"
                  : "text-black hover:text-orange-400 hover:bg-gray-100"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Trophy className="w-4 h-4" />
              Student Ranking
            </Link>

            <Separator className="my-2 bg-gray-300" />

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "justify-start transition-all duration-200",
                pathname === "/host"
                  ? "text-white bg-orange-500 border-orange-500 hover:bg-orange-600"
                  : "text-orange-400 border-orange-500/50 hover:bg-orange-500 hover:text-white"
              )}
              onClick={() => {
                handleHostClick();
                setMobileMenuOpen(false);
              }}
            >
              Host
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
