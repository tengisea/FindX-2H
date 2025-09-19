import {
  Trophy,
  ArrowRight,
  Lock,
  GraduationCap,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Section = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-gray-700">
              <Trophy className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-medium">
                Educational Excellence Platform
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <br />
                Elevate Academic
                <br />
                <span className="text-purple-600">Competition</span>
                <br />
                <span className="text-yellow-500">Excellence</span>
              </h1>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
              Streamline Olympiad competition management by connecting
              administrators, host organizations, and students through automated
              registration, real-time scoring, and dynamic ranking
              visualization.
            </p>

            <div className="grid grid-cols-3 gap-8 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">150+</div>
                <div className="text-sm text-gray-600">Host Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Competitions Held</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#F9CE69] hover:bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className=" bg-[#F9CE69] text-black px-8 py-4 text-lg font-semibold rounded-lg flex items-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                View Results
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>Certified Platform</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Trusted by Schools</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-[600px] bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center"></div>

              <div className="absolute top-6 right-6 bg-yellow-400 rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2 text-yellow-900">
                  <Trophy className="w-5 h-5" />
                  <div>
                    <div className="font-bold text-sm">Top Performer</div>
                    <div className="text-xs">Sa Chen - 2,450 pts</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-white rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-4 text-gray-800">
                  <div className="text-center">
                    <div className="font-bold text-lg">98%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">4.9</span>
                    </div>
                    <div className="text-xs text-gray-600">Rating</div>
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
