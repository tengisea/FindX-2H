"use client";

type Student = {
  gold: string[];
  silver: string[];
  bronze: string[];
};

type StudentAchievementsProps = {
  student: Student;
};

export const StudentAchievements = ({ student }: StudentAchievementsProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">Медалууд</h3>
        <div className="w-12 h-0.5 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {student.gold?.length || 0}
          </div>
          <div className="text-xs text-gray-500 font-medium">Алт</div>
        </div>

        <div className="text-center p-4 bg-white rounded-xl border border-gray-200 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-500/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-500 mb-1">
            {student.silver?.length || 0}
          </div>
          <div className="text-xs text-gray-500 font-medium">Мөнгө</div>
        </div>

        <div className="text-center p-4 bg-white rounded-xl border border-gray-200 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-600/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-amber-600 mb-1">
            {student.bronze?.length || 0}
          </div>
          <div className="text-xs text-gray-500 font-medium">Хүрэл</div>
        </div>
      </div>
    </div>
  );
};
