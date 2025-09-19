// FindX-2H/frontend/src/components/landingPage/background/AchievementIcons.tsx
"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Trophy,
  Star,
  Award,
  Medal,
  Crown,
  Target
} from "lucide-react";

export const AchievementIcons = () => {
  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

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
        className="absolute top-24 right-32"
        variants={pulseVariants}
        animate="animate"
      >
        <Trophy size={64} className="text-yellow-500/60" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-40 left-32"
        variants={pulseVariants}
        animate="animate"
        transition={{ delay: 1.5 }}
      >
        <Medal size={56} className="text-blue-500/60" />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 right-20"
        variants={pulseVariants}
        animate="animate"
        transition={{ delay: 3 }}
      >
        <Award size={48} className="text-purple-500/60" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 left-1/4"
        variants={pulseVariants}
        animate="animate"
        transition={{ delay: 4.5 }}
      >
        <Crown size={52} className="text-indigo-500/60" />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/3 left-20"
        variants={rotateVariants}
        animate="animate"
      >
        <Star size={40} className="text-yellow-400/50" />
      </motion.div>
      
      <motion.div 
        className="absolute top-2/3 right-16"
        variants={rotateVariants}
        animate="animate"
        transition={{ delay: 2 }}
      >
        <Target size={36} className="text-red-400/50" />
      </motion.div>
    </div>
  );
};