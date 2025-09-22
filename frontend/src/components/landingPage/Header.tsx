"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Home, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const router = useRouter();
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
    <header className="sticky top-0 w-full bg-black backdrop-blur-md border-b border-slate-800/50 px-4 py-3 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center font-bold text-2xl cursor-pointer group transition-all duration-300 hover:scale-105"
          onClick={() => router.push("/")}
        >
          <span className="text-white group-hover:text-slate-200 transition-colors">
            Find
          </span>
          <Badge variant="secondary" className="ml-1 bg-orange-500 hover:bg-orange-600 text-white border-none font-bold text-lg px-2 py-1">
            X
          </Badge>
        </div>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center gap-1.5">
          <Link href="/" className={cn(
            "inline-flex h-7 items-center justify-center rounded-md bg-slate-800/50 hover:bg-orange-500/10 border border-slate-700 hover:border-orange-500/50 px-2.5 py-1 text-xs font-medium text-white hover:text-orange-400 transition-all duration-200 no-underline"
          )}>
            <Home className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>
          
          <Link href="/students-rankings" className={cn(
            "inline-flex h-7 items-center justify-center rounded-md bg-slate-800/50 hover:bg-orange-500/10 border border-slate-700 hover:border-orange-500/50 px-2.5 py-1 text-xs font-medium text-white hover:text-orange-400 transition-all duration-200 no-underline"
          )}>
            <Trophy className="w-3.5 h-3.5 mr-1" />
            Ranking
          </Link>

          <button
            className="inline-flex h-7 items-center justify-center rounded-md bg-slate-800/50 hover:bg-orange-500/10 border border-slate-700 hover:border-orange-500/50 px-2.5 py-1 text-xs font-medium text-white hover:text-orange-400 transition-all duration-200"
            onClick={handleHostClick}
          >
            Host
          </button>
          
          <button
            className="inline-flex h-7 items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border border-orange-500 px-2.5 py-1 text-xs font-medium shadow-sm hover:shadow-orange-500/25 transition-all duration-200"
            onClick={handleStudentClick}
          >
            Student
          </button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-white hover:bg-slate-800 p-2"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pb-3">
          <Separator className="mb-3 bg-slate-700/50" />
          <nav className="flex flex-col space-y-2 px-2">
            <Link
              href="/"
              className="flex items-center gap-3 text-white hover:text-orange-400 hover:bg-slate-800/50 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            
            <Link
              href="/students-rankings"
              className="flex items-center gap-3 text-white hover:text-orange-400 hover:bg-slate-800/50 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Trophy className="w-4 h-4" />
              Student Ranking
            </Link>
            
            <Separator className="my-2 bg-slate-700/50" />
            
            <Button
              variant="outline"
              size="sm"
              className="justify-start text-orange-400 border-orange-500/50 hover:bg-orange-500 hover:text-white"
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