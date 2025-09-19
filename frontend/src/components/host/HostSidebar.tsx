"use client";

import React from "react";
import StaggeredMenu from "@/components/ui/StaggeredMenu";

interface HostSidebarProps {
    activeTab: "create" | "manage" | "results";
    onTabChange: (tab: "create" | "manage" | "results") => void;
    onExportData: () => void;
    onQuickCreate: () => void;
    olympiadCount: number;
}

const HostSidebar: React.FC<HostSidebarProps> = ({
    activeTab,
    onTabChange,
    onExportData,
    onQuickCreate,
    olympiadCount,
}) => {
    const menuItems = [
        {
            label: "Create Olympiad",
            ariaLabel: "Navigate to create olympiad page",
            link: "#create",
        },
        {
            label: "Manage Olympiads",
            ariaLabel: "Navigate to manage olympiads page",
            link: "#manage",
        },
        {
            label: "Manage Results",
            ariaLabel: "Navigate to manage results page",
            link: "#results",
        },
        {
            label: "Quick Create",
            ariaLabel: "Quick create new olympiad",
            link: "#quick-create",
        },
    ];

    const handleMenuItemClick = (link: string) => {
        switch (link) {
            case "#create":
                onTabChange("create");
                break;
            case "#manage":
                onTabChange("manage");
                break;
            case "#results":
                onTabChange("results");
                break;

            case "#quick-create":
                onQuickCreate();
                break;
            default:
                break;
        }
    };

    return (
        <StaggeredMenu
            position="left"
            items={menuItems}
            displaySocials={false}
            displayItemNumbering={true}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#ffffff"
            changeMenuColorOnOpen={true}
            colors={["#1441A1", "#9BBBFC",]} // Medium blue to dark blue gradient
            accentColor="#F9CE69" // Yellow accent
            onMenuItemClick={handleMenuItemClick}
            onMenuOpen={() => {
                // Optional: Add any side effects when menu opens
                console.log("Host sidebar opened");
            }}
            onMenuClose={() => {
                // Optional: Add any side effects when menu closes
                console.log("Host sidebar closed");
            }}
        />
    );
};

export default HostSidebar;