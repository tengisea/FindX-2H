"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Menu,
  X,
  User,
  Trophy,
  Calendar,
  Award,
  FileText,
  Settings,
  BookOpen,
} from "lucide-react";
import { useGetStudentQuery } from "@/generated";
import { getCurrentStudentId } from "@/config/student";
import { getProvinceName } from "@/lib/province-utils";
import { useStudentRanking } from "@/hooks/useStudentRanking";

interface StudentStaggeredMenuProps {
  activeTab:
    | "profile"
    | "olympiads"
    | "participated"
    | "tournaments"
    | "results"
    | "achievements"
    | "mandats"
    | "settings";
  onTabChange: (
    tab:
      | "profile"
      | "olympiads"
      | "participated"
      | "tournaments"
      | "results"
      | "achievements"
      | "mandats"
      | "settings"
  ) => void;
  studentId?: string;
  position?: "left" | "right";
}

const getTabIcon = (tab: string, isActive: boolean = false) => {
  const iconClass = `w-6 h-6 transition-colors duration-200 ${
    isActive ? "text-[#FF8400]" : "text-gray-600"
  }`;

  switch (tab) {
    case "profile":
      return <User className={iconClass} />;
    case "olympiads":
      return <Trophy className={iconClass} />;
    case "participated":
      return <Calendar className={iconClass} />;
    case "tournaments":
      return <Award className={iconClass} />;
    case "results":
      return <FileText className={iconClass} />;
    case "achievements":
      return <Trophy className={iconClass} />;
    case "mandats":
      return <BookOpen className={iconClass} />;
    case "settings":
      return <Settings className={iconClass} />;
    default:
      return null;
  }
};

const getTabLabel = (tab: string) => {
  switch (tab) {
    case "profile":
      return "Profile";
    case "olympiads":
      return "Olympiads";
    case "participated":
      return "Participated";
    case "tournaments":
      return "Tournaments";
    case "results":
      return "Results";
    case "achievements":
      return "Achievements";
    case "mandats":
      return "Mandats";
    case "settings":
      return "Settings";
    default:
      return tab;
  }
};

export const StudentStaggeredMenu = ({
  activeTab,
  onTabChange,
  studentId,
  position = "left",
}: StudentStaggeredMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentStudentId = studentId || getCurrentStudentId();

  // Get the actual ranking placement
  const { currentStudentRank } = useStudentRanking(currentStudentId);

  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
  } = useGetStudentQuery({
    variables: { getStudentId: currentStudentId },
    skip: !currentStudentId,
    errorPolicy: "all",
  });

  const student = studentData?.getStudent;

  const menuItems = [
    "profile",
    "olympiads",
    "participated",
    "results",
    "achievements",
    "mandats",
    "settings",
  ] as const;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (tab: typeof activeTab) => {
    onTabChange(tab);
    setIsOpen(false);
  };

  const menuVariants = {
    closed: {
      x: position === "right" ? "100%" : "-100%",
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: position === "right" ? 50 : -50,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    closed: {
      rotate: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      rotate: 90,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {/* Menu Button */}
      <motion.button
        className="fixed z-[9999] p-4 rounded-full shadow-lg cursor-pointer border-2 bg-white"
        style={{
          [position]: "20px",
          top: "20px",
          backgroundColor: isOpen ? "#FF8400" : "#ffffff",
          color: isOpen ? "#ffffff" : "#FF8400",
          borderColor: "#FF8400",
          minWidth: "48px",
          minHeight: "48px",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMenu();
        }}
        variants={buttonVariants}
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Menu Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="menu-panel"
            className="fixed top-0 z-[9998] h-full w-80 flex flex-col shadow-2xl bg-white"
            style={{
              [position]: 0,
            }}
            variants={menuVariants as Variants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            {/* Menu Items */}
            <motion.nav
              className="flex-1 flex flex-col justify-center px-8"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {menuItems.map((tab, index) => (
                <motion.div
                  key={tab}
                  variants={itemVariants as Variants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleMenuItemClick(tab)}
                    className={`w-full flex items-center justify-start space-x-4 text-2xl font-medium transition-colors duration-200 py-3 px-4 rounded-lg ${
                      activeTab === tab
                        ? "text-[#FF8400] bg-[#FF8400]/10"
                        : "text-gray-700 hover:text-[#FF8400] hover:bg-gray-50"
                    }`}
                    aria-label={`Go to ${getTabLabel(tab)}`}
                  >
                    <span
                      className="text-4xl font-bold opacity-50"
                      style={{ color: "#FF8400" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{getTabLabel(tab)}</span>
                  </button>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
