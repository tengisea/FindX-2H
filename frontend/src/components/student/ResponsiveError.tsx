"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ResponsiveErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ResponsiveError: React.FC<ResponsiveErrorProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
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

      {/* Error Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Card className="bg-white border border-red-200 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"
              >
                <AlertCircle className="w-8 h-8 text-red-500" />
              </motion.div>

              {/* Error Text */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 max-w-md">{message}</p>
              </div>

              {/* Retry Button */}
              {onRetry && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={onRetry}
                    className="bg-[#FF8400] text-white hover:bg-[#FF8400]/90 flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsiveError;
