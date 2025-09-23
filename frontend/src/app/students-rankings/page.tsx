"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StudentsRanking } from "@/components/studentsRanking";

const Rankings = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, scaleY: 0 }}
        animate={{ y: 0, scaleY: 1 }}
        exit={{ y: 100, scaleY: 0 }}
        transition={{
          duration: 1.0,
          ease: "easeOut",
        }}
        style={{ transformOrigin: "top" }}
        className="text-black"
      >
        <div className="h-screen w-full">
          <StudentsRanking />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Rankings;
