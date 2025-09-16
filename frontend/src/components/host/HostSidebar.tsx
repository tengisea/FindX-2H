'use client';

import { useGetOrganizerQuery } from '@/generated';

interface HostSidebarProps {
  activeTab: 'create' | 'manage';
  onTabChange: (tab: 'create' | 'manage') => void;
  olympiadCount: number;
}

export const HostSidebar = ({ activeTab, onTabChange, olympiadCount }: HostSidebarProps) => {
  const { data: organizerData, loading: organizerLoading } = useGetOrganizerQuery({
    variables: { id: '68c553d2dbdb1b5ed2b0e455' }
  });

  const organizer = organizerData?.getOrganizer;

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl border-r border-gray-200 z-10">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
              <p className="text-gray-600 text-sm">Manage your olympiads</p>
            </div>
          </div>

          {/* Organizer Info */}
          {organizerLoading ? (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : organizer ? (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {organizer.organizationName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {organizer.organizationName}
                  </h3>
                  <p className="text-xs text-gray-600 truncate">
                    {organizer.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-500">Organizer information not available</p>
            </div>
          )}
          
          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{olympiadCount}</div>
              <div className="text-sm text-blue-600">Total Olympiads</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <button
            onClick={() => onTabChange('create')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              activeTab === 'create' ? 'bg-white/20' : 'bg-blue-100'
            }`}>
              <svg className={`w-4 h-4 ${activeTab === 'create' ? 'text-white' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <div className="font-semibold">Create Olympiad</div>
              <div className={`text-xs ${activeTab === 'create' ? 'text-blue-100' : 'text-gray-500'}`}>
                Request new olympiad
              </div>
            </div>
          </button>

          <button
            onClick={() => onTabChange('manage')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              activeTab === 'manage'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              activeTab === 'manage' ? 'bg-white/20' : 'bg-purple-100'
            }`}>
              <svg className={`w-4 h-4 ${activeTab === 'manage' ? 'text-white' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <div className="font-semibold">Manage Olympiads</div>
              <div className={`text-xs ${activeTab === 'manage' ? 'text-blue-100' : 'text-gray-500'}`}>
                View and edit existing
              </div>
            </div>
          </button>
        </nav>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>ID: {organizer?.id || '68c553d2dbdb1b5ed2b0e455'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
