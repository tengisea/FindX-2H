// FindX-2H/frontend/src/components/landingPage/background/PodiumElements.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export const PodiumElements = () => {
  return (
    <motion.div 
      className="absolute bottom-20 left-20 flex items-end space-x-3 opacity-40"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 0.4 }}
      transition={{ duration: 2, delay: 1 }}
    >
      <motion.div 
        className="w-12 h-16 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-lg"
        animate={{ scaleY: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
      />
      <motion.div 
        className="w-12 h-20 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg"
        animate={{ scaleY: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="w-12 h-14 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg"
        animate={{ scaleY: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      />
    </motion.div>
  );
};