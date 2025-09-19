// "use client";

// import { useState } from "react";
// import {
//   useGetAllOlympiadsQuery,
//   useRequestOlympiadMutation,
//   useUpdateOlympiadMutation,
//   useDeleteOlympiadMutation,
//   ClassYear,
//   type CreateClassTypeInput,
// } from "@/generated";
// import { HostSidebar } from "@/components/host/HostSidebar";
// import { OlympiadForm } from "@/components/host/OlympiadForm";
// import { OlympiadList } from "@/components/host/OlympiadList";

// type TabType = "create" | "manage";

// const HostPage = () => {
//   const [activeTab, setActiveTab] = useState<TabType>("create");
//   const [editingOlympiad, setEditingOlympiad] = useState<any>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     date: "",
//     location: "",
//     organizerId: "68c553d2dbdb1b5ed2b0e455",
//   });

//   const [classTypes, setClassTypes] = useState<CreateClassTypeInput[]>([
//     {
//       classYear: ClassYear.Grade_5,
//       maxScore: 20, // Will be auto-calculated: 5+5+5+5 = 20
//       medalists: 3,
//       questions: [
//         { questionName: "Question 1", maxScore: 5 },
//         { questionName: "Question 2", maxScore: 5 },
//         { questionName: "Question 3", maxScore: 5 },
//         { questionName: "Question 4", maxScore: 5 },
//       ],
//     },
//   ]);

//   const {
//     data: olympiadsData,
//     loading: olympiadsLoading,
//     refetch: refetchOlympiads,
//   } = useGetAllOlympiadsQuery();
//   const [requestOlympiad] = useRequestOlympiadMutation({
//     onCompleted: () => {
//       refetchOlympiads();
//       resetForm();
//       // Show success notification instead of alert
//       console.log("Olympiad request submitted successfully!");
//     },
//     onError: (error) => {
//       console.error("Error creating olympiad:", error);
//       // Show error notification instead of alert
//       console.error("Failed to create olympiad request:", error.message);
//     },
//   });

//   const [updateOlympiad] = useUpdateOlympiadMutation({
//     onCompleted: () => {
//       refetchOlympiads();
//       resetForm();
//       console.log("Olympiad updated successfully!");
//     },
//     onError: (error) => {
//       console.error("Error updating olympiad:", error);
//       console.error("Failed to update olympiad:", error.message);
//     },
//   });

