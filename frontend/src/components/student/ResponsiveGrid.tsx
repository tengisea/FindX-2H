"use client";

import React from "react";
import { motion } from "framer-motion";

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { default: 1, sm: 2, lg: 3 },
  gap = "gap-4 sm:gap-6",
  className = "",
}) => {
  const getGridCols = () => {
    const colClasses = [];

    if (cols.default) {
      colClasses.push(`grid-cols-${cols.default}`);
    }
    if (cols.sm) {
      colClasses.push(`sm:grid-cols-${cols.sm}`);
    }
    if (cols.md) {
      colClasses.push(`md:grid-cols-${cols.md}`);
    }
    if (cols.lg) {
      colClasses.push(`lg:grid-cols-${cols.lg}`);
    }
    if (cols.xl) {
      colClasses.push(`xl:grid-cols-${cols.xl}`);
    }

    return colClasses.join(" ");
  };

  return (
    <div className={`grid ${getGridCols()} ${gap} ${className}`}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default ResponsiveGrid;
