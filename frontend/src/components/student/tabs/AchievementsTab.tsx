// "use client";

// import { formatDate } from "@/lib/dateUtils";
// import { GetStudentQuery } from "@/generated";

// type Student = GetStudentQuery["getStudent"];

// interface AchievementsTabProps {
//   student: any;
//   loading: boolean;
// }

// const AchievementsTab = ({ student, loading }: AchievementsTabProps) => {
//   return (
//     <div className="p-8 max-w-5xl mx-auto">
//       <h2
//         className="text-3xl font-bold mb-6 text-center"
//         style={{ color: "#4741A6" }}
//       >
//         Achievements & Badges
//       </h2>

//       <div className="space-y-6">
//         {/* Achievement Stats */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3
//             className="text-lg font-semibold mb-4 text-center"
//             style={{ color: "#4741A6" }}
//           >
//             Achievement Summary
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-yellow-50 rounded-lg">
//               <div className="text-2xl font-bold text-yellow-600">
//                 {Array.isArray(student?.gold) ? student.gold.length : 0}
//               </div>
//               <div className="text-sm text-yellow-600">Gold Medals</div>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <div className="text-2xl font-bold text-gray-600">
//                 {Array.isArray(student?.silver) ? student.silver.length : 0}
//               </div>
//               <div className="text-sm text-gray-600">Silver Medals</div>
//             </div>
//             <div className="text-center p-4 bg-orange-50 rounded-lg">
//               <div className="text-2xl font-bold text-orange-600">
//                 {Array.isArray(student?.bronze) ? student.bronze.length : 0}
//               </div>
//               <div className="text-sm text-orange-600">Bronze Medals</div>
//             </div>
//             <div className="text-center p-4 bg-blue-50 rounded-lg">
//               <div className="text-2xl font-bold text-blue-600">
//                 {Array.isArray(student?.top10) ? student.top10.length : 0}
//               </div>
//               <div className="text-sm text-blue-600">Top 10 Finishes</div>
//             </div>
//           </div>
//         </div>

//         {/* Badges */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3
//             className="text-lg font-semibold mb-4 text-center"
//             style={{ color: "#4741A6" }}
//           >
//             Achievement Badges
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               {
//                 id: "1",
//                 name: "First Olympiad",
//                 description: "Participated in your first olympiad",
//                 icon: "🏆",
//                 earned:
//                   Array.isArray(student?.participatedOlympiads) &&
//                   student.participatedOlympiads.length > 0,
//                 date: student?.createdAt,
//               },
//               {
//                 id: "2",
//                 name: "Gold Medalist",
//                 description: "Won a gold medal",
//                 icon: "🥇",
//                 earned: Array.isArray(student?.gold) && student.gold.length > 0,
//                 date: student?.createdAt,
//               },
//               {
//                 id: "3",
//                 name: "Consistent Performer",
//                 description: "Participated in multiple olympiads",
//                 icon: "🎯",
//                 earned:
//                   Array.isArray(student?.participatedOlympiads) &&
//                   student.participatedOlympiads.length >= 2,
//                 date: student?.createdAt,
//               },
//               {
//                 id: "4",
//                 name: "Top 10 Finisher",
//                 description: "Achieved top 10 rank",
//                 icon: "⭐",
//                 earned:
//                   Array.isArray(student?.top10) && student.top10.length > 0,
//                 date: student?.createdAt,
//               },
//             ].map((badge) => (
//               <div
//                 key={badge.id}
//                 className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
//                   badge.earned
//                     ? "border-yellow-300 bg-yellow-50 hover:bg-yellow-100"
//                     : "border-gray-200 bg-gray-50 opacity-60"
//                 }`}
//               >
//                 <div className="text-4xl mb-2">{badge.icon}</div>
//                 <h4
//                   className={`font-semibold mb-1 ${
//                     badge.earned ? "text-gray-900" : "text-gray-500"
//                   }`}
//                 >
//                   {badge.name}
//                 </h4>
//                 <p
//                   className={`text-xs mb-2 ${
//                     badge.earned ? "text-gray-600" : "text-gray-400"
//                   }`}
//                 >
//                   {badge.description}
//                 </p>
//                 {badge.earned && badge.date && (
//                   <p className="text-xs text-yellow-600 font-medium">
//                     Earned: {formatDate(badge.date)}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Medals */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Medals & Achievements
//           </h3>
//           <div className="space-y-4">
//             {(() => {
//               const medals: Array<{
//                 id: string;
//                 type: string;
//                 name: string;
//                 achievement: string;
//                 icon: string;
//                 date: string | undefined;
//                 description: string;
//               }> = [];

//               // Add gold medals
//               if (Array.isArray(student?.gold) && student.gold.length > 0) {
//                 student.gold.forEach((_, i) => {
//                   medals.push({
//                     id: `gold-${i}`,
//                     type: "medal",
//                     name: "Gold Medal",
//                     achievement: "Gold Medal Winner",
//                     icon: "🥇",
//                     date: student?.createdAt,
//                     description: "Outstanding performance in olympiad",
//                   });
//                 });
//               }

//               // Add silver medals
//               if (Array.isArray(student?.silver) && student.silver.length > 0) {
//                 student.silver.forEach((_, i) => {
//                   medals.push({
//                     id: `silver-${i}`,
//                     type: "medal",
//                     name: "Silver Medal",
//                     achievement: "Silver Medal Winner",
//                     icon: "🥈",
//                     date: student?.createdAt,
//                     description: "Excellent performance in olympiad",
//                   });
//                 });
//               }

//               // Add bronze medals
//               if (Array.isArray(student?.bronze) && student.bronze.length > 0) {
//                 student.bronze.forEach((_, i) => {
//                   medals.push({
//                     id: `bronze-${i}`,
//                     type: "medal",
//                     name: "Bronze Medal",
//                     achievement: "Bronze Medal Winner",
//                     icon: "🥉",
//                     date: student?.createdAt,
//                     description: "Good performance in olympiad",
//                   });
//                 });
//               }

//               // Add top 10 achievements
//               if (Array.isArray(student?.top10) && student.top10.length > 0) {
//                 student.top10.forEach((_, i) => {
//                   medals.push({
//                     id: `top10-${i}`,
//                     type: "achievement",
//                     name: "Top 10 Finish",
//                     achievement: "Top 10 Achievement",
//                     icon: "⭐",
//                     date: student?.createdAt,
//                     description: "Finished in top 10 participants",
//                   });
//                 });
//               }

//               return medals.length > 0 ? (
//                 medals.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
//                   >
//                     <div className="text-3xl">{item.icon}</div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-gray-900">
//                         {item.name}
//                       </h4>
//                       <p className="text-sm text-gray-600">
//                         {item.achievement}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {item.description}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-medium text-gray-900">
//                         {formatDate(item.date || "")}
//                       </p>
//                       <p className="text-xs text-gray-500 capitalize">
//                         {item.type}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8">
//                   <svg
//                     className="w-16 h-16 text-gray-400 mx-auto mb-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//                     />
//                   </svg>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     No Medals Yet
//                   </h3>
//                   <p className="text-gray-600">
//                     Participate in olympiads to earn medals and achievements.
//                   </p>
//                 </div>
//               );
//             })()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AchievementsTab;
