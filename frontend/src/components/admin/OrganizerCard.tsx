"use client";

interface Organizer {
  id: string;
  organizationName: string;
  email: string;
  Olympiads: Array<{
    id: string;
    name: string;
  }>;
}

interface OrganizerCardProps {
  organizer: Organizer;
  index: number;
}

export const OrganizerCard = ({ organizer, index }: OrganizerCardProps) => {
  const olympiadCount = organizer.Olympiads?.length || 0;
  const getInitials = (name: string) => {
    return name.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-white">
                {getInitials(organizer.organizationName)}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{organizer.organizationName}</h3>
              <p className="text-blue-100 text-sm">Organization #{index + 1}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3">
              <div className="text-3xl font-bold">{olympiadCount}</div>
              <div className="text-blue-100 text-sm">Olympiads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Contact Info */}
        <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contact Email</p>
            <p className="font-semibold text-gray-900">{organizer.email}</p>
          </div>
        </div>

        {/* Olympiads Section */}
        {olympiadCount > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Organized Olympiads</h4>
              <span className="text-sm text-gray-500">{olympiadCount} total</span>
            </div>

            <div className="space-y-3">
              {organizer.Olympiads.map((olympiad, olympiadIndex) => (
                <div
                  key={olympiad.id || `organizer-olympiad-${olympiadIndex}`}
                  className="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 rounded-xl p-4 border border-gray-200 hover:border-blue-200 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {olympiadIndex + 1}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {olympiad.name}
                        </h5>
                        <p className="text-xs text-gray-500">Olympiad ID: {olympiad.id.slice(-8)}</p>
                      </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No Olympiads Yet</h4>
            <p className="text-gray-500 text-sm">This organizer hasn&apos;t created any olympiads.</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Active Organizer</span>
          </div>

          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
              View Details
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
