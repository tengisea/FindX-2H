// "use client";

// import { type GetAllOlympiadsQuery } from "@/generated";
// import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";

// interface OlympiadModalProps {
//   olympiad: GetAllOlympiadsQuery["allOlympiads"][0] | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const formatDate = (dateString: string) => {
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return "Date not set";
//     }
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   } catch {
//     return "Date not set";
//   }
// };

// export const OlympiadModal = ({
//   olympiad,
//   isOpen,
//   onClose,
// }: OlympiadModalProps) => {
//   if (!isOpen || !olympiad) return null;

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title={olympiad.name}
//       description={olympiad.description}
//       size="lg"
//     >
//       <ModalContent>
//         {/* Status and Basic Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-gray-50 rounded-xl p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Basic Information
//             </h3>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <svg
//                     className="w-4 h-4 text-blue-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Date</p>
//                   <p className="font-semibold text-gray-900">
//                     {formatDate(olympiad.date)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//                   <svg
//                     className="w-4 h-4 text-green-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Location</p>
//                   <p className="font-semibold text-gray-900">
//                     {olympiad.location}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <svg
//                     className="w-4 h-4 text-purple-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Organizer</p>
//                   <p className="font-semibold text-gray-900">
//                     {olympiad.organizer?.organizationName || "Unknown"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gray-50 rounded-xl p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Status & Awards
//             </h3>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3">
//                 <span
//                   className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
//                     olympiad.status === "APPROVED"
//                       ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
//                       : "bg-amber-100 text-amber-800 border border-amber-200"
//                   }`}
//                 >
//                   <div
//                     className={`w-2 h-2 rounded-full mr-2 ${
//                       olympiad.status === "APPROVED"
//                         ? "bg-emerald-500"
//                         : "bg-amber-500"
//                     }`}
//                   ></div>
//                   {olympiad.status}
//                 </span>
//               </div>

//               {olympiad.scoreOfAward && (
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
//                     <svg
//                       className="w-4 h-4 text-yellow-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Award Score</p>
//                     <p className="font-semibold text-gray-900">
//                       {olympiad.scoreOfAward}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Class Types Details */}
//         <div className="bg-gray-50 rounded-xl p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Class Types ({olympiad.classtypes.length})
//           </h3>
//           <div className="grid gap-4">
//             {olympiad.classtypes.map((classType) => (
//               <div
//                 key={classType.id}
//                 className="bg-white rounded-lg p-6 border border-gray-200"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h4 className="text-xl font-bold text-gray-900">
//                     {classType.classYear}
//                   </h4>
//                   <div className="text-right">
//                     <p className="text-sm text-gray-500">Max Score</p>
//                     <p className="text-2xl font-bold text-blue-600">
//                       {classType.maxScore}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div className="flex items-center space-x-2">
//                     <svg
//                       className="w-4 h-4 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
//                       />
//                     </svg>
//                     <span className="text-sm text-gray-500">Medalists:</span>
//                     <span className="font-semibold text-gray-900">
//                       {classType.medalists}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <svg
//                       className="w-4 h-4 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                       />
//                     </svg>
//                     <span className="text-sm text-gray-500">Questions:</span>
//                     <span className="font-semibold text-gray-900">
//                       {classType.questions.length}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Questions List */}
//                 <div className="border-t border-gray-200 pt-4">
//                   <h5 className="font-semibold text-gray-900 mb-3">
//                     Questions
//                   </h5>
//                   <div className="grid gap-2">
//                     {classType.questions.map((question) => (
//                       <div
//                         key={question.id}
//                         className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
//                       >
//                         <span className="font-medium text-gray-900">
//                           {question.questionName}
//                         </span>
//                         <span className="text-sm text-gray-500">
//                           Max Score: {question.maxScore}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </ModalContent>

//       <ModalFooter>
//         <button
//           onClick={onClose}
//           className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
//         >
//           Close
//         </button>
//       </ModalFooter>
//     </Modal>
//   );
// };
