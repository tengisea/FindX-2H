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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProvinceName, PROVINCE_NAMES } from "@/lib/province-utils";

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
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800 items-center justify-center mt-20">
          Settings
        </h2>
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
        <h2 className="text-4xl font-bold mb-2 pt-8 text-gray-800">Settings</h2>
        <p className="text-gray-600 text-lg">
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
          <Card className="bg-white border border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserCircle className="w-6 h-6 text-orange-500" />
                  <CardTitle className="text-2xl font-semibold text-gray-800">
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
                  <Label className="flex items-center space-x-2 text-base font-medium text-gray-800">
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
                    className={
                      !isEditing
                        ? "bg-gray-100 text-gray-600 border-gray-200 placeholder:text-gray-500"
                        : "bg-white text-gray-800 border-gray-300 placeholder:text-gray-500 focus-visible:ring-orange-500"
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-gray-800">
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
                    className={
                      !isEditing
                        ? "bg-gray-100 text-gray-600 border-gray-200 placeholder:text-gray-500"
                        : "bg-white text-gray-800 border-gray-300 placeholder:text-gray-500 focus-visible:ring-orange-500"
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-gray-800">
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
                    className={
                      !isEditing
                        ? "bg-gray-100 text-gray-600 border-gray-200 placeholder:text-gray-500"
                        : "bg-white text-gray-800 border-gray-300 placeholder:text-gray-500 focus-visible:ring-orange-500"
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-gray-800">
                    <span className="text-lg">🎓</span>
                    <span>Grade</span>
                  </Label>
                  <Input
                    type="text"
                    value={formatClassYear(student?.class) || ""}
                    className="bg-gray-100 text-gray-600 cursor-not-allowed"
                    readOnly
                  />
                  <p className="text-base text-gray-600">
                    Grade cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-base font-medium text-gray-800">
                    <MapPin className="w-4 h-4" />
                    <span>Province</span>
                  </Label>
                  {isEditing ? (
                    <Select
                      value={editData.province}
                      onValueChange={(value) =>
                        setEditData((prev) => ({
                          ...prev,
                          province: value,
                        }))
                      }
                    >
                      <SelectTrigger className="bg-white text-gray-800 border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        {Object.entries(PROVINCE_NAMES).map(([key, value]) => (
                          <SelectItem
                            key={key}
                            value={key}
                            className="text-gray-800 hover:bg-orange-50 focus:bg-orange-50"
                          >
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type="text"
                      value={getProvinceName(student?.province || "")}
                      className="bg-gray-100 text-gray-600 border-gray-200 cursor-not-allowed"
                      readOnly
                    />
                  )}
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
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-500"
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
          <Card className="bg-white border border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-orange-500" />
                <CardTitle className="text-2xl font-semibold text-gray-800">
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
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
                      {notification.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-lg">
                        {notification.title}
                      </h4>
                      <p className="text-base text-gray-600">
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
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-200 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
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
          <Card className="bg-white border border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportData}
                className="w-full flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200"
              >
                <Download className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-800 text-lg">
                    Export Data
                  </div>
                  <div className="text-base text-gray-600">
                    Download your data
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center space-x-3 p-4 rounded-xl border border-red-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="font-medium text-red-600 text-lg">
                    Delete Account
                  </div>
                  <div className="text-base text-red-500">
                    Permanently remove
                  </div>
                </div>
              </motion.button>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card className="bg-white border border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Account Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-base">Member since</span>
                <span className="font-medium text-gray-800 text-lg">
                  {new Date().getFullYear()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-base">
                  Olympiads joined
                </span>
                <span className="font-medium text-gray-800 text-lg">
                  {student?.participatedOlympiads?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-base">Current ranking</span>
                <span className="font-medium text-gray-800 text-lg">
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
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Delete Account
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Are you sure you want to delete your account? This action
                  cannot be undone and all your data will be permanently
                  removed.
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200"
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
