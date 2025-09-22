"use client";
import React, { useState } from "react";
import { useGetStudentMandatsQuery } from "@/generated";
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

  const { data, loading, error } = useGetStudentMandatsQuery({
    variables: { studentId },
    skip: !studentId,
  });

  const mandats = data?.getStudentMandats || [];

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
        <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
          Registration Mandats
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 rounded w-1/3 bg-muted"></div>
              <div className="h-4 rounded w-1/2 bg-muted"></div>
              <div className="h-4 rounded w-1/4 bg-muted"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
          Registration Mandats
        </h2>
        <Card className="border-destructive/20 bg-destructive/10">
          <CardContent className="p-6">
            <p className="text-destructive text-center text-xl">
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
        <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
          Registration Mandats
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Mandats Found
              </h3>
              <p className="text-muted-foreground">
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
      <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
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
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-primary">
                    {mandat.olympiadName}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {mandat.mandatNumber}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Student Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      {mandat.studentName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <School className="h-4 w-4 text-muted-foreground" />
                    <span>{mandat.school}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Class:</span> {mandat.class}
                  </div>
                </div>

                {/* Olympiad Info */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{mandat.olympiadLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{mandat.olympiadDate}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Class Type:</span>{" "}
                    {mandat.classType}
                  </div>
                  {mandat.roomNumber && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Room:</span>{" "}
                      {mandat.roomNumber}
                    </div>
                  )}
                </div>

                {/* Organizer */}
                <div className="text-sm text-muted-foreground pt-2 border-t border-border">
                  <span className="font-medium">Organizer:</span>{" "}
                  {mandat.organizerName}
                </div>

                {/* Registration Date */}
                <div className="text-xs text-muted-foreground pt-2 border-t border-border">
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
