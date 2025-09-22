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

const getTabIcon = (tab: string, isActive: boolean) => {
  const iconClass = `w-5 h-5 transition-colors duration-200 ${isActive ? "text-primary-foreground" : "text-muted-foreground"
    }`;

  switch (tab) {
    case "create":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      );
    case "manage":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      );
    case "results":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      );
    default:
      return null;
  }
};

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
  ];

  return (
    <div className="w-80 bg-card border-r border-border text-card-foreground flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Header */}
      <div className="p-8 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-card-foreground">
              Host Portal
            </h1>
            <p className="text-muted-foreground text-sm">Olympiad Management</p>
          </div>
        </div>

        {/* Host Info */}
        <div className="bg-muted rounded-xl p-4 mb-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                H
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-card-foreground truncate">
                Host Organization
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                Olympiad Management System
              </p>
              <p className="text-xs text-muted-foreground/80 truncate">
                Administrative Access
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-muted rounded-xl p-3 border border-border">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {olympiadCount}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Olympiads
              </div>
            </div>
          </div>
          <div className="bg-muted rounded-xl p-3 border border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                1
              </div>
              <div className="text-xs text-muted-foreground">Organization</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-8 pb-8 overflow-y-auto">
        <div className="space-y-2">
          {[
            {
              id: "create",
              label: "Create Olympiad",
              description: "Create new olympiad",
            },
            {
              id: "manage",
              label: "Manage Olympiads",
              description: "View and edit olympiads",
            },
            {
              id: "results",
              label: "Manage Results",
              description: "View and export results",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                onTabChange(
                  tab.id as "create" | "manage" | "results",
                )
              }
              className={`w-full flex items-center justify-start space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              {getTabIcon(tab.id, activeTab === tab.id)}
              <div className="flex-1 text-left">
                <div className="font-medium">{tab.label}</div>
                <div
                  className={`text-xs ${activeTab === tab.id
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground/80"
                    }`}
                >
                  {tab.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-8 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">FindX Olympiad System</p>
          <p className="text-muted-foreground/80 text-xs mt-1">
            Host Portal v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostSidebar;
