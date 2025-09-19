"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface MenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}

interface SocialItem {
    label: string;
    link: string;
}

interface StaggeredMenuProps {
    position?: "left" | "right";
    items: MenuItem[];
    socialItems?: SocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    changeMenuColorOnOpen?: boolean;
    colors?: string[];
    logoUrl?: string;
    accentColor?: string;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    onMenuItemClick?: (link: string) => void;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = "right",
    items,
    socialItems = [],
    displaySocials = false,
    displayItemNumbering = false,
    menuButtonColor = "#fff",
    openMenuButtonColor = "#fff",
    changeMenuColorOnOpen = true,
    colors = ["#B19EEF", "#5227FF"],
    logoUrl,
    accentColor = "#ff6b6b",
    onMenuOpen,
    onMenuClose,
    onMenuItemClick,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (newState) {
            onMenuOpen?.();
        } else {
            onMenuClose?.();
        }
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

    const socialVariants = {
        closed: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.3,
            },
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1,
            },
        },
    };

    const socialItemVariants = {
        closed: {
            opacity: 0,
            scale: 0.8,
        },
        open: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.2,
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
                className="fixed z-[9999] p-4 rounded-full shadow-lg cursor-pointer border-2"
                style={{
                    [position]: "20px",
                    top: "20px",
                    backgroundColor:
                        changeMenuColorOnOpen && isOpen
                            ? openMenuButtonColor
                            : menuButtonColor,
                    color: isOpen ? "#4741A6" : "#4741A6",
                    borderColor: "#4741A6",
                    minWidth: "56px",
                    minHeight: "56px",
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

            {/* Overlay - removed to prevent full screen coverage */}

            {/* Menu Panel */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        key="menu-panel"
                        className="fixed top-0 z-[9998] h-full w-80 flex flex-col justify-center items-center shadow-2xl"
                        style={{
                            [position]: 0,
                            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                            backdropFilter: "blur(10px)",
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
                        {/* Logo */}
                        {logoUrl && (
                            <motion.div className="mb-12" variants={itemVariants as Variants}>
                                <img src={logoUrl} alt="Logo" className="h-16 w-auto" />
                            </motion.div>
                        )}

                        {/* Menu Items */}
                        <motion.nav
                            className="flex flex-col items-start space-y-8 px-8"
                            variants={{
                                open: {
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.2,
                                    },
                                },
                            }}
                        >
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    variants={itemVariants as Variants}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={item.link}
                                        className="flex items-center justify-start space-x-4 text-white text-2xl font-medium hover:text-gray-200 transition-colors duration-200"
                                        aria-label={item.ariaLabel}
                                        onClick={(e) => {
                                            if (onMenuItemClick) {
                                                e.preventDefault();
                                                onMenuItemClick(item.link);
                                                toggleMenu();
                                            } else {
                                                toggleMenu();
                                            }
                                        }}
                                    >
                                        {displayItemNumbering && (
                                            <span
                                                className="text-4xl font-bold opacity-50"
                                                style={{ color: accentColor }}
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        )}
                                        <span>{item.label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>

                        {/* Social Links - removed as requested */}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
=======
  label: string;
  ariaLabel: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: "left" | "right";
  items: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: string[];
  logoUrl?: string;
  accentColor?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onMenuItemClick?: (link: string) => void;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  items,
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = false,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  colors = ["#B19EEF", "#5227FF"],
  logoUrl,
  accentColor = "#ff6b6b",
  onMenuOpen,
  onMenuClose,
  onMenuItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState) {
      onMenuOpen?.();
    } else {
      onMenuClose?.();
    }
  };

  const menuVariants = {
    closed: {
      x: position === "right" ? "100%" : "-100%",
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
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

  const socialVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const socialItemVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
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
        className="fixed z-[9999] p-4 rounded-full shadow-lg cursor-pointer border-2"
        style={{
          [position]: "20px",
          top: "20px",
          backgroundColor:
            changeMenuColorOnOpen && isOpen
              ? openMenuButtonColor
              : menuButtonColor,
          color: isOpen ? "#4741A6" : "#4741A6",
          borderColor: "#4741A6",
          minWidth: "56px",
          minHeight: "56px",
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

      {/* Overlay - removed to prevent full screen coverage */}

      {/* Menu Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="menu-panel"
            className="fixed top-0 z-[9998] h-full w-80 flex flex-col justify-center items-center shadow-2xl"
            style={{
              [position]: 0,
              background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
              backdropFilter: "blur(10px)",
            }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Logo */}
            {logoUrl && (
              <motion.div className="mb-12" variants={itemVariants}>
                <img src={logoUrl} alt="Logo" className="h-16 w-auto" />
              </motion.div>
            )}

            {/* Menu Items */}
            <motion.nav
              className="flex flex-col items-start space-y-8 px-8"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.link}
                    className="flex items-center justify-start space-x-4 text-white text-2xl font-medium hover:text-gray-200 transition-colors duration-200"
                    aria-label={item.ariaLabel}
                    onClick={(e) => {
                      if (onMenuItemClick) {
                        e.preventDefault();
                        onMenuItemClick(item.link);
                        toggleMenu();
                      } else {
                        toggleMenu();
                      }
                    }}
                  >
                    {displayItemNumbering && (
                      <span
                        className="text-4xl font-bold opacity-50"
                        style={{ color: accentColor }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Social Links - removed as requested */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaggeredMenu;
