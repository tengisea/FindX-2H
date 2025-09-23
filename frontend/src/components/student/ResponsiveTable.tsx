"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface ResponsiveTableProps {
  data: any[];
  columns: Column[];
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  data,
  columns,
  className = "",
  emptyMessage = "No data available",
  loading = false,
}) => {
  if (loading) {
    return (
      <Card
        className={`bg-white border border-gray-200 shadow-sm ${className}`}
      >
        <CardContent className="p-4 sm:p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card
        className={`bg-white border border-gray-200 shadow-sm ${className}`}
      >
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            <p className="text-lg">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.key}
                      className={`px-4 py-3 text-left text-sm font-medium text-gray-900 ${
                        column.className || ""
                      }`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: rowIndex * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-3 text-sm text-gray-900 ${
                          column.className || ""
                        }`}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: rowIndex * 0.05 }}
          >
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {columns.map((column) => (
                    <div
                      key={column.key}
                      className="flex justify-between items-start"
                    >
                      <span className="text-sm font-medium text-gray-500">
                        {column.label}:
                      </span>
                      <span className="text-sm text-gray-900 text-right flex-1 ml-2">
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTable;
