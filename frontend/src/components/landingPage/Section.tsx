"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, Lock, Shield, Users } from "lucide-react";

export const Section = () => {
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
                <div className="text-3xl font-bold text-orange-500">2,500+</div>
                <div className="text-sm text-gray-400">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">150+</div>
                <div className="text-sm text-gray-400">Host Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">500+</div>
                <div className="text-sm text-gray-400">Competitions Held</div>
              </div>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold rounded-lg flex items-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                View Results
              </Button>
            </div> */}

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
                      Sarah Chen - 2,450 pts
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-gray-800/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-gray-700">
                <div className="flex items-center gap-4 text-white">
                  <div className="text-center">
                    <div className="font-bold text-lg text-orange-500">98%</div>
                    <div className="text-xs text-gray-300">Success Rate</div>
                  </div>
                  <div className="w-px h-8 bg-gray-600"></div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-lg text-orange-500">
                        4.9
                      </span>
                    </div>
                    <div className="text-xs text-gray-300">Rating</div>
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
