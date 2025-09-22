"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

// Extend Window interface to include alertSystem
declare global {
  interface Window {
    alertSystem?: {
      showSuccess: (message: string, title?: string) => void;
      showError: (message: string, title?: string) => void;
      showWarning: (message: string, title?: string) => void;
      showInfo: (message: string, title?: string) => void;
    };
  }
}

interface AlertData {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  duration?: number;
}

interface AlertContextType {
  showAlert: (alert: Omit<AlertData, "id">) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  hideAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const hideAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const showAlert = useCallback(
    (alert: Omit<AlertData, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newAlert: AlertData = {
        id,
        duration: 5000, // Default 5 seconds
        ...alert,
      };

      setAlerts((prev) => [...prev, newAlert]);

      // Auto-hide after duration
      if (newAlert.duration && newAlert.duration > 0) {
        setTimeout(() => {
          hideAlert(id);
        }, newAlert.duration);
      }
    },
    [hideAlert]
  );

  const showSuccess = useCallback(
    (message: string, title?: string) => {
      showAlert({ type: "success", message, title });
    },
    [showAlert]
  );

  const showError = useCallback(
    (message: string, title?: string) => {
      showAlert({ type: "error", message, title });
    },
    [showAlert]
  );

  const showWarning = useCallback(
    (message: string, title?: string) => {
      showAlert({ type: "warning", message, title });
    },
    [showAlert]
  );

  const showInfo = useCallback(
    (message: string, title?: string) => {
      showAlert({ type: "info", message, title });
    },
    [showAlert]
  );

  const getAlertIcon = (type: AlertData["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: AlertData["type"]) => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "destructive";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        hideAlert,
      }}
    >
      {children}

      {/* Alert Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 300, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative"
            >
              <Alert variant={getAlertVariant(alert.type)}>
                <div className="flex items-start space-x-2">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
                    <AlertDescription>{alert.message}</AlertDescription>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => hideAlert(alert.id)}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/50 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </motion.button>
                </div>
              </Alert>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  );
};

// Utility functions to replace browser alerts
export const alertSystem = {
  success: (message: string, title?: string) => {
    // This will be used by the global alert replacement
    if (typeof window !== "undefined" && window.alertSystem) {
      window.alertSystem.showSuccess(message, title);
    }
  },
  error: (message: string, title?: string) => {
    if (typeof window !== "undefined" && window.alertSystem) {
      window.alertSystem.showError(message, title);
    }
  },
  warning: (message: string, title?: string) => {
    if (typeof window !== "undefined" && window.alertSystem) {
      window.alertSystem.showWarning(message, title);
    }
  },
  info: (message: string, title?: string) => {
    if (typeof window !== "undefined" && window.alertSystem) {
      window.alertSystem.showInfo(message, title);
    }
  },
};

// Global alert replacement
if (typeof window !== "undefined") {
  const originalAlert = window.alert;
  window.alert = (message: string) => {
    // Try to use our alert system if available
    if (window.alertSystem) {
      window.alertSystem.showInfo(message, "Alert");
    } else {
      // Fallback to original alert
      originalAlert(message);
    }
  };
}
