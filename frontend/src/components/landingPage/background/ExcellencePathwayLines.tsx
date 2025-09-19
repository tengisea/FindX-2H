// FindX-2H/frontend/src/components/landingPage/background/ExcellencePathwayLines.tsx
"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

export const ExcellencePathwayLines = () => {
  const slideVariants: Variants = {
    animate: {
      x: [-100, 100],
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }
    }
  };

  return (
    <div className="absolute inset-0">
      <motion.div 
        className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
        variants={slideVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
        variants={slideVariants}
        animate="animate"
        transition={{ delay: 5 }}
      />
      <motion.div 
        className="absolute top-3/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
        variants={slideVariants}
        animate="animate"
        transition={{ delay: 10 }}
      />
    </div>
  );
};