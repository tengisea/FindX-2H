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
    const [isDeleting, setIsDeleting] = useState(false);

    // Hardcoded organizer ID
    const ORGANIZER_ID = "68d0cfd354ab6e0a0d6237f8";

    // Fetch real data from database
    const { data: organizerData, loading: organizerLoading, error: organizerError, refetch } = useGetOrganizerQuery({
        variables: { getOrganizerId: ORGANIZER_ID },
        errorPolicy: 'all'
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
                { questionName: "Question1", maxScore: 5 },
                { questionName: "Question2", maxScore: 5 },
                { questionName: "Question3", maxScore: 5 },
                { questionName: "Question4", maxScore: 5 },
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
                    { questionName: "Question1", maxScore: 5 },
                    { questionName: "Question2", maxScore: 5 },
                    { questionName: "Question3", maxScore: 5 },
                    { questionName: "Question4", maxScore: 5 },
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


    const handleDeleteOlympiad = async (id: string) => {
        if (!confirm("Are you sure you want to delete this olympiad?")) {
            return;
        }
        setIsDeleting(true);
        // Handle deletion
        setTimeout(() => {
            setIsDeleting(false);
            // Refetch data after deletion
            refetch();
        }, 1000);
    };

    const updateFormData = (field: string, value: string | boolean | Date | undefined) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const updateClassType = (index: number, field: string, value: any) => {
        const updated = classTypes.map((classType, i) =>
            i === index ? { ...classType, [field]: value } : classType,
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
                    { questionName: "Question1", maxScore: 5 },
                    { questionName: "Question2", maxScore: 5 },
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
            questionName: `Question${updated[classTypeIndex].questions.length + 1}`,
            maxScore: 5,
        });

        const totalMaxScore = updated[classTypeIndex].questions.reduce(
            (sum: number, question: any) => {
                const score = Number(question.maxScore) || 0;
                return sum + score;
            },
            0,
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
            0,
        );
        updated[classTypeIndex].maxScore = totalMaxScore;

        setClassTypes(updated);
    };

    const updateQuestion = (
        classTypeIndex: number,
        questionIndex: number,
        field: string,
        value: any,
    ) => {
        const updated = classTypes.map((classType, ctIndex) =>
            ctIndex === classTypeIndex
                ? {
                    ...classType,
                    questions: classType.questions.map((question: any, qIndex: number) =>
                        qIndex === questionIndex
                            ? { ...question, [field]: value }
                            : question,
                    ),
                }
                : classType,
        );

        if (field === "maxScore") {
            const totalMaxScore = updated[classTypeIndex].questions.reduce(
                (sum: number, question: any) => {
                    const score = Number(question.maxScore) || 0;
                    return sum + score;
                },
                0,
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
        { label: "Profile", ariaLabel: "View host profile", link: "#profile" },
        { label: "Create Olympiad", ariaLabel: "Create new olympiad", link: "#create" },
        { label: "Manage Olympiads", ariaLabel: "Manage existing olympiads", link: "#manage" },
        { label: "Manage Results", ariaLabel: "Manage olympiad results", link: "#results" },
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
                    />
                );
            case "manage":
                return (
                    <ManageOlympiads
                        organizerId={ORGANIZER_ID}
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
            <div className="min-h-screen bg-background">
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
                <div className="w-full pl-20 bg-[#27272a]">
                    <div className="max-w-7xl mx-auto p-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center space-x-4 mb-4">
                                <span className="text-muted-foreground">Home</span>
                                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="text-foreground font-medium">
                                    {activeTab === "profile" && "Profile"}
                                    {activeTab === "create" && "Create Olympiad"}
                                    {activeTab === "manage" && "Manage Olympiads"}
                                    {activeTab === "results" && "Manage Results"}
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold mb-2 text-foreground">
                                {activeTab === "profile" && "Profile"}
                                {activeTab === "create" && "Create Olympiad"}
                                {activeTab === "manage" && "Manage Olympiads"}
                                {activeTab === "results" && "Manage Results"}
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                {activeTab === "profile" && "View and manage your host organization profile"}
                                {activeTab === "create" && "Create and submit new olympiad requests for approval"}
                                {activeTab === "manage" && "View, edit, and manage your existing olympiads"}
                                {activeTab === "results" && "View, export, and manage results for your olympiads"}
                            </p>
                        </div>

                        {/* Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-foreground">
                                            {organizerLoading ? "..." : myOlympiads.length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Total Olympiads</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-foreground">1</div>
                                        <div className="text-sm text-muted-foreground">Host Organization</div>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-foreground">
                                            {organizerLoading ? "..." : myOlympiads.filter(o => o.status === 'OPEN').length}
                                        </div>

                                        <div className="text-sm text-muted-foreground">Active Competitions</div>
                                    </div>
                                </div>
                            </div>
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
                        <div className="relative">
                            {organizerLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="text-center">
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