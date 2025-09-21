// FindX-2H/frontend/src/components/landingPage/background/AnimatedGridPattern.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export const AnimatedGridPattern = () => {
  return (
    <motion.div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
      animate={{ 
        backgroundPosition: ["0px 0px", "60px 60px", "0px 0px"], 
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  );
};