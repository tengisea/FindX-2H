"use client";

interface RegisteredTournamentsProps {
  studentId: string;
}

export const RegisteredTournaments = ({
  studentId,
}: RegisteredTournamentsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Registered Tournaments
      </h3>
      <div className="text-center py-8">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Registered Tournaments
        </h3>
        <p className="text-gray-600">
          You haven't registered for any tournaments yet.
        </p>
      </div>
    </div>
  );
};
