// FindX-2H/frontend/src/components/landingPage/background/FloatingAchievementStars.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const FloatingAchievementStars = () => {
  const starPositions = [
    { top: 83.91, left: 32.53, size: 15.85, duration: 7.2, delay: 1.3 },
    { top: 19.05, left: 59.08, size: 20.96, duration: 8.7, delay: 2.8 },
    { top: 11.11, left: 34.81, size: 14.03, duration: 6.4, delay: 0.9 },
    { top: 54.18, left: 79.82, size: 13.69, duration: 9.1, delay: 3.5 },
    { top: 46.00, left: 10.00, size: 14.16, duration: 7.8, delay: 4.2 },
    { top: 24.29, left: 80.60, size: 18.63, duration: 8.3, delay: 1.7 },
    { top: 70.35, left: 22.53, size: 19.26, duration: 6.9, delay: 2.4 },
    { top: 59.28, left: 14.31, size: 15.35, duration: 9.5, delay: 0.6 },
    { top: 48.37, left: 40.80, size: 14.42, duration: 7.6, delay: 3.1 },
    { top: 27.96, left: 41.88, size: 19.91, duration: 8.8, delay: 1.9 },
    { top: 19.54, left: 74.38, size: 19.72, duration: 6.7, delay: 4.6 },
    { top: 80.78, left: 66.58, size: 18.21, duration: 9.3, delay: 2.1 },
  ];

  return (
    <div className="absolute inset-0">
      {starPositions.map((star, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Star size={star.size} className="text-yellow-400/40" />
        </motion.div>
      ))}
    </div>
  );
};