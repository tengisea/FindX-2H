"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  School,
  MapPin,
  Bell,
  BellOff,
  Shield,
  Download,
  Trash2,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  Settings as SettingsIcon,
  UserCircle,
  Lock,
  Database,
  Bell as BellIcon,
} from "lucide-react";
import { formatClassYear } from "@/lib/dateUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProvinceName } from "@/lib/province-utils";

interface SettingsTabProps {
  student: any;
  loading: boolean;
}

const SettingsTab = ({ student, loading }: SettingsTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [notifications, setNotifications] = useState({
    olympiads: true,
    results: true,
    achievements: true,
    announcements: false,
  });

  const [editData, setEditData] = useState({
    name: student?.name || "",
    email: student?.email || "",
    school: student?.school || "",
    district: student?.district || "",
    province: student?.province || "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would typically make an API call to update the student data
      console.log("Saving data:", editData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSaveSuccess(true);
      setIsEditing(false);

      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDeleteAccount = () => {
    // Here you would typically make an API call to delete the account
    console.log("Deleting account...");
    setShowDeleteModal(false);
  };

  const handleExportData = () => {
    if (!student) return;

    // Prepare the data for export
    const exportData = {
      profile: {
        name: student.name,
        email: student.email,
        school: student.school,
        grade: formatClassYear(student.class),
        district: student.district,
        province: getProvinceName(student.province),
        memberSince: new Date().getFullYear(),
      },
      statistics: {
        olympiadsJoined: student.participatedOlympiads?.length || 0,
        currentRanking: student.ranking || "N/A",
        totalPoints: student.totalPoints || 0,
      },
      participatedOlympiads:
        student.participatedOlympiads?.map((olympiad: any) => ({
          name: olympiad.name,
          date: olympiad.occurringDay,
          status: olympiad.status,
          score: olympiad.score || "N/A",
          ranking: olympiad.ranking || "N/A",
        })) || [],
      achievements: student.achievements || [],
      rankingHistory: student.rankingHistory || [],
      exportDate: new Date().toISOString(),
      exportVersion: "1.0",
    };

    // Create and download the file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `student-data-${student.name
      ?.replace(/\s+/g, "-")
      .toLowerCase()}-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
          Settings
        </h2>
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded w-32 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="content-wrapper container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold mb-2 pt-8 text-foreground">
          Settings
        </h2>
        <p className="text-muted-foreground text-lg">
          Manage your account preferences and settings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Profile Information */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserCircle className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl font-semibold text-foreground">
                    Profile Information
                  </CardTitle>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "destructive" : "default"}
                  className="flex items-center space-x-2"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2"
                >
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-base text-green-700">
                    Profile updated successfully!
                  </span>
                </motion.div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-foreground">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    type="text"
                    value={isEditing ? editData.name : student?.name || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-foreground">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    type="email"
                    value={isEditing ? editData.email : student?.email || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-foreground">
                    <School className="w-4 h-4" />
                    <span>School</span>
                  </Label>
                  <Input
                    type="text"
                    value={isEditing ? editData.school : student?.school || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        school: e.target.value,
                      }))
                    }
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-foreground">
                    <span className="text-lg">🎓</span>
                    <span>Grade</span>
                  </Label>
                  <Input
                    type="text"
                    value={formatClassYear(student?.class) || ""}
                    className="bg-muted text-muted-foreground cursor-not-allowed"
                    readOnly
                  />
                  <p className="text-sm text-muted-foreground">
                    Grade cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>District</span>
                  </Label>
                  <Input
                    type="text"
                    value={
                      isEditing ? editData.district : student?.district || ""
                    }
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        district: e.target.value,
                      }))
                    }
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Province</span>
                  </Label>
                  <Input
                    type="text"
                    value={
                      isEditing
                        ? editData.province
                        : getProvinceName(student?.province || "")
                    }
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        province: e.target.value,
                      }))
                    }
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </div>

              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center space-x-2"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl font-semibold text-foreground">
                  Notification Preferences
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {(
                [
                  {
                    key: "olympiads" as const,
                    title: "Olympiad Notifications",
                    description:
                      "Get notified about new olympiads and registration deadlines",
                    icon: <Bell className="w-5 h-5" />,
                  },
                  {
                    key: "results" as const,
                    title: "Result Notifications",
                    description:
                      "Get notified when your olympiad results are published",
                    icon: <Check className="w-5 h-5" />,
                  },
                ] as const
              ).map((notification, index) => (
                <motion.div
                  key={notification.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/20 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      {notification.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-lg">
                        {notification.title}
                      </h4>
                      <p className="text-base text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                  <motion.label
                    whileHover={{ scale: 1.05 }}
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications[notification.key]}
                      onChange={() =>
                        handleNotificationChange(notification.key)
                      }
                    />
                    <div className="w-12 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </motion.label>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Actions Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-xl font-semibold text-foreground">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportData}
                className="w-full flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-green-300 hover:bg-green-50 transition-all duration-200"
              >
                <Download className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-foreground text-lg">
                    Export Data
                  </div>
                  <div className="text-base text-muted-foreground">
                    Download your data
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center space-x-3 p-4 rounded-xl border border-destructive/20 hover:border-destructive/30 hover:bg-destructive/5 transition-all duration-200"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="font-medium text-destructive text-lg">
                    Delete Account
                  </div>
                  <div className="text-base text-destructive/80">
                    Permanently remove
                  </div>
                </div>
              </motion.button>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-xl font-semibold text-foreground">
                Account Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-base">
                  Member since
                </span>
                <span className="font-medium text-foreground text-lg">
                  {new Date().getFullYear()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-base">
                  Olympiads joined
                </span>
                <span className="font-medium text-foreground text-lg">
                  {student?.participatedOlympiads?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-base">
                  Current ranking
                </span>
                <span className="font-medium text-foreground text-lg">
                  {student?.ranking + " points" || "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Delete Account
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  Are you sure you want to delete your account? This action
                  cannot be undone and all your data will be permanently
                  removed.
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 border border-border rounded-xl text-foreground hover:bg-muted transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2 bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90 transition-colors duration-200"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsTab;
