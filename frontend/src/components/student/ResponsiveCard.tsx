"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResponsiveCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  title,
  className = "",
  hover = true,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      <Card
        className={`bg-white border border-gray-200 shadow-sm transition-all duration-300 ${
          hover ? "hover:shadow-lg hover:border-gray-300" : ""
        } ${className}`}
      >
        {title && (
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              {title}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-4 sm:p-6">{children}</CardContent>
      </Card>
    </motion.div>
  );
};

export default ResponsiveCard;
