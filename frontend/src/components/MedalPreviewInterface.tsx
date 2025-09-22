// import React, { useState } from "react";
// import { useMedalPreview } from "../hooks/useMedalPreview";
// import {
//   UpdateMedalAssignmentsInput,
//   MedalType,
// } from "../types/medal-preview.types";

// interface MedalPreviewInterfaceProps {
//   olympiadId: string;
// }

// export const MedalPreviewInterface: React.FC<MedalPreviewInterfaceProps> = ({
//   olympiadId,
// }) => {
//   const {
//     currentFlowState,
//     medalPreviews,
//     olympiadData,
//     isLoading,
//     error,
//     handleFinishOlympiad,
//     handlePreviewMedals,
//     handleUpdateMedalAssignments,
//     handleFinalizeMedals,
//     canFinishOlympiad,
//     canPreviewMedals,
//     canUpdateAssignments,
//     canFinalizeMedals,
//     isFinished,
//     getMedalPreviewByClassType,
//     getTotalMedalists,
//     getTotalParticipants,
//     setError,
//   } = useMedalPreview(olympiadId);

//   const [editingAssignments, setEditingAssignments] = useState<
//     UpdateMedalAssignmentsInput[]
//   >([]);

//   const handleStartEditing = () => {
//     // Initialize editing assignments from current medal previews
//     const assignments: UpdateMedalAssignmentsInput[] = medalPreviews.map(
//       (preview) => ({
//         classTypeId: preview.classTypeId,
//         gold: preview.gold.map((student) => student.studentId),
//         silver: preview.silver.map((student) => student.studentId),
//         bronze: preview.bronze.map((student) => student.studentId),
//       })
//     );
//     setEditingAssignments(assignments);
//   };

//   const handleSaveAssignments = async () => {
//     await handleUpdateMedalAssignments(editingAssignments);
//     setEditingAssignments([]);
//   };

//   const handleCancelEditing = () => {
//     setEditingAssignments([]);
//   };

//   const updateAssignment = (
//     classTypeId: string,
//     medalType: MedalType,
//     studentIds: string[]
//   ) => {
//     setEditingAssignments((prev) =>
//       prev.map((assignment) =>
//         assignment.classTypeId === classTypeId
//           ? { ...assignment, [medalType]: studentIds }
//           : assignment
//       )
//     );
//   };