//   const [deleteOlympiad] = useDeleteOlympiadMutation({
//     onCompleted: () => {
//       refetchOlympiads();
//       console.log("Olympiad deleted successfully!");
//     },
//     onError: (error) => {
//       console.error("Error deleting olympiad:", error);
//       console.error("Failed to delete olympiad:", error.message);
//     },
//   });

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       date: "",
//       location: "",
//       organizerId: "68c553d2dbdb1b5ed2b0e455",
//     });
//     setClassTypes([
//       {
//         classYear: ClassYear.Grade_5,
//         maxScore: 20,
//         medalists: 3,
//         questions: [
//           { questionName: "Question 1", maxScore: 5 },
//           { questionName: "Question 2", maxScore: 5 },
//           { questionName: "Question 3", maxScore: 5 },
//           { questionName: "Question 4", maxScore: 5 },
//         ],
//       },
//     ]);
//     setEditingOlympiad(null);
//     setActiveTab("create");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       if (editingOlympiad) {
//         await updateOlympiad({
//           variables: {
//             updateOlympiadId: editingOlympiad.id,
//             input: {
//               description: formData.description,
//               date: formData.date,
//               location: formData.location,
//             },
//           },
//         });
//       } else {
//         await requestOlympiad({
//           variables: {
//             input: {
//               organizerId: formData.organizerId,
//               name: formData.name,
//               description: formData.description,
//               date: formData.date,
//               location: formData.location,
//               classtypes: classTypes,
//             },
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditOlympiad = (olympiad: any) => {
//     setFormData({
//       name: olympiad.name,
//       description: olympiad.description,
//       date: olympiad.date,
//       location: olympiad.location,
//       organizerId: "68c553d2dbdb1b5ed2b0e455",
//     });

//     const formattedClassTypes = olympiad.classtypes?.map((ct: any) => ({
//       classYear: ct.classYear,
//       maxScore: ct.maxScore,
//       medalists: ct.medalists,
//       questions:
//         ct.questions?.map((q: any) => ({
//           questionName: q.questionName,
//           maxScore: q.maxScore,
//         })) || [],
//     })) || [
//       {
//         classYear: ClassYear.Grade_5,
//         maxScore: 20,
//         medalists: 3,
//         questions: [
//           { questionName: "Question 1", maxScore: 5 },
//           { questionName: "Question 2", maxScore: 5 },
//           { questionName: "Question 3", maxScore: 5 },
//           { questionName: "Question 4", maxScore: 5 },
//         ],
//       },
//     ];

//     setClassTypes(formattedClassTypes);
//     setEditingOlympiad(olympiad);
//     setActiveTab("create");
//   };

//   const handleDeleteOlympiad = async (id: string) => {
//     if (
//       !confirm(
//         "Are you sure you want to delete this olympiad? This action cannot be undone."
//       )
//     ) {
//       return;
//     }

//     setIsDeleting(true);
//     try {
//       await deleteOlympiad({
//         variables: { deleteOlympiadId: id },
//       });
//     } catch (error) {
//       console.error("Delete error:", error);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const updateFormData = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const updateClassType = (index: number, field: string, value: any) => {
//     const updated = classTypes.map((classType, i) =>
//       i === index ? { ...classType, [field]: value } : classType
//     );
//     setClassTypes(updated);
//   };

//   const addClassType = () => {
//     setClassTypes([
//       ...classTypes,
//       {
//         classYear: ClassYear.Grade_5,
//         maxScore: 10,
//         medalists: 3,
//         questions: [
//           { questionName: "Question 1", maxScore: 5 },
//           { questionName: "Question 2", maxScore: 5 },
//         ],
//       },
//     ]);
//   };

//   const removeClassType = (index: number) => {
//     setClassTypes(classTypes.filter((_: any, i: number) => i !== index));
//   };

//   const addQuestion = (classTypeIndex: number) => {
//     const updated = [...classTypes];
//     updated[classTypeIndex].questions.push({
//       questionName: `Question ${updated[classTypeIndex].questions.length + 1}`,
//       maxScore: 5,
//     });

//     const totalMaxScore = updated[classTypeIndex].questions.reduce(
//       (sum: number, question: any) => {
//         const score = Number(question.maxScore) || 0;
//         return sum + score;
//       },
//       0
//     );
//     updated[classTypeIndex].maxScore = totalMaxScore;

//     setClassTypes(updated);
//   };

//   const removeQuestion = (classTypeIndex: number, questionIndex: number) => {
//     const updated = [...classTypes];
//     updated[classTypeIndex].questions = updated[
//       classTypeIndex
//     ].questions.filter((_: any, i: number) => i !== questionIndex);

//     const totalMaxScore = updated[classTypeIndex].questions.reduce(
//       (sum: number, question: any) => {
//         const score = Number(question.maxScore) || 0;
//         return sum + score;
//       },
//       0
//     );
//     updated[classTypeIndex].maxScore = totalMaxScore;

//     setClassTypes(updated);
//   };

//   const updateQuestion = (
//     classTypeIndex: number,
//     questionIndex: number,
//     field: string,
//     value: any
//   ) => {
//     const updated = classTypes.map((classType, ctIndex) =>
//       ctIndex === classTypeIndex
//         ? {
//             ...classType,
//             questions: classType.questions.map((question, qIndex) =>
//               qIndex === questionIndex
//                 ? { ...question, [field]: value }
//                 : question
//             ),
//           }
//         : classType
//     );

//     if (field === "maxScore") {
//       const totalMaxScore = updated[classTypeIndex].questions.reduce(
//         (sum, question) => {
//           const score = Number(question.maxScore) || 0;
//           return sum + score;
//         },
//         0
//       );
//       updated[classTypeIndex].maxScore = totalMaxScore;
//     }

//     setClassTypes(updated);
//   };

//   const myOlympiads =
//     olympiadsData?.allOlympiads?.filter(
//       (olympiad) => olympiad.organizer?.id === "68c553d2dbdb1b5ed2b0e455"
//     ) || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
//       <HostSidebar
//         activeTab={activeTab}
//         onTabChange={setActiveTab}
//         olympiadCount={myOlympiads.length}
//       />

//       <div className="ml-0 lg:ml-80 p-4 sm:p-6 lg:p-8 relative overflow-hidden min-h-screen">
//         {/* Mobile Header */}
//         <div className="lg:hidden mb-6">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Host Dashboard
//             </h1>
//             <p className="text-gray-600 mb-4">Manage your olympiads</p>

//             {/* Mobile Navigation */}
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setActiveTab("create")}
//                 className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   activeTab === "create"
//                     ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Create Olympiad
//               </button>
//               <button
//                 onClick={() => setActiveTab("manage")}
//                 className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   activeTab === "manage"
//                     ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Manage ({myOlympiads.length})
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Background Decorations */}
//         <div className="absolute inset-0 opacity-5 pointer-events-none">
//           <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl transform translate-x-16 sm:translate-x-32 -translate-y-16 sm:-translate-y-32"></div>
//           <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-tr from-amber-400 to-pink-600 rounded-full blur-3xl transform -translate-x-12 sm:-translate-x-24 translate-y-12 sm:translate-y-24"></div>
//         </div>

//         <div className="max-w-7xl mx-auto relative z-10">
//           {activeTab === "create" ? (
//             <OlympiadForm
//               formData={formData}
//               classTypes={classTypes}
//               editingOlympiad={editingOlympiad}
//               onSubmit={handleSubmit}
//               onUpdateFormData={updateFormData}
//               onUpdateClassType={updateClassType}
//               onAddClassType={addClassType}
//               onRemoveClassType={removeClassType}
//               onAddQuestion={addQuestion}
//               onRemoveQuestion={removeQuestion}
//               onUpdateQuestion={updateQuestion}
//               onResetForm={resetForm}
//               isSubmitting={isSubmitting}
//             />
//           ) : (
//             <OlympiadList
//               olympiads={myOlympiads}
//               loading={olympiadsLoading}
//               onEditOlympiad={handleEditOlympiad}
//               onDeleteOlympiad={handleDeleteOlympiad}
//               isDeleting={isDeleting}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HostPage;
