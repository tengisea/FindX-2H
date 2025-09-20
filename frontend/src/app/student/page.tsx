"use client";

import { useState } from "react";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import StaggeredMenu from "@/components/ui/StaggeredMenu";
import {
  useGetStudentQuery,
  useGetAllApprovedOlympiadsQuery,
  useRegisterForOlympiadMutation,
  useGetStudentsByStudentIdQuery,
} from "@/generated";
import { getCurrentStudentId } from "@/config/student";
import { formatDate, safeFormatDate } from "@/lib/dateUtils";
import {
  ProfileTab,
  OlympiadsTab,
  ParticipatedTab,
  ResultsTab,
  // AchievementsTab,
  SettingsTab,
} from "@/components/student/tabs";
import {
  OlympiadDetailsModal,
  GradeSelectionModal,
} from "@/components/student/modals";

const StudentPage = () => {
  const [activeTab, setActiveTab] = useState<
    | "profile"
    | "olympiads"
    | "participated"
    | "tournaments"
    | "results"
    | "achievements"
    | "settings"
  >("profile");
  const [selectedOlympiad, setSelectedOlympiad] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // StaggeredMenu configuration
  const menuItems = [
    { label: "Profile", ariaLabel: "View your profile", link: "#profile" },
    {
      label: "Olympiads",
      ariaLabel: "Browse available olympiads",
      link: "#olympiads",
    },
    {
      label: "Participated",
      ariaLabel: "View participated olympiads",
      link: "#participated",
    },
    { label: "Results", ariaLabel: "View your results", link: "#results" },
    {
      label: "Achievements",
      ariaLabel: "View your achievements",
      link: "#achievements",
    },
    { label: "Settings", ariaLabel: "Manage your settings", link: "#settings" },
  ];

  const socialItems: any[] = [];

  // Handle menu item clicks to switch tabs
  const handleMenuClick = (link: string) => {
    const tab = link.replace("#", "") as typeof activeTab;
    if (
      tab &&
      [
        "profile",
        "olympiads",
        "participated",
        "results",
        "achievements",
        "settings",
      ].includes(tab)
    ) {
      setActiveTab(tab);
    }
  };
  const [showGradeSelectionModal, setShowGradeSelectionModal] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState<any>(null);

  // Get student ID from centralized configuration
  const studentId = "68cbaa9cb20bdd534740f3dc";

  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
  } = useGetStudentQuery({
    variables: { getStudentId: studentId },
  });

  const { data: olympiadsData, loading: olympiadsLoading } =
    useGetAllApprovedOlympiadsQuery();

  const { data: studentAnswersData, loading: studentAnswersLoading } =
    useGetStudentsByStudentIdQuery({
      variables: { studentId: studentId },
    });

  const [registerForOlympiad, { loading: registering }] =
    useRegisterForOlympiadMutation();

  const student = studentData?.getStudent;
  const olympiads = olympiadsData?.getAllApprovedOlympiads || [];

  const handleViewDetails = (olympiad: any) => {
    setSelectedOlympiad(olympiad);
    setShowDetailsModal(true);
  };

  const handleRegister = (olympiad: any) => {
    setSelectedOlympiad(olympiad);
    setShowGradeSelectionModal(true);
  };

  const handleGradeSelection = async (classType: any) => {
    try {
      await registerForOlympiad({
        variables: {
          input: {
            studentId: studentId,
            classTypeId: classType.id,
            olympiadId: selectedOlympiad.id,
          },
        },
      });

      alert("Successfully registered for the olympiad!");
      setShowGradeSelectionModal(false);
      setSelectedClassType(null);
      // Optionally refresh the data
      window.location.reload();
    } catch (error: any) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  const getAvailableGrades = (olympiad: any) => {
    if (!student?.class) return [];

    const studentGradeNum = parseInt(student.class.replace("GRADE_", ""));
    return olympiad.classtypes.filter((ct: any) => {
      const classGradeNum = parseInt(ct.classYear.replace("GRADE_", ""));
      return classGradeNum >= studentGradeNum;
    });
  };

  const isStudentRegistered = (olympiad: any) => {
    if (!student?.participatedOlympiads) return false;
    return student.participatedOlympiads.includes(olympiad.id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileTab
            student={student}
            loading={studentLoading}
            error={studentError}
          />
        );
      case "olympiads":
        return (
          <OlympiadsTab
            olympiads={olympiads}
            student={student}
            loading={olympiadsLoading}
            onViewDetails={handleViewDetails}
            onRegister={handleRegister}
            isStudentRegistered={isStudentRegistered}
            registering={registering}
          />
        );
      case "participated":
        return (
          <ParticipatedTab
            student={student}
            loading={studentLoading}
            onViewDetails={handleViewDetails}
            onBrowseOlympiads={() => setActiveTab("olympiads")}
          />
        );
      case "tournaments":
        return null; // This case is empty in the original code

      case "results":
        return (
          <ResultsTab
            student={student}
            studentAnswers={studentAnswersData?.getStudentsByStudentId || null}
            loading={studentAnswersLoading}
          />
        );
      case "achievements":
      // return <AchievementsTab student={student} loading={studentLoading} />;
      case "settings":
        return <SettingsTab student={student} loading={studentLoading} />;
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
        onMenuOpen={() => console.log("Student menu opened")}
        onMenuClose={() => console.log("Student menu closed")}
        onMenuItemClick={handleMenuClick}
      />

      {/* Original StudentSidebar (hidden but kept for reference) */}
      <div className="hidden">
        <StudentSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          studentId={studentId}
        />
      </div>

      {/* Main content with left margin for left-positioned StaggeredMenu */}
      <div className="w-full pl-20 bg-background">{renderContent()}</div>

      {/* Modals */}
      <OlympiadDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        olympiad={selectedOlympiad}
        student={student}
        isStudentRegistered={
          selectedOlympiad ? isStudentRegistered(selectedOlympiad) : false
        }
        onRegister={() => {
          setShowDetailsModal(false);
          handleRegister(selectedOlympiad);
        }}
        registering={registering}
      />

      <GradeSelectionModal
        isOpen={showGradeSelectionModal}
        onClose={() => setShowGradeSelectionModal(false)}
        olympiad={selectedOlympiad}
        availableGrades={
          selectedOlympiad ? getAvailableGrades(selectedOlympiad) : []
        }
        selectedClassType={selectedClassType}
        onSelectClassType={setSelectedClassType}
        onRegister={() =>
          selectedClassType && handleGradeSelection(selectedClassType)
        }
        registering={registering}
      />
    </div>
  );
};

export default StudentPage;
