"use client";

import { useState } from "react";
import { OlympiadForm } from "@/components/host/OlympiadForm";
import { ManageOlympiads } from "@/components/host/ManageOlympiads";
import { ManageResults } from "@/components/host/ManageResults";
import HostProfile from "@/components/host/HostProfile";
import HostSidebar from "@/components/host/HostSidebar";
import StaggeredMenu from "@/components/ui/StaggeredMenu";
import { useGetOrganizerQuery, ClassYear } from "@/generated";

type TabType = "profile" | "create" | "manage" | "results";

const HostPage = () => {
    const [activeTab, setActiveTab] = useState<TabType>("profile");
    const [editingOlympiad, setEditingOlympiad] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Hardcoded organizer ID
    const ORGANIZER_ID = "68d0cfd354ab6e0a0d6237f8";

    // Fetch real data from database
    const {
        data: organizerData,
        loading: organizerLoading,
        error: organizerError,
        refetch,
    } = useGetOrganizerQuery({
        variables: { getOrganizerId: ORGANIZER_ID },
        errorPolicy: "all",
    });

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        closeDay: undefined as Date | undefined,
        occurringDay: undefined as Date | undefined,
        location: "",
        organizerId: ORGANIZER_ID,
        invitation: false,
        rankingType: "SCHOOL" as any,
    });

    const [classTypes, setClassTypes] = useState<any[]>([
        {
            classYear: ClassYear.Grade_5,
            maxScore: 20,
            medalists: 3,
            occurringTime: "9:00",
            classRoom: null,
            questions: [
                { questionName: "Бодлого  1", maxScore: 5 },
                { questionName: "Бодлого  2", maxScore: 5 },
                { questionName: "Бодлого  3", maxScore: 5 },
                { questionName: "Бодлого  4", maxScore: 5 },
            ],
        },
    ]);

    const myOlympiads = organizerData?.getOrganizer?.Olympiads || [];

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            closeDay: undefined,
            occurringDay: undefined,
            location: "",
            organizerId: ORGANIZER_ID,
            invitation: false,
            rankingType: "SCHOOL" as any,
        });
        setClassTypes([
            {
                classYear: ClassYear.Grade_5,
                maxScore: 20,
                medalists: 3,
                occurringTime: "9:00",
                classRoom: null,
                questions: [
                    { questionName: "Бодлого  1", maxScore: 5 },
                    { questionName: "Бодлого  2", maxScore: 5 },
                    { questionName: "Бодлого  3", maxScore: 5 },
                    { questionName: "Бодлого  4", maxScore: 5 },
                ],
            },
        ]);
        setEditingOlympiad(null);
        setActiveTab("create");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Handle form submission
        setTimeout(() => {
            setIsSubmitting(false);
            resetForm();
            // Refetch data after form submission
            refetch();
        }, 1000);
    };

    const updateFormData = (
        field: string,
        value: string | boolean | Date | undefined
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const updateClassType = (index: number, field: string, value: any) => {
        const updated = classTypes.map((classType, i) =>
            i === index ? { ...classType, [field]: value } : classType
        );
        setClassTypes(updated);
    };

    const addClassType = () => {
        setClassTypes([
            ...classTypes,
            {
                classYear: ClassYear.Grade_5,
                maxScore: 10,
                medalists: 3,
                occurringTime: "9:00",
                classRoom: null,
                questions: [
                    { questionName: "Бодлого  1", maxScore: 5 },
                    { questionName: "Бодлого  2", maxScore: 5 },
                ],
            },
        ]);
    };

    const removeClassType = (index: number) => {
        setClassTypes(classTypes.filter((_: any, i: number) => i !== index));
    };

    const addQuestion = (classTypeIndex: number) => {
        const updated = [...classTypes];
        updated[classTypeIndex].questions.push({
            questionName: `Бодлого  ${updated[classTypeIndex].questions.length + 1}`,
            maxScore: 5,
        });

        const totalMaxScore = updated[classTypeIndex].questions.reduce(
            (sum: number, question: any) => {
                const score = Number(question.maxScore) || 0;
                return sum + score;
            },
            0
        );
        updated[classTypeIndex].maxScore = totalMaxScore;

        setClassTypes(updated);
    };

    const removeQuestion = (classTypeIndex: number, questionIndex: number) => {
        const updated = [...classTypes];
        updated[classTypeIndex].questions = updated[
            classTypeIndex
        ].questions.filter((_: any, i: number) => i !== questionIndex);

        const totalMaxScore = updated[classTypeIndex].questions.reduce(
            (sum: number, question: any) => {
                const score = Number(question.maxScore) || 0;
                return sum + score;
            },
            0
        );
        updated[classTypeIndex].maxScore = totalMaxScore;

        setClassTypes(updated);
    };

    const updateQuestion = (
        classTypeIndex: number,
        questionIndex: number,
        field: string,
        value: any
    ) => {
        const updated = classTypes.map((classType, ctIndex) =>
            ctIndex === classTypeIndex
                ? {
                    ...classType,
                    questions: classType.questions.map(
                        (question: any, qIndex: number) =>
                            qIndex === questionIndex
                                ? { ...question, [field]: value }
                                : question
                    ),
                }
                : classType
        );

        if (field === "maxScore") {
            const totalMaxScore = updated[classTypeIndex].questions.reduce(
                (sum: number, question: any) => {
                    const score = Number(question.maxScore) || 0;
                    return sum + score;
                },
                0
            );
            updated[classTypeIndex].maxScore = totalMaxScore;
        }

        setClassTypes(updated);
    };

    const handleExportData = () => {
        // Handle export data functionality
        console.log("Exporting data...");
        // Add your export logic here
    };

    const handleQuickCreate = () => {
        // Handle quick create functionality
        console.log("Quick create...");
        setActiveTab("create");
        // You could also reset form to default values for quick create
    };

    const handleExportResults = (olympiadId: string) => {
        // Handle export results functionality
        console.log("Exporting results for olympiad:", olympiadId);
        // Add your export logic here
    };

    const handleViewResults = (olympiadId: string) => {
        // Handle view results functionality
        console.log("Viewing results for olympiad:", olympiadId);
        // Add your view results logic here
    };

    // StaggeredMenu configuration
    const menuItems = [
        { label: "Байгууллагын мэдээлэл", ariaLabel: "View host profile", link: "#profile" },
        {
            label: "Олимпиад үүсгэх",
            ariaLabel: "Create new olympiad",
            link: "#create",
        },
        {
            label: "Олимпиад засах",
            ariaLabel: "Manage existing olympiads",
            link: "#manage",
        },
        {
            label: "Дүн оруулах",
            ariaLabel: "Manage olympiad results",
            link: "#results",
        },
    ];

    const socialItems: any[] = [];

    // Handle menu item clicks to switch tabs
    const handleMenuClick = (link: string) => {
        switch (link) {
            case "#profile":
                setActiveTab("profile");
                break;
            case "#create":
                setActiveTab("create");
                break;
            case "#manage":
                setActiveTab("manage");
                break;
            case "#results":
                setActiveTab("results");
                break;
            default:
                break;
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <HostProfile
                        organizerId={ORGANIZER_ID}
                        onNavigateToManage={() => setActiveTab("manage")}
                    />
                );
            case "create":
                return (
                    <OlympiadForm
                        formData={formData}
                        classTypes={classTypes}
                        editingOlympiad={editingOlympiad}
                        onSubmit={handleSubmit}
                        onUpdateFormData={updateFormData}
                        onUpdateClassType={updateClassType}
                        onAddClassType={addClassType}
                        onRemoveClassType={removeClassType}
                        onAddQuestion={addQuestion}
                        onRemoveQuestion={removeQuestion}
                        onUpdateQuestion={updateQuestion}
                        onResetForm={resetForm}
                        isSubmitting={isSubmitting}
                        onRefetch={refetch}
                        onNavigateToManage={() => setActiveTab("manage")}
                    />
                );
            case "manage":
                return (
                    <ManageOlympiads
                        organizerId={ORGANIZER_ID}
                        olympiads={myOlympiads}
                        onRefetch={refetch}
                    />
                );
            case "results":
                return (
                    <ManageResults
                        olympiads={myOlympiads}
                        onExportResults={handleExportResults}
                        onViewResults={handleViewResults}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="min-h-screen relative bg-white">
                {/* Notebook Paper Background */}
                <div className="absolute inset-0 bg-white"></div>
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 0'
                    }}
                ></div>
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, #d1d5db 1px, transparent 1px)
            `,
                        backgroundSize: '80px 100%',
                        backgroundPosition: '0 0'
                    }}
                ></div>

                {/* StaggeredMenu Navigation */}
                <StaggeredMenu
                    position="left"
                    items={menuItems}
                    socialItems={socialItems}
                    displaySocials={false}
                    displayItemNumbering={true}
                    menuButtonColor="#ff8400"
                    openMenuButtonColor="#ffffff"
                    changeMenuColorOnOpen={true}
                    colors={["var(--card)", "var(--card)"]}
                    accentColor="#ff8400"
                    onMenuOpen={() => console.log("Host menu opened")}
                    onMenuClose={() => console.log("Host menu closed")}
                    onMenuItemClick={handleMenuClick}
                />

                {/* Original HostSidebar (hidden but kept for reference) */}
                <div className="hidden">
                    <HostSidebar
                        activeTab={activeTab as "create" | "manage" | "results"}
                        onTabChange={setActiveTab as (tab: "create" | "manage" | "results") => void}
                        onExportData={handleExportData}
                        onQuickCreate={handleQuickCreate}
                        olympiadCount={myOlympiads.length}
                    />
                </div>

                {/* Main content with left margin for left-positioned StaggeredMenu */}
                <div className="w-full pl-20 relative z-10">
                    <div className="max-w-7xl mx-auto p-8">
                        {/* Header */}
                        <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden">
                            <div className="flex items-center space-x-4 mb-4 pl-8">
                                <span className="text-muted-foreground">Home</span>
                                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="text-foreground font-medium">
                                    {activeTab === "profile" && "Байгууллагын мэдээлэл"}
                                    {activeTab === "create" && "Олимпиад үүсгэх"}
                                    {activeTab === "manage" && "Олимпиадын засах"}
                                    {activeTab === "results" && "Дүн оруулах"}
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold mb-2 text-black pl-8">
                                {activeTab === "profile" && "Байгууллагын мэдээлэл"}
                                {activeTab === "create" && "Олимпиад үүсгэх"}
                                {activeTab === "manage" && "Олимпиадын засах"}
                                {activeTab === "results" && "Дүн оруулах"}
                            </h1>
                        </div>

                        {/* Error Display */}
                        {organizerError && (
                            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                                <p className="text-destructive text-sm">
                                    Error loading data: {organizerError.message}
                                </p>
                            </div>
                        )}

                        {/* Content */}
                        <div className="relative h-screen w-full">
                            {organizerLoading ? (
                                <div className="flex items-center justify-center py-12 w-full h-full">
                                    <div className="text-center w-full h-full">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                        <p className="text-muted-foreground">Loading olympiads...</p>
                                    </div>
                                </div>
                            ) : (
                                renderContent()
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HostPage;
