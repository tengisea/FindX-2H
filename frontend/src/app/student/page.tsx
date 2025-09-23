"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetStudentQuery,
  useAllOlympiadsQuery,
  useGetStudentsByStudentIdQuery,
  useRegisterForOlympiadMutation,
} from "@/generated";
import {
  ProfileTab,
  OlympiadsTab,
  ParticipatedTab,
  ResultsTab,
  AchievementsTab,
  SettingsTab,
} from "@/components/student/tabs";
import { MandatDisplay } from "@/components/student/mandat";
import {
  OlympiadDetailsModal,
  GradeSelectionModal,
} from "@/components/student/modals";
import { StudentStaggeredMenu } from "@/components/student/StudentStaggeredMenu";
import { useAlert } from "@/components/ui/alert-system";

const StudentPage = () => {
  const { showSuccess, showError } = useAlert();
  const [registerForOlympiad, { loading: registering }] =
    useRegisterForOlympiadMutation();
  const [activeTab, setActiveTab] = useState<
    | "profile"
    | "olympiads"
    | "participated"
    | "tournaments"
    | "results"
    | "achievements"
    | "mandats"
    | "settings"
  >("profile");
  const [selectedOlympiad, setSelectedOlympiad] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Get student ID from centralized configuration
  const studentId = "68ce9f79038c70f37d8fe031";

  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
  } = useGetStudentQuery({
    variables: { getStudentId: studentId },
  });

  const { data: olympiadsData, loading: olympiadsLoading } =
    useAllOlympiadsQuery();

  const { data: studentAnswersData, loading: studentAnswersLoading } =
    useGetStudentsByStudentIdQuery({
      variables: { studentId: studentId },
    });

  const student = studentData?.getStudent;
  const olympiads = olympiadsData?.allOlympiads || [];

  // Handle tab change
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
  };

  const [showGradeSelectionModal, setShowGradeSelectionModal] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState<any>(null);

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
      const result = await registerForOlympiad({
        variables: {
          input: {
            studentId: studentId,
            classTypeId: classType.id,
            olympiadId: selectedOlympiad.id,
          },
        },
      });

      if (result.data?.registerForOlympiad) {
        showSuccess(
          "Successfully registered for the olympiad!",
          "Registration Complete"
        );
        setShowGradeSelectionModal(false);
        setSelectedClassType(null);
      }
    } catch (error: any) {
      showError(`Registration failed: ${error.message}`, "Registration Error");
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
            registering={false}
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
        return null;
      case "results":
        return (
          <ResultsTab
            student={student}
            studentAnswers={studentAnswersData?.getStudentsByStudentId || null}
            loading={studentAnswersLoading}
          />
        );
      case "achievements":
        return <AchievementsTab studentId={studentId} />;
      case "mandats":
        return <MandatDisplay studentId={studentId} />;
      case "settings":
        return <SettingsTab student={student} loading={studentLoading} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Staggered Menu */}
      <StudentStaggeredMenu
        activeTab={activeTab}
        onTabChange={handleTabChange}
        studentId={studentId}
        position="left"
      />

      {/* Main Content */}
      <div className="pt-0">
        <div className="min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

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
