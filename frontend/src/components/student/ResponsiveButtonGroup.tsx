"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ButtonItem {
  id: string;
  label: string;
  count?: number;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  className?: string;
}

interface ResponsiveButtonGroupProps {
  buttons: ButtonItem[];
  activeButton: string;
  onButtonClick: (buttonId: string) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

const ResponsiveButtonGroup: React.FC<ResponsiveButtonGroupProps> = ({
  buttons,
  activeButton,
  onButtonClick,
  className = "",
  orientation = "horizontal",
}) => {
  const containerClass =
    orientation === "horizontal"
      ? "flex flex-wrap gap-2 sm:gap-3"
      : "flex flex-col gap-2 sm:gap-3";

  return (
    <div className={`${containerClass} ${className}`}>
      {buttons.map((button, index) => (
        <motion.div
          key={button.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Button
            variant={
              button.id === activeButton
                ? "default"
                : button.variant || "outline"
            }
            size="sm"
            onClick={() => onButtonClick(button.id)}
            className={`transition-all duration-200 ${
              button.id === activeButton
                ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-500"
            } ${button.className || ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {button.label}
            {button.count !== undefined && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-white bg-opacity-20 rounded-full">
                {button.count}
              </span>
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default ResponsiveButtonGroup;
