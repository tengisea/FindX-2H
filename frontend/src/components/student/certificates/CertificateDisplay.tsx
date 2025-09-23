"use client";

import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Mandat3D from "../mandat/Mandat3D";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, School, Trophy, Award } from "lucide-react";
import { format } from "date-fns";

// Query to get student with their medal achievements
const GET_STUDENT_CERTIFICATES = gql`
  query GetStudent($getStudentId: ID!) {
    getStudent(id: $getStudentId) {
      id
      name
      email
      school
      class
      province
      region
      ranking
      gold
      silver
      bronze
      top10
      participatedOlympiads
    }
  }
`;

interface CertificateDisplayProps {
  studentId: string;
}

export default function CertificateDisplay({
  studentId,
}: CertificateDisplayProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [show3D, setShow3D] = useState(false);

  // Fetch student data with medal achievements
  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
  } = useQuery(GET_STUDENT_CERTIFICATES, {
    variables: { getStudentId: studentId },
    skip: !studentId,
  });

  const student = studentData?.getStudent;
  const loading = studentLoading;
  const error = studentError;

  // Create certificate data from student's medals
  const certificates = React.useMemo(() => {
    if (!student) return [];

    const certs: any[] = [];

    // Gold medals
    if (student.gold && student.gold.length > 0) {
      student.gold.forEach((olympiadId: string) => {
        certs.push({
          id: `gold-${olympiadId}`,
          medalType: "GOLD",
          medalColor: "text-yellow-600",
          medalBg: "bg-yellow-100",
          medalIcon: "🥇",
          olympiadId,
          studentName: student.name,
          studentEmail: student.email,
          school: student.school,
          class: student.class,
          province: student.province,
          region: student.region,
        });
      });
    }

    // Silver medals
    if (student.silver && student.silver.length > 0) {
      student.silver.forEach((olympiadId: string) => {
        certs.push({
          id: `silver-${olympiadId}`,
          medalType: "SILVER",
          medalColor: "text-gray-600",
          medalBg: "bg-gray-100",
          medalIcon: "🥈",
          olympiadId,
          studentName: student.name,
          studentEmail: student.email,
          school: student.school,
          class: student.class,
          province: student.province,
          region: student.region,
        });
      });
    }

    // Bronze medals
    if (student.bronze && student.bronze.length > 0) {
      student.bronze.forEach((olympiadId: string) => {
        certs.push({
          id: `bronze-${olympiadId}`,
          medalType: "BRONZE",
          medalColor: "text-[#FF8400]",
          medalBg: "bg-[#FF8400]/10",
          medalIcon: "🥉",
          olympiadId,
          studentName: student.name,
          studentEmail: student.email,
          school: student.school,
          class: student.class,
          province: student.province,
          region: student.region,
        });
      });
    }

    // Top 10 achievements
    if (student.top10 && student.top10.length > 0) {
      student.top10.forEach((olympiadId: string) => {
        certs.push({
          id: `top10-${olympiadId}`,
          medalType: "TOP10",
          medalColor: "text-blue-600",
          medalBg: "bg-blue-100",
          medalIcon: "🏆",
          olympiadId,
          studentName: student.name,
          studentEmail: student.email,
          school: student.school,
          class: student.class,
          province: student.province,
          region: student.region,
        });
      });
    }

    return certs;
  }, [student]);

  // Debug: Log the certificate data to see what's being fetched
  React.useEffect(() => {
    console.log("CertificateDisplay - Fetched certificates:", certificates);
    if (certificates.length > 0) {
      console.log("CertificateDisplay - First certificate:", certificates[0]);
    }
  }, [certificates]);

  if (loading) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
          Achievement Certificates
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
          Achievement Certificates
        </h2>
        <Card className="border-destructive/20 bg-destructive/10">
          <CardContent className="p-6">
            <p className="text-destructive text-center text-xl">
              Error loading certificates: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
          Achievement Certificates
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Certificates Yet
              </h3>
              <p className="text-muted-foreground">
                You haven't received any medals or achievements yet. Keep
                participating in olympiads!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleView3D = (certificate: any) => {
    setSelectedCertificate(certificate);
    setShow3D(true);
  };

  const handleBack = () => {
    setShow3D(false);
    setSelectedCertificate(null);
  };

  if (show3D && selectedCertificate) {
    return (
      <Mandat3D
        mandatData={selectedCertificate}
        onBack={handleBack}
        showBackButton={true}
        variant="classic"
      />
    );
  }

  return (
    <div className="content-wrapper container">
      <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
        Achievement Certificates
      </h2>

      <div className="space-y-8">
        {/* Header with count */}
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {certificates.length}{" "}
              {certificates.length === 1 ? "Certificate" : "Certificates"}
            </Badge>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate: any, index: number) => (
            <Card
              key={certificate.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{certificate.medalIcon}</span>
                    <CardTitle
                      className={`text-lg font-semibold ${certificate.medalColor}`}
                    >
                      {certificate.medalType} Medal
                    </CardTitle>
                  </div>
                  <Badge
                    className={`${certificate.medalBg} ${certificate.medalColor} border-0`}
                  >
                    {certificate.medalType}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Student Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      {certificate.studentName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <School className="h-4 w-4 text-muted-foreground" />
                    <span>{certificate.school}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Class:</span>{" "}
                    {certificate.class}
                  </div>
                </div>

                {/* Achievement Info */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <span>Olympiad Achievement</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Medal Type:</span>{" "}
                    {certificate.medalType}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Province:</span>{" "}
                    {certificate.province}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Region:</span>{" "}
                    {certificate.region}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4">
                  <Button
                    onClick={() => handleView3D(certificate)}
                    className="w-full"
                    variant="default"
                  >
                    View 3D Certificate
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
