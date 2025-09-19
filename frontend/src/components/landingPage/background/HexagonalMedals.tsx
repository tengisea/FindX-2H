// FindX-2H/frontend/src/components/landingPage/background/HexagonalMedals.tsx
"use client";
import React from 'react';
import { motion, Variants, ValueTransition } from 'framer-motion';

export const HexagonalMedals = () => {
  const rotateVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="absolute inset-0">
      <motion.div 
        className="absolute top-1/3 right-1/4 w-24 h-24 border-3 border-yellow-400/40"
        style={{ 
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
        }}
        variants={rotateVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-20 h-20 border-3 border-blue-400/40"
        style={{ 
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
        }}
        variants={rotateVariants}
        animate="animate"
        transition={{ delay: 2, direction: "reverse" as unknown as ValueTransition }}
      />    
      <motion.div 
        className="absolute top-2/3 left-16 w-16 h-16 border-3 border-purple-400/40"
        style={{ 
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
        }}
        variants={rotateVariants}
        animate="animate"
        transition={{ delay: 4 }}
      />
    </div>
  );
};