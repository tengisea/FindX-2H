"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}

export const PageTransition = ({ 
  children, 
  href, 
  className = "", 
  onClick 
}: PageTransitionProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    // Start the exit animation
    const element = document.getElementById('page-transition-overlay');
    if (element) {
      element.style.display = 'block';
    }
    
    // Navigate after a short delay to allow animation to start
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  return (
    <>
      <div onClick={handleClick} className={className}>
        {children}
      </div>
      
      <AnimatePresence>
        <motion.div
          id="page-transition-overlay"
          initial={{ y: -100, scaleY: 0 }}
          animate={{ y: 0, scaleY: 1 }}
          exit={{ y: 100, scaleY: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          style={{ 
            transformOrigin: "top",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: "none"
          }}
          className="bg-black"
        />
      </AnimatePresence>
    </>
  );
};
