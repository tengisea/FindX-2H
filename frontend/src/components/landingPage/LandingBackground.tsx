// FindX-2H/frontend/src/components/landingPage/LandingBackground.tsx
"use client";
import React from "react";
import { AnimatedGradients } from "./background/AnimatedGradients";
import { OlympicRings } from "./background/OlympicRings";
import { AchievementIcons } from "./background/AchievementIcons";
import { PodiumElements } from "./background/PodiumElements";
import { HexagonalMedals } from "./background/HexagonalMedals";
import { AnimatedGridPattern } from "./background/AnimatedGridPattern";
import { ExcellencePathwayLines } from "./background/ExcellencePathwayLines";
import { FloatingAchievementStars } from "./background/FloatingAchievementStars";
import { FlameElements } from "./background/FlameElements";

export const OlympiadBackground = () => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <AnimatedGradients />
        <OlympicRings />
        <AchievementIcons />
        <PodiumElements />
        <HexagonalMedals />
        <AnimatedGridPattern />
        <ExcellencePathwayLines />
        <FloatingAchievementStars />
        <FlameElements />
      </div>

      <div className="fixed inset-0 bg-white/60 backdrop-blur-[0.2px] pointer-events-none z-0" />
    </>
  );
};