"use client";

import React from "react";
import StaggeredMenu from "../../components/ui/StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export default function NavigationDemo() {
  return (
    <div style={{ height: "100vh", background: "#1a1a1a" }}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={["#ff8400", "#ffa500"]}
        logoUrl="/path-to-your-logo.svg"
        accentColor="#ff8400"
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />

      {/* Demo content */}
      <div className="flex items-center justify-center h-full text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Navigation Demo</h1>
          <p className="text-xl opacity-75">
            Click the menu button to see the staggered navigation in action!
          </p>
        </div>
      </div>
    </div>
  );
}