//   const getClassYearDisplayName = (classYear: string) => {
//     const yearMap: Record<string, string> = {
//       E_CLASS: "E-Class",
//       GRADE_1: "Grade 1",
//       GRADE_2: "Grade 2",
//       GRADE_3: "Grade 3",
//       GRADE_4: "Grade 4",
//       GRADE_5: "Grade 5",
//       GRADE_6: "Grade 6",
//       GRADE_7: "Grade 7",
//       GRADE_8: "Grade 8",
//       GRADE_9: "Grade 9",
//       GRADE_10: "Grade 10",
//       GRADE_11: "Grade 11",
//       GRADE_12: "Grade 12",
//     };
//     return yearMap[classYear] || classYear;
//   };

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-md p-4">
//         <div className="flex">
//           <div className="ml-3">
//             <h3 className="text-sm font-medium text-red-800">Error</h3>
//             <div className="mt-2 text-sm text-red-700">
//               <p>{error}</p>
//             </div>
//             <div className="mt-4">
//               <button
//                 onClick={() => setError(null)}
//                 className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
//               >
//                 Dismiss
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               {olympiadData?.name || "Olympiad"} - Medal Preview
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Status: <span className="font-medium">{currentFlowState}</span>
//             </p>
//           </div>
//           <div className="flex space-x-3">
//             {canFinishOlympiad && (
//               <button
//                 onClick={handleFinishOlympiad}
//                 disabled={isLoading}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {isLoading ? "Processing..." : "Finish Olympiad"}
//               </button>
//             )}
//             {canPreviewMedals && (
//               <button
//                 onClick={handlePreviewMedals}
//                 disabled={isLoading}
//                 className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
//               >
//                 {isLoading ? "Loading..." : "Refresh Preview"}
//               </button>
//             )}
//             {canFinalizeMedals && (
//               <button
//                 onClick={handleFinalizeMedals}
//                 disabled={isLoading}
//                 className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
//               >
//                 {isLoading ? "Finalizing..." : "Finalize Medals"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Statistics */}
//       {medalPreviews.length > 0 && (
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-lg font-medium text-gray-900 mb-4">Statistics</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <div className="text-2xl font-bold text-blue-600">
//                 {getTotalParticipants()}
//               </div>
//               <div className="text-sm text-blue-800">Total Participants</div>
//             </div>
//             <div className="bg-yellow-50 p-4 rounded-lg">
//               <div className="text-2xl font-bold text-yellow-600">
//                 {getTotalMedalists()}
//               </div>
//               <div className="text-sm text-yellow-800">Total Medalists</div>
//             </div>
//             <div className="bg-green-50 p-4 rounded-lg">
//               <div className="text-2xl font-bold text-green-600">
//                 {medalPreviews.length}
//               </div>
//               <div className="text-sm text-green-800">Class Types</div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Medal Previews */}
//       {medalPreviews.map((preview) => (
//         <div
//           key={preview.classTypeId}
//           className="bg-white shadow rounded-lg p-6"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-medium text-gray-900">
//               {getClassYearDisplayName(preview.classYear)}
//             </h3>
//             {canUpdateAssignments && editingAssignments.length === 0 && (
//               <button
//                 onClick={handleStartEditing}
//                 className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
//               >
//                 Edit Assignments
//               </button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Gold Medals */}
//             <div className="bg-yellow-50 p-4 rounded-lg">
//               <h4 className="font-medium text-yellow-800 mb-2">Gold Medals</h4>
//               <div className="space-y-1">
//                 {preview.gold.map((student, index) => (
//                   <div
//                     key={student.studentId}
//                     className="text-sm text-yellow-700"
//                   >
//                     {index + 1}. {student.studentName} ({student.score}pts)
//                   </div>
//                 ))}
//                 {preview.gold.length === 0 && (
//                   <div className="text-sm text-yellow-600 italic">
//                     No gold medals assigned
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Silver Medals */}
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h4 className="font-medium text-gray-800 mb-2">Silver Medals</h4>
//               <div className="space-y-1">
//                 {preview.silver.map((student, index) => (
//                   <div
//                     key={student.studentId}
//                     className="text-sm text-gray-700"
//                   >
//                     {index + 1}. {student.studentName} ({student.score}pts)
//                   </div>
//                 ))}
//                 {preview.silver.length === 0 && (
//                   <div className="text-sm text-gray-600 italic">
//                     No silver medals assigned
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Bronze Medals */}
//             <div className="bg-orange-50 p-4 rounded-lg">
//               <h4 className="font-medium text-orange-800 mb-2">
//                 Bronze Medals
//               </h4>
//               <div className="space-y-1">
//                 {preview.bronze.map((student, index) => (
//                   <div
//                     key={student.studentId}
//                     className="text-sm text-orange-700"
//                   >
//                     {index + 1}. {student.studentName} ({student.score}pts)
//                   </div>
//                 ))}
//                 {preview.bronze.length === 0 && (
//                   <div className="text-sm text-orange-600 italic">
//                     No bronze medals assigned
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Top 10 */}
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h4 className="font-medium text-blue-800 mb-2">Top 10</h4>
//               <div className="space-y-1">
//                 {preview.top10.map((student, index) => (
//                   <div
//                     key={student.studentId}
//                     className="text-sm text-blue-700"
//                   >
//                     {index + 1}. {student.studentName} ({student.score}pts)
//                   </div>
//                 ))}
//                 {preview.top10.length === 0 && (
//                   <div className="text-sm text-blue-600 italic">
//                     No top 10 assigned
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="mt-4 pt-4 border-t border-gray-200">
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>Participants: {preview.totalParticipants}</span>
//               <span>Medalists: {preview.medalists}</span>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Editing Controls */}
//       {editingAssignments.length > 0 && (
//         <div className="bg-white shadow rounded-lg p-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">
//             Edit Medal Assignments
//           </h3>
//           <p className="text-sm text-gray-600 mb-4">
//             You can now edit the medal assignments. Changes will be saved when
//             you click "Save Changes".
//           </p>
//           <div className="flex space-x-3">
//             <button
//               onClick={handleSaveAssignments}
//               disabled={isLoading}
//               className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
//             >
//               {isLoading ? "Saving..." : "Save Changes"}
//             </button>
//             <button
//               onClick={handleCancelEditing}
//               disabled={isLoading}
//               className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Completion Message */}
//       {isFinished && (
//         <div className="bg-green-50 border border-green-200 rounded-md p-4">
//           <div className="flex">
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-green-800">
//                 Medals Finalized!
//               </h3>
//               <div className="mt-2 text-sm text-green-700">
//                 <p>
//                   The olympiad has been completed and thank you emails have been
//                   sent to all participants.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
