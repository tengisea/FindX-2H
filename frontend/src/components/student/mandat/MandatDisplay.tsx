"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useGetStudentMandatsQuery, GetStudentMandatsQuery } from "@/generated";
import Mandat3D from "./Mandat3D";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, User, School, FileText, Eye, X } from "lucide-react";
import { formatDateShortMongolian, formatClassYear } from "@/lib/dateUtils";

// Type definitions
type MandatData = NonNullable<GetStudentMandatsQuery["getStudentMandats"]>[0];

const getClassTypeInMongolian = (classType: string) => {
  const classTypeMap: { [key: string]: string } = {
    GRADE_1: "1-р анги",
    GRADE_2: "2-р анги",
    GRADE_3: "3-р анги",
    GRADE_4: "4-р анги",
    GRADE_5: "5-р анги",
    GRADE_6: "6-р анги",
    GRADE_7: "7-р анги",
    GRADE_8: "8-р анги",
    GRADE_9: "9-р анги",
    GRADE_10: "10-р анги",
    GRADE_11: "11-р анги",
    GRADE_12: "12-р анги",
    "Ахлах анги": "Ахлах анги",
    "Дунд анги": "Дунд анги",
    "Бага анги": "Бага анги",
    Elementary: "Бага анги",
    Middle: "Дунд анги",
    High: "Ахлах анги",
  };

  return classTypeMap[classType] || classType;
};

interface MandatDisplayProps {
  studentId: string;
}

