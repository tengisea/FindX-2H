// FindX-2H/frontend/src/components/landingPage/background/FlameElements.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";

export const FlameElements = () => {
  return (
    <div className="absolute inset-0">
      <motion.div 
        className="absolute top-16 left-1/2 transform -translate-x-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Flame size={48} className="text-orange-400/50" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-16 right-1/2 transform translate-x-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <Zap size={40} className="text-blue-400/50" />
      </motion.div>
    </div>
  );
};