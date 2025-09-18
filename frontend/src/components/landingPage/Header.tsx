"use client";

import Image from "next/image";
import { Home } from "lucide-react";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const router = useRouter();

  const handleClickAnimation = () => {
    router.push("/example");
  };

  return (
    <header className=" border bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/Lucid.jpg"
                alt="OlympiadRank"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Open Platform
                </h1>
                <p className="text-sm text-gray-500">Educational Excellence</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <Button className="flex items-center space-x-2  bg-white text-black">
              <Trophy className="w-4 h-4" />
              Results
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              className="bg-blue-900 text-white"
              onClick={handleClickAnimation}
            >
              Host
            </Button>
            <Button className="bg-blue-900 text-white">Student</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
