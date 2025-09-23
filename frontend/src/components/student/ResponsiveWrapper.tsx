"use client";

import React from "react";
import { motion } from "framer-motion";

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  title,
  className = "",
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 lg:py-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center lg:text-left"
            >
              {title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ResponsiveWrapper;
