// export const StudentRanking = () => {
//   return (
//     <div className="container mx-auto p-6  mt-10">
//       <div className="text-center mb-8">
//         <div className="flex items-center justify-center mb-4">
//           <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center mr-2">
//             <svg
//               className="w-4 h-4 text-white"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//           <span className="text-sm font-medium text-gray-600">
//             Top Performers
//           </span>
//         </div>

//         <h2 className="text-4xl font-bold text-gray-800 mb-4">
//           Student Rankings & Achievements
//         </h2>

//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Discover our top-performing students and their remarkable academic
//           achievements across various Olympiad competitions.
//         </p>
//       </div>

//       <div className="flex justify-center mb-8">
//         <div className="flex  rounded-lg p-1">
//           <button className="px-6 py-2 bg-[#F9CE69] text-white rounded-md font-medium transition-colors">
//             All Time
//           </button>
//           <button className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-md transition-colors">
//             This Year
//           </button>
//           <button className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-md transition-colors">
//             This Month
//           </button>
//           <button className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-md transition-colors">
//             This Week
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="relative bg-white rounded-lg shadow-lg p-6 border border-gray-100">
//           <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//             <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
//               <svg
//                 className="w-5 h-5 text-yellow-800"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             </div>
//           </div>

//           <div className="flex justify-center mb-4 mt-4">
//             <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
//               <svg
//                 className="w-8 h-8 text-gray-400"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div className="text-center mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">Sarah Chen</h3>
//             <p className="text-gray-600">Lincoln High School</p>
//           </div>

//           <div className="text-center mb-4">
//             <div className="text-3xl font-bold text-blue-600 mb-1">2,450</div>
//             <p className="text-sm text-gray-500">Total Points</p>
//           </div>

//           <div className="flex justify-between mb-4 text-sm">
//             <div className="text-center">
//               <div className="font-semibold text-gray-800">8</div>
//               <div className="text-gray-500">Competitions</div>
//             </div>
//             <div className="text-center">
//               <div className="font-semibold text-gray-800">92.5%</div>
//               <div className="text-gray-500">Avg Score</div>
//             </div>
//           </div>

//           <div className="flex items-center justify-center">
//             <svg
//               className="w-4 h-4 text-gray-600 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
//             </svg>
//             <span className="text-sm text-gray-700">Math Olympiad Winner</span>
//           </div>

//           <div className="absolute top-4 right-4">
//             <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//               <svg
//                 className="w-3 h-3 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="relative bg-white rounded-lg shadow-lg p-6 border border-gray-100">
//           <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//             <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
//               <span className="text-white font-bold text-sm">2</span>
//             </div>
//           </div>

//           <div className="flex justify-center mb-4 mt-4">
//             <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
//               <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">MJ</span>
//               </div>
//             </div>
//           </div>

//           <div className="text-center mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">
//               Marcus Johnson
//             </h3>
//             <p className="text-gray-600">Roosevelt Academy</p>
//           </div>

//           <div className="text-center mb-4">
//             <div className="text-3xl font-bold text-blue-600 mb-1">2,380</div>
//             <p className="text-sm text-gray-500">Total Points</p>
//           </div>

//           <div className="flex justify-between mb-4 text-sm">
//             <div className="text-center">
//               <div className="font-semibold text-gray-800">7</div>
//               <div className="text-gray-500">Competitions</div>
//             </div>
//             <div className="text-center">
//               <div className="font-semibold text-gray-800">89.2%</div>
//               <div className="text-gray-500">Avg Score</div>
//             </div>
//           </div>

//           <div className="flex items-center justify-center">
//             <svg
//               className="w-4 h-4 text-gray-600 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
//             </svg>
//             <span className="text-sm text-gray-700">Physics Champion</span>
//           </div>

//           <div className="absolute top-4 right-4">
//             <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//               <svg
//                 className="w-3 h-3 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="relative bg-white rounded-lg shadow-lg p-6 border border-gray-100">
//           <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//             <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
//               <span className="text-white font-bold text-sm">3</span>
//             </div>
//           </div>

//           <div className="flex justify-center mb-4 mt-4">
//             <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
//               <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">ER</span>
//               </div>
//             </div>
//           </div>

//           <div className="text-center mb-4">
//             <h3 className="text-xl font-bold text-gray-800 mb-1">
//               Emma Rodriguez
//             </h3>
//             <p className="text-gray-600">Washington Prep</p>
//           </div>

//           <div className="text-center mb-4">
//             <div className="text-3xl font-bold text-blue-600 mb-1">2,320</div>
//             <p className="text-sm text-gray-500">Total Points</p>
//           </div>

//           <div className="flex justify-between mb-4 text-sm">
//             <div className="text-center">
//               <div className="font-semibold text-gray-800">9</div>
//               <div className="text-gray-500">Competitions</div>
//             </div>
//             <div className="text-center">
//               <div className="font-semibold text-gray-800">87.8%</div>
//               <div className="text-gray-500">Avg Score</div>
//             </div>
//           </div>

//           <div className="flex items-center justify-center">
//             <svg
//               className="w-4 h-4 text-gray-600 mr-2"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
//             </svg>
//             <span className="text-sm text-gray-700">Chemistry Excellence</span>
//           </div>

//           <div className="absolute top-4 right-4">
//             <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//               <svg
//                 className="w-3 h-3 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
