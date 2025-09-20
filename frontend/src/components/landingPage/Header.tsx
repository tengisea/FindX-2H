"use client";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export const Header = () => {
  return (
    <header className="relative w-full bg-[#0A0F1A] px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 rounded-lg p-2">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">OlympiadRank</h1>
            <p className="text-gray-400 text-sm">Educational Excellence</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            🏠 Home
          </a>
          <a
            href="/results"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            🏆 Results
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-white hover:text-orange-500 hover:bg-transparent"
          >
            Sign in
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};
