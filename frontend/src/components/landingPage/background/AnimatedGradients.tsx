// FindX-2H/frontend/src/components/landingPage/background/AnimatedGradients.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export const AnimatedGradients = () => {
  return (
    <>
      {/* Vibrant Multi-layer Gradients */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-yellow-100"
        animate={{
          background: [
            "linear-gradient(135deg, #dbeafe 0%, #faf5ff 50%, #fef3c7 100%)",
            "linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #fed7aa 100%)",
            "linear-gradient(135deg, #dbeafe 0%, #faf5ff 50%, #fef3c7 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      {/* Animated Overlay Gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
    </>
  );
};