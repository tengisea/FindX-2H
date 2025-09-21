"use client";

import { useQuery, gql } from "@apollo/client";

const GET_OLYMPIADS = gql`
  query GetAllOlympiads {
    allOlympiads {
      id
      name
    }
  }
`;
type Student = {
  id: string;
  name: string;
  email: string;
  school: string;
  class: string;
  district: string;
  province: string;
  profilePicture?: string;
  ranking: number;
  participatedOlympiads: string[];
  gold: string[];
  silver: string[];
  bronze: string[];
  rankingHistory: {
    changedBy: string;
    changedTo: number;
    reason: string;
    olympiadId: string;
    date: string;
    pointsGained: number;
  }[];
}

type StudentProfileHeaderProps = {
  student: Student;
  totalMedals: number;
  formatGrade: (classString: string) => string;
}

export const StudentProfileHeader = ({ 
  student, 
  totalMedals, 
  formatGrade, 
}: StudentProfileHeaderProps) => {
  // Fetch all olympiads to get names
  const { data: olympiadsData } = useQuery(GET_OLYMPIADS);
  
  // Create olympiad name mapping
  const getOlympiadName = (olympiadId: string) => {
    const olympiad = olympiadsData?.allOlympiads?.find((o: any) => o.id === olympiadId);
    return olympiad?.name || `Olympiad ${olympiadId.slice(-4)}`;
  };

  // Get recent activity (last 3 ranking changes)
  const recentActivity = student?.rankingHistory?.slice(-3).reverse() || [];
  
  // Helper function to safely format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString();
    } catch (error) {
      return "Invalid Date";
    }
  };
  return (
    <div className="bg-gradient-to-r from-card to-card/80 rounded-xl border border-border/30 p-5">
      <div className="flex items-center justify-between">
        {/* Left: Profile Info */}
        <div className="flex items-center space-x-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-primary/80">
              {student.profilePicture ? (
                <img
                  src={student.profilePicture}
                  alt={student.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
              ) : (
                <span className="font-bold text-xl text-white">
                  {student.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            {(() => {
              const ranking = Number(student.ranking);
              return ranking && ranking > 0 ? (
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                  #{student.ranking}
                </div>
              ) : null;
            })()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{student.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {student.district}, {student.province}
              </span>
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {student.school} • {formatGrade(student.class)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalMedals}</div>
            <div className="text-xs text-gray-500">Medals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {Array.isArray(student.participatedOlympiads) ? student.participatedOlympiads.length : 0}
            </div>
            <div className="text-xs text-gray-500">Olympiads</div>
          </div>
        </div>
        {recentActivity.length > 0 && (
          <div className="relative group">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">Recent Activity</div>
              <div className="text-xs text-gray-500">
                {getOlympiadName(recentActivity[0]?.olympiadId)} • {formatDate(recentActivity[0]?.date)}
              </div>
            </div>
            
            {/* Activity Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg max-w-xs">
                <div className="font-semibold mb-2 text-center">Recent Activity</div>
                <div className="space-y-1">
                  {recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="font-medium">{getOlympiadName(activity.olympiadId)}</div>
                      <div className="text-gray-400 text-xs">
                        {activity.reason} • {formatDate(activity.date)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
