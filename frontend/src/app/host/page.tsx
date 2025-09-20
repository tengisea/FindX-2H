"use client";

import { useState } from "react";

import { OlympiadForm } from "@/components/host/OlympiadForm";
import { OlympiadList } from "@/components/host/OlympiadList";
import { ManageResults } from "@/components/host/ManageResults";
import HostSidebar from "@/components/host/HostSidebar";
import StaggeredMenu from "@/components/ui/StaggeredMenu";

type TabType = "create" | "manage" | "results";

const HostPage = () => {
    const [activeTab, setActiveTab] = useState<TabType>("create");
    const [editingOlympiad, setEditingOlympiad] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        closeDay: "",
        occurringDay: "",
        location: "",
        organizerId: "68c553d2dbdb1b5ed2b0e455",
        invitation: false,
        rankingType: "SCHOOL" as any,
    });

    const [classTypes, setClassTypes] = useState<any[]>([
        {
            classYear: "Grade_5",
            maxScore: 20,
            medalists: 3,
            questions: [
                { questionName: "Question 1", maxScore: 5 },
                { questionName: "Question 2", maxScore: 5 },
                { questionName: "Question 3", maxScore: 5 },
                { questionName: "Question 4", maxScore: 5 },
            ],
        },
    ]);

    // Mock data for now
    const myOlympiads = [
        {
            id: "1",
            name: "Math Olympiad 2024",
            description: "Annual mathematics competition",
            date: "2024-03-15",
            location: "Ulaanbaatar",
            status: "approved",
            classtypes: []
        },
        {
            id: "2",
            name: "Science Fair 2024",
            description: "Science and technology competition",
            date: "2024-04-20",
            location: "Darkhan",
            status: "pending",
            classtypes: []
        }
    ];

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            closeDay: "",
            occurringDay: "",
            location: "",
            organizerId: "68c553d2dbdb1b5ed2b0e455",
            invitation: false,
            rankingType: "SCHOOL" as any,
        });
        setClassTypes([
            {
                classYear: "Grade_5",
                maxScore: 20,
                medalists: 3,
                questions: [
                    { questionName: "Question 1", maxScore: 5 },
                    { questionName: "Question 2", maxScore: 5 },
                    { questionName: "Question 3", maxScore: 5 },
                    { questionName: "Question 4", maxScore: 5 },
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
        }, 1000);
    };

    const handleEditOlympiad = (olympiad: any) => {
        setFormData({
            name: olympiad.name,
            description: olympiad.description,
            closeDay: olympiad.closeDay || "",
            occurringDay: olympiad.occurringDay || olympiad.date,
            location: olympiad.location,
            organizerId: "68c553d2dbdb1b5ed2b0e455",
            invitation: olympiad.invitation || false,
            rankingType: olympiad.rankingType || "SCHOOL",
        });
        setEditingOlympiad(olympiad);
        setActiveTab("create");
    };

    const handleDeleteOlympiad = async (id: string) => {
        if (!confirm("Are you sure you want to delete this olympiad?")) {
            return;
        }
        setIsDeleting(true);
        // Handle deletion
        setTimeout(() => {
            setIsDeleting(false);
        }, 1000);
    };

    const updateFormData = (field: string, value: string | boolean) => {
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
                classYear: "Grade_5",
                maxScore: 10,
                medalists: 3,
                questions: [
                    { questionName: "Question 1", maxScore: 5 },
                    { questionName: "Question 2", maxScore: 5 },
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
            questionName: `Question ${updated[classTypeIndex].questions.length + 1}`,
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
                    questions: classType.questions.map((question: any, qIndex: number) =>
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
        { label: "Create Olympiad", ariaLabel: "Create new olympiad", link: "#create" },
        { label: "Manage Olympiads", ariaLabel: "Manage existing olympiads", link: "#manage" },
        { label: "Manage Results", ariaLabel: "Manage olympiad results", link: "#results" },
        { label: "Quick Create", ariaLabel: "Quick create new olympiad", link: "#quick-create" },
    ];

    const socialItems: any[] = [];

    // Handle menu item clicks to switch tabs
    const handleMenuClick = (link: string) => {
        switch (link) {
            case "#create":
                setActiveTab("create");
                break;
            case "#manage":
                setActiveTab("manage");
                break;
            case "#results":
                setActiveTab("results");
                break;
            case "#quick-create":
                handleQuickCreate();
                break;
            default:
                break;
        }
    };

    const renderContent = () => {
        switch (activeTab) {
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
                    />
                );
            case "manage":
                return (
                    <OlympiadList
                        olympiads={myOlympiads}
                        loading={false}
                        onEditOlympiad={handleEditOlympiad}
                        onDeleteOlympiad={handleDeleteOlympiad}
                        isDeleting={isDeleting}
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
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
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
                                {activeTab === 'create' && 'Create Olympiad'}
                                {activeTab === 'manage' && 'Manage Olympiads'}
                                {activeTab === 'results' && 'Manage Results'}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold mb-2 text-foreground">
                            {activeTab === 'create' && 'Create Olympiad'}
                            {activeTab === 'manage' && 'Manage Olympiads'}
                            {activeTab === 'results' && 'Manage Results'}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {activeTab === 'create' && 'Create and submit new olympiad requests for approval'}
                            {activeTab === 'manage' && 'View, edit, and manage your existing olympiads'}
                            {activeTab === 'results' && 'View, export, and manage results for your olympiads'}
                        </p>
                    </div>

                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-foreground">{myOlympiads.length}</div>
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
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-foreground">{myOlympiads.filter(o => o.status === 'pending').length}</div>
                                    <div className="text-sm text-muted-foreground">Pending Approvals</div>
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
                                    <div className="text-3xl font-bold text-foreground">{myOlympiads.filter(o => o.status === 'approved').length}</div>
                                    <div className="text-sm text-muted-foreground">Active Competitions</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostPage;