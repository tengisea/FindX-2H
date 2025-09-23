"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ResponsiveLoadingProps {
  title?: string;
  message?: string;
  className?: string;
}

const ResponsiveLoading: React.FC<ResponsiveLoadingProps> = ({
  title = "Loading...",
  message = "Please wait while we load your data",
  className = "",
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 lg:py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center lg:text-left">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Loading Spinner */}
              <motion.div
                className="w-16 h-16 border-4 border-[#FF8400]/20 border-t-[#FF8400] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />

              {/* Loading Text */}
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600">{message}</p>
              </div>

              {/* Loading Dots */}
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-[#FF8400] rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsiveLoading;
