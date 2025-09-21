"use client";

interface AdminSidebarProps {
  activeTab: "pending" | "approved" | "all" | "organizers" | "tournaments";
  onTabChange: (tab: "pending" | "approved" | "all" | "organizers" | "tournaments") => void;
  pendingCount: number;
  approvedCount: number;
  allCount: number;
}

const getTabIcon = (tab: string, isActive: boolean) => {
  const iconClass = `w-5 h-5 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-400"}`;

  switch (tab) {
    case "pending":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "approved":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "all":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case "organizers":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "tournaments":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    default:
      return null;
  }
};

export const AdminSidebar = ({ activeTab, onTabChange, pendingCount, approvedCount, allCount }: AdminSidebarProps) => (
  <div className="w-80 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col h-screen fixed left-0 top-0 z-50">
    {/* Header */}
    <div className="p-8 pb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 text-sm">Olympiad Management</p>
        </div>
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-8 pb-8 overflow-y-auto">
      <div className="space-y-2">
        {[
          { id: "pending", label: "Pending Olympiads", count: pendingCount },
          { id: "approved", label: "Approved Olympiads", count: approvedCount },
          { id: "all", label: "All Olympiads", count: allCount },
          { id: "organizers", label: "Organizers", count: 0 },
          { id: "tournaments", label: "Tournaments", count: 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as "pending" | "approved" | "all" | "organizers" | "tournaments")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
          >
            <div className="flex items-center space-x-3">
              {getTabIcon(tab.id, activeTab === tab.id)}
              <span className="font-medium">{tab.label}</span>
            </div>
            {tab.count > 0 && (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-600 text-gray-300"
                }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>

    {/* Footer */}
    <div className="p-8 pt-6 border-t border-gray-700">
      <p className="text-gray-400 text-sm text-center">
        FindX Olympiad System v1.0.0
      </p>
    </div>
  </div>
);
