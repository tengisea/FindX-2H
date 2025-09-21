// FindX-2H/frontend/src/components/landingPage/background/OlympicRings.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

export const OlympicRings = () => {
  const floatVariants: Variants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="absolute inset-0">
      <motion.div 
        className="absolute top-20 left-1/4 w-72 h-72 rounded-full border-4 border-blue-400/30"
        variants={floatVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-32 right-1/4 w-64 h-64 rounded-full border-4 border-yellow-400/30"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-32 left-1/3 w-56 h-56 rounded-full border-4 border-purple-400/30"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full border-4 border-green-400/30"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 3 }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full border-4 border-red-400/30"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 4 }}
      />
    </div>
  );
};