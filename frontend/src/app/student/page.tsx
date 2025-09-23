"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Trophy,
  Calendar,
  Award,
  FileText,
  Settings,
  ChevronLeft,
} from "lucide-react";
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
import { useAlert } from "@/components/ui/alert-system";
import { Button } from "@/components/ui/button";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

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

  // Navigation items with icons
  const navigationItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      ariaLabel: "View your profile",
    },
    {
      id: "olympiads",
      label: "Olympiads",
      icon: Trophy,
      ariaLabel: "Browse available olympiads",
    },
    {
      id: "participated",
      label: "Participated",
      icon: Calendar,
      ariaLabel: "View participated olympiads",
    },
    {
      id: "results",
      label: "Results",
      icon: Award,
      ariaLabel: "View your results",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
      ariaLabel: "View your achievements",
    },
    {
      id: "mandats",
      label: "Mandats",
      icon: FileText,
      ariaLabel: "View your registration mandats",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      ariaLabel: "Manage your settings",
    },
  ];

  // Handle menu click
  const handleMenuClick = (tabId: string) => {
    const tab = tabId as typeof activeTab;
    if (
      tab &&
      [
        "profile",
        "olympiads",
        "participated",
        "results",
        "achievements",
        "mandats",
        "settings",
      ].includes(tab)
    ) {
      setActiveTab(tab);
      setIsMobileMenuOpen(false);
      setIsDesktopMenuOpen(false);
    }
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">
              {navigationItems.find((item) => item.id === activeTab)?.label ||
                "Student Portal"}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            {student && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {student.name?.charAt(0) || "S"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-80 h-full bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Navigation
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Menu Items */}
              <nav className="p-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        isActive
                          ? "bg-orange-100 text-orange-700 border border-orange-200"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      whileTap={{ scale: 0.98 }}
                      aria-label={item.ariaLabel}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? "text-orange-600" : "text-gray-500"
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40">
        <div className="p-6">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
            {student && (
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {student.name}
              </p>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    isActive
                      ? "bg-orange-100 text-orange-700 border border-orange-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={item.ariaLabel}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-orange-600" : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
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
