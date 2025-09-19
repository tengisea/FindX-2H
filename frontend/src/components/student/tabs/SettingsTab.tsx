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

interface SettingsTabProps {
  student: any;
  loading: boolean;
}

const SettingsTab = ({ student, loading }: SettingsTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSave = () => {
    // Here you would typically make an API call to update the student data
    console.log("Saving data:", editData);
    setIsEditing(false);
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
        province: student.province,
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
      <div className="p-8 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2
          className="text-4xl font-bold mb-2 pt-8"
          style={{ color: "#4741A6" }}
        >
          Settings
        </h2>
        <p className="text-gray-600">
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserCircle
                    className="w-6 h-6"
                    style={{ color: "#4741A6" }}
                  />
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "#4741A6" }}
                  >
                    Profile Information
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200"
                  style={{
                    backgroundColor: isEditing ? "#ef4444" : "#4741A6",
                    color: "white",
                  }}
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
                </motion.button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={isEditing ? editData.name : student?.name || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    value={isEditing ? editData.email : student?.email || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <School className="w-4 h-4" />
                    <span>School</span>
                  </label>
                  <input
                    type="text"
                    value={isEditing ? editData.school : student?.school || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        school: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <span className="text-lg">🎓</span>
                    <span>Grade</span>
                  </label>
                  <input
                    type="text"
                    value={formatClassYear(student?.class) || ""}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                    readOnly
                  />
                  <p className="text-xs text-gray-500">
                    Grade cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4" />
                    <span>District</span>
                  </label>
                  <input
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4" />
                    <span>Province</span>
                  </label>
                  <input
                    type="text"
                    value={
                      isEditing ? editData.province : student?.province || ""
                    }
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        province: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    readOnly={!isEditing}
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
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-6 py-2 text-white rounded-xl transition-colors duration-200"
                        style={{ backgroundColor: "#4741A6" }}
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6" style={{ color: "#4741A6" }} />
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#4741A6" }}
                >
                  Notification Preferences
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
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
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                      {notification.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600">
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
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </motion.label>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Account Actions Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
              <h3
                className="text-lg font-semibold"
                style={{ color: "#4741A6" }}
              >
                Quick Actions
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportData}
                className="w-full flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200"
              >
                <Download className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Export Data</div>
                  <div className="text-sm text-gray-600">
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
                  <div className="font-medium text-red-600">Delete Account</div>
                  <div className="text-sm text-red-500">Permanently remove</div>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Account Stats */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
              <h3
                className="text-lg font-semibold"
                style={{ color: "#4741A6" }}
              >
                Account Statistics
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member since</span>
                <span className="font-medium text-gray-900">
                  {new Date().getFullYear()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Olympiads joined</span>
                <span className="font-medium text-gray-900">
                  {student?.participatedOlympiads?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current ranking</span>
                <span className="font-medium text-gray-900">
                  {student?.ranking + " points" || "N/A"}
                </span>
              </div>
            </div>
          </div>
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
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Delete Account
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete your account? This action
                  cannot be undone and all your data will be permanently
                  removed.
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
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
