"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ResponsiveSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  delay?: number;
}

const ResponsiveSearch: React.FC<ResponsiveSearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative ${className}`}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-white text-gray-800 border-gray-300 focus:border-[#FF8400] focus:ring-[#FF8400] placeholder:text-gray-500 transition-colors duration-200"
        />
      </div>
    </motion.div>
  );
};

export default ResponsiveSearch;