export default function MandatDisplay({ studentId }: MandatDisplayProps) {
  const [selectedMandat, setSelectedMandat] = useState<MandatData | null>(null);
  const [show3D, setShow3D] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [show3DModal, setShow3DModal] = useState(false);

  const { data, loading, error } = useGetStudentMandatsQuery({
    variables: { studentId },
    skip: !studentId,
  });

  const mandats = useMemo(
    () => data?.getStudentMandats || [],
    [data?.getStudentMandats]
  );

  useEffect(() => {
    // prevent body scroll while modal open
    if (show3DModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [show3DModal]);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("MandatDisplay - Fetched mandats:", mandats);
    if (mandats.length > 0) {
      // eslint-disable-next-line no-console
      console.log("MandatDisplay - First mandat data:", mandats[0]);
      // eslint-disable-next-line no-console
      console.log("MandatDisplay - Organizer name:", mandats[0].organizerName);
      // eslint-disable-next-line no-console
      console.log("MandatDisplay - Organizer logo:", mandats[0].organizerLogo);
    }
  }, [mandats]);

  const filteredMandats = useMemo(() => {
    if (!searchTerm) return mandats;

    const searchLower = searchTerm.toLowerCase();
    return mandats.filter((mandat: MandatData) => {
      return (
        mandat.olympiadName?.toLowerCase().includes(searchLower) ||
        mandat.organizerName?.toLowerCase().includes(searchLower) ||
        mandat.olympiadLocation?.toLowerCase().includes(searchLower) ||
        mandat.school?.toLowerCase().includes(searchLower) ||
        mandat.mandatNumber?.toLowerCase().includes(searchLower)
      );
    });
  }, [mandats, searchTerm]);

  if (loading) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-10">
          Registration Mandats
        </h2>
        <Card className="bg-white border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 rounded w-1/3 bg-gray-200"></div>
            <div className="h-4 rounded w-1/2 bg-gray-200"></div>
            <div className="h-4 rounded w-1/4 bg-gray-200"></div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-10">
          Registration Mandats
        </h2>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600 text-center text-xl">
              Error loading mandats: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mandats.length === 0) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-10">
          Registration Mandats
        </h2>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Mandats Found
            </h3>
            <p className="text-gray-600">
              You haven&apos;t registered for any olympiads yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleView3D = (mandat: MandatData) => {
    setSelectedMandat(mandat);
    setShow3DModal(true);
  };

  const handleBack = () => {
    setShow3D(false);
    setSelectedMandat(null);
  };

  if (show3D && selectedMandat) {
    return (
      <Mandat3D
        mandatData={selectedMandat as any}
        onBack={handleBack}
        showBackButton={true}
        variant="classic"
      />
    );
  }

  return (
    <div className="content-wrapper container">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-10">
        Мандат
      </h2>

      {/* Search and Filter */}
      <Card className="bg-white border border-gray-200 mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Олимпиадын нэр, зохион байгуулагчид, байршил, мандатын дугаар..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 bg-white text-gray-800 border-gray-300 focus:border-[#FF8400] placeholder:text-gray-500 focus-visible:ring-[#FF8400]"
                aria-label="Search mandats"
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {filteredMandats.length}{" "}
                {filteredMandats.length === 1 ? "Мандат" : "Мандат"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mandats Grid */}
      {filteredMandats.length === 0 ? (
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm
                ? "Хэрэглэгчийн хайсан мандат олдсонгүй."
                : "No mandats found."}
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Хайлтын үгээ засах."
                : "Register for olympiads to get your mandats!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMandats.map((mandat: MandatData, index: number) => (
            <motion.div
              key={mandat.mandatNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader className="bg-white border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-800 mb-1">
                        {mandat.olympiadName}
                      </CardTitle>
                      <p className="text-base text-gray-600 font-medium">
                        {mandat.organizerName || "Organizer not specified"}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className="text-lg text-black font-mono"
                      >
                        {mandat.mandatNumber}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Student Information - Inline */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-800">
                          {mandat.studentName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <School className="h-3 w-3 text-gray-500" />
                        <span>{mandat.school}</span>
                      </div>
                    </div>

                    {/* Olympiad Information */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="font-semibold text-gray-800">
                          Олимпиадын дэлгэрэнгүй мэдээлэл
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span>{mandat.olympiadLocation}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Огноо:</span>{" "}
                          {formatDateShortMongolian(mandat.olympiadDate)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Ангиллын төрөл:</span>{" "}
                          {getClassTypeInMongolian(mandat.classType)}
                        </div>
                        {mandat.roomNumber && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Өрөө:</span>{" "}
                            {mandat.roomNumber}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Registration Information */}
                    <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                      Бүртгүүлсэн огноо:{" "}
                      {formatDateShortMongolian(mandat.registrationDate)}
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleView3D(mandat)}
                      className="text-black hover:bg-[#ff8400] hover:text-white"
                      aria-label={`View 3D mandat for ${mandat.olympiadName}`}
                    >
                      <Eye className="h-4 w-4" />
                      3D Мандат харах
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* 3D Mandat Modal */}
      {show3DModal && selectedMandat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setShow3DModal(false)}
        >
          <div
            className="bg-white max-w-[90vw] max-h-[90vh] w-full sm:w-[1000px] sm:h-[800px] rounded-lg shadow-lg flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-bold text-black m-0">
                3D Олимпиад мандат
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const printContent = document.querySelector("[data-print]");
                    if (printContent) {
                      const newWindow = window.open("", "_blank");
                      if (newWindow) {
                        newWindow.document.write(`
                           <html>
                             <head>
                               <title>Олимпиад мандат - ${selectedMandat?.mandatNumber}</title>
                               <style>
                                 body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
                                 @page { size: A4; margin: 20mm; }
                                 @media print { body { -webkit-print-color-adjust: exact; } }
                               </style>
                             </head>
                             <body>${printContent.innerHTML}</body>
                           </html>
                         `);
                        newWindow.document.close();
                        newWindow.print();
                      }
                    }
                  }}
                  className="p-2 min-w-0 text-black hover:text-black hover:bg-gray-100"
                  aria-label="Print 3D mandat"
                >
                  PDF татах
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShow3DModal(false)}
                  className="p-2 min-w-0"
                  aria-label="3D мандат хаах"
                >
                  <X size={18} color="black" />
                </Button>
              </div>
            </div>

            {/* Modal Content - crucial: give parent flex children min-h-0 so inner can shrink */}
            <div className="flex-1 min-h-0 flex items-center justify-center bg-gray-50">
              <div className="w-full h-full max-w-[820px] max-h-[720px] p-4">
                {/* 3D Mandat Container - this must constrain the canvas */}
                <div
                  className="w-full h-full bg-white rounded-lg overflow-hidden flex items-center justify-center"
                  data-print
                >
                  {/* Ensure Mandat3D accepts style/width/height props and uses full size of container.
                       If Mandat3D doesn't accept style props, wrap it in a div and ensure it renders Canvas with style width/height 100%. */}
                  <div className="w-full h-full min-h-0">
                    <Mandat3D
                      mandatData={selectedMandat as any}
                      variant="premium"
                      onBack={() => setShow3DModal(false)}
                      showBackButton={false}
                      hideControls={true}
                      // if Mandat3D accepts a className/style prop, it will fill the wrapper
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-200">
              <p className="text-xs text-black m-0">© 2025 FindX</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
