"use client";
import React, { useState } from "react";
import { useGetStudentsByStudentIdQuery } from "@/generated";
import Mandat3D from "./Mandat3D";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, School, Trophy } from "lucide-react";
import { format } from "date-fns";

interface MandatDisplayProps {
  studentId: string;
}

export default function MandatDisplay({ studentId }: MandatDisplayProps) {
  const [selectedMandat, setSelectedMandat] = useState<any>(null);
  const [show3D, setShow3D] = useState(false);

  const { data, loading, error } = useGetStudentsByStudentIdQuery({
    variables: { studentId },
    skip: !studentId,
  });

  const mandats = data?.getStudentsByStudentId || [];

  // Debug: Log the mandat data to see what's being fetched
  React.useEffect(() => {
    console.log("MandatDisplay - Fetched mandats:", mandats);
    if (mandats.length > 0) {
      console.log(
        "MandatDisplay - First mandat organizerLogo:",
        mandats[0]?.organizerLogo
      );
    }
  }, [mandats]);

  if (loading) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800 items-center justify-center mt-20">
          Registration Mandats
        </h2>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 rounded w-1/3 bg-gray-200"></div>
              <div className="h-4 rounded w-1/2 bg-gray-200"></div>
              <div className="h-4 rounded w-1/4 bg-gray-200"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800 items-center justify-center mt-20">
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
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800 items-center justify-center mt-20">
          Registration Mandats
        </h2>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="text-center">
              <Trophy className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Mandats Found
              </h3>
              <p className="text-gray-600">
                You haven't registered for any olympiads yet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleView3D = (mandat: any) => {
    setSelectedMandat(mandat);
    setShow3D(true);
  };

  const handleBack = () => {
    setShow3D(false);
    setSelectedMandat(null);
  };

  if (show3D && selectedMandat) {
    return (
      <Mandat3D
        mandatData={selectedMandat}
        onBack={handleBack}
        showBackButton={true}
        variant="classic"
      />
    );
  }

  return (
    <div className="content-wrapper container">
      <h2 className="text-5xl font-bold mb-8 text-center text-gray-800 items-center justify-center mt-20">
        Registration Mandats
      </h2>

      <div className="space-y-8">
        {/* Header with count */}
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {mandats.length} {mandats.length === 1 ? "Mandat" : "Mandats"}
            </Badge>
          </div>
        </div>

        {/* Mandats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mandats.map((mandat: any, index: number) => (
            <Card
              key={mandat.mandatNumber}
              className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-orange-600">
                    {mandat.olympiadName}
                  </CardTitle>
                  <Badge variant="outline" className="text-sm">
                    {mandat.mandatNumber}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Student Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-base">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-800">
                      {mandat.studentName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-gray-600">
                    <School className="h-4 w-4 text-gray-500" />
                    <span>{mandat.school}</span>
                  </div>
                  <div className="text-base text-gray-600">
                    <span className="font-medium">Class:</span> {mandat.class}
                  </div>
                </div>

                {/* Olympiad Info */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-base text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span>{mandat.olympiadLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span>{mandat.olympiadDate}</span>
                  </div>
                  <div className="text-base text-gray-600">
                    <span className="font-medium">Class Type:</span>{" "}
                    {mandat.classType}
                  </div>
                  {mandat.roomNumber && (
                    <div className="text-base text-gray-600">
                      <span className="font-medium">Room:</span>{" "}
                      {mandat.roomNumber}
                    </div>
                  )}
                </div>

                {/* Organizer */}
                <div className="text-base text-gray-600 pt-2 border-t border-gray-200">
                  <span className="font-medium">Organizer:</span>{" "}
                  {mandat.organizerName}
                </div>

                {/* Registration Date */}
                <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
                  Registered: {mandat.registrationDate}
                </div>

                {/* Actions */}
                <div className="pt-4">
                  <Button
                    onClick={() => handleView3D(mandat)}
                    className="w-full"
                    variant="default"
                  >
                    View 3D Mandat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
