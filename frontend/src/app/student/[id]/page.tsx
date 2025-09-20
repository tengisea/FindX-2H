"use client";

import { useParams } from "next/navigation";
import { StudentDetail } from "@/components/student/StudentDetail";

const StudentDetailPage = () => {
  const params = useParams();
  const studentId = params.id as string;

  return <StudentDetail studentId={studentId} />;
};

export default StudentDetailPage;
