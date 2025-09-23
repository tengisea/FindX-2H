"use client";

import { useParams } from "next/navigation";
import { StudentDetail } from "@/components/student/StudentDetail";

const StudentDetailPage = () => {
  const params = useParams();
  const studentId = params.id as string;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <StudentDetail studentId={studentId} />
      </div>
    </div>
  );
};

export default StudentDetailPage;
