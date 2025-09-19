// 'use client';

// import { useGetStudentQuery } from '@/generated';
// import { getCurrentStudentId } from '@/config/student';

// interface StudentSidebarProps {
//   activeTab: 'profile' | 'olympiads' | 'participated' | 'tournaments' | 'results' | 'achievements' | 'settings';
//   onTabChange: (tab: 'profile' | 'olympiads' | 'participated' | 'tournaments' | 'results' | 'achievements' | 'settings') => void;
//   studentId?: string;
// }

// const getTabIcon = (tab: string, isActive: boolean) => {
//   const iconClass = `w-5 h-5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400'}`;

//   switch (tab) {
//     case "profile":
//       return (
//         <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//         </svg>
//       );
//     case "olympiads":
//       return (
//         <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//         </svg>
//       );
//     case "participated":
//       return (
//         <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       );
//     case "tournaments":
//       return (
//         <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//         </svg>
//       );
//     case "results":
//       return (
//         <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//         </svg>
//       );
//     case "achievements":
//       return (
//         <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//         </svg>
//       );
//     case "settings":
//       return (
//         <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//       );
//     default:
//       return null;
//   }
// };

// export const StudentSidebar = ({ activeTab, onTabChange, studentId }: StudentSidebarProps) => {
//   const currentStudentId = studentId || getCurrentStudentId();

//   const { data: studentData, loading: studentLoading, error: studentError } = useGetStudentQuery({
//     variables: { id: currentStudentId },
//     skip: !currentStudentId,
//     errorPolicy: 'all'
//   });

//   const student = studentData?.getStudent;


//   return (
//     <div className="w-80 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col h-screen fixed left-0 top-0 z-50">
//       {/* Header */}
//       <div className="p-8 pb-6">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//             </svg>
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold">Student Portal</h1>
//             <p className="text-blue-200 text-sm">Olympiad Dashboard</p>
//           </div>
//         </div>

//         {/* Student Info */}
//         {studentLoading ? (
//           <div className="bg-blue-800/50 rounded-xl p-4 mb-4">
//             <div className="animate-pulse">
//               <div className="h-4 bg-blue-700 rounded w-3/4 mb-2"></div>
//               <div className="h-3 bg-blue-700 rounded w-1/2"></div>
//             </div>
//           </div>
//         ) : studentError ? (
//           <div className="bg-red-800/50 rounded-xl p-4 mb-4 border border-red-600/30">
//             <p className="text-sm text-red-300">Error loading student data</p>
//             <p className="text-xs text-red-400 mt-1">Please try refreshing the page</p>
//           </div>
//         ) : student ? (
//           <div className="bg-blue-800/50 rounded-xl p-4 mb-4 border border-blue-600/30">
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
//                 {student.profilePicture ? (
//                   <img
//                     src={student.profilePicture}
//                     alt={student.name}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-white font-bold text-lg">
//                     {student.name.charAt(0).toUpperCase()}
//                   </span>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-sm font-semibold text-white truncate">
//                   {student.name}
//                 </h3>
//                 <p className="text-xs text-blue-200 truncate">
//                   {student.school} • Grade {student.class}
//                 </p>
//                 <p className="text-xs text-blue-300 truncate">
//                   {student.location}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-blue-800/50 rounded-xl p-4 mb-4">
//             <p className="text-sm text-blue-300">Student information not available</p>
//           </div>
//         )}

//         {/* Stats */}
//         {student && (
//           <div className="grid grid-cols-2 gap-3 mb-4">
//             <div className="bg-blue-800/50 rounded-xl p-3 border border-blue-600/30">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-yellow-400">{student.totalScore || 0}</div>
//                 <div className="text-xs text-blue-200">Total Score</div>
//               </div>
//             </div>
//             <div className="bg-blue-800/50 rounded-xl p-3 border border-blue-600/30">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-green-400">{student.piPoints || 0}</div>
//                 <div className="text-xs text-blue-200">PI Points</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Participation Stats */}
//         {student && (
//           <button
//             onClick={() => onTabChange('participated')}
//             className="w-full bg-blue-800/50 rounded-xl p-4 border border-blue-600/30 hover:bg-blue-700/50 transition-colors duration-200"
//           >
//             <div className="text-center">
//               <div className="text-sm text-blue-200">Olympiads Participated</div>
//             </div>
//           </button>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-8 pb-8 overflow-y-auto">
//         <div className="space-y-2">
//           {[
//             { id: 'profile', label: 'Profile', description: 'View and edit profile' },
//             { id: 'olympiads', label: 'Olympiads', description: 'Browse and register' },
//             { id: 'participated', label: 'Participated', description: 'Your registered olympiads' },
//             { id: 'tournaments', label: 'Tournaments', description: 'Your registered tournaments' },
//             { id: 'results', label: 'Results', description: 'View your scores' },
//             { id: 'achievements', label: 'Achievements', description: 'Badges and medals' },
//             { id: 'settings', label: 'Settings', description: 'Account preferences' }
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => onTabChange(tab.id as 'profile' | 'olympiads' | 'participated' | 'tournaments' | 'results' | 'achievements' | 'settings')}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === tab.id
//                 ? 'bg-blue-600 text-white shadow-lg'
//                 : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
//                 }`}
//             >
//               {getTabIcon(tab.id, activeTab === tab.id)}
//               <div className="flex-1 text-left">
//                 <div className="font-medium">{tab.label}</div>
//                 <div className={`text-xs ${activeTab === tab.id ? 'text-blue-100' : 'text-blue-300'
//                   }`}>
//                   {tab.description}
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </nav>

//       {/* Footer */}
//       <div className="p-8 pt-6 border-t border-blue-700">
//         <div className="text-center">
//           <p className="text-blue-300 text-sm">
//             FindX Olympiad System
//           </p>
//           <p className="text-blue-400 text-xs mt-1">
//             Student Portal v1.0.0
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
