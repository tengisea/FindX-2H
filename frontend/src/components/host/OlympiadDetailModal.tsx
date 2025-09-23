"use client";
import { useQuery } from "@apollo/client";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  BookOpen,
} from "lucide-react";
import { GetOlympiadDocument } from "@/generated";

interface OlympiadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  olympiadId: string;
  onEdit?: () => void;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid Date";
  }
};

const formatTime = (timeString: string | null) => {
  if (!timeString) return "N/A";
  return timeString;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-green-100 text-green-800 border-green-200";
    case "CLOSED":
      return "bg-red-100 text-red-800 border-red-200";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "FINISHED":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "OPEN":
      return "Open";
    case "CLOSED":
      return "Closed";
    case "PENDING":
      return "Pending";
    case "FINISHED":
      return "Finished";
    default:
      return status;
  }
};

const formatClassYear = (classYear: string) => {
  return classYear.replace("GRADE_", "Grade ").replace("_CLASS", " Class");
};

export const OlympiadDetailModal = ({
  isOpen,
  onClose,
  olympiadId,
  onEdit,
}: OlympiadDetailModalProps) => {
  const { data, loading, error } = useQuery(GetOlympiadDocument, {
    variables: { olympiadId },
    skip: !isOpen || !olympiadId,
  });

  const olympiad = data?.olympiad;

  if (loading) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Олимпиадын дэлгэрэнгүй"
        size="lg"
      >
        <div className="flex items-center justify-center bg-white py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-card"></div>
          <span className="ml-2 text-gray-600">Ачааллаж байна...</span>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Олимпиадын дэлгэрэнгүй"
        size="lg"
      >
        <div className="text-center py-8">
          <p className="text-red-500">
            Олимпиадын дэлгэрэнгүй ачаалахад алдаа гарлаа: {error.message}
          </p>
        </div>
      </Modal>
    );
  }

  if (!olympiad) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Олимпиадын дэлгэрэнгүй"
        size="lg"
      >
        <div className="text-center py-8 bg-white">
          <p className="text-gray-600">Олимпиад олдсонгүй</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Олимпиадын дэлгэрэнгүй" size="lg">
      <div className="">
        {/* Header Section */}
        <div className="flex items-start justify-between bg-white p-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black">{olympiad.name}</h2>
            <p className="text-gray-600 leading-relaxed ">
              {olympiad.description}
            </p>
          </div>

        </div>

        <div className="bg-white p-2">
          <h3 className="text-sm font-medium text-black flex items-center space-x-2 mb-3">
            <BookOpen className="w-4 h-4 text-gray-600" />
            <span>Ангийн төрлүүд</span>
          </h3>
          <div className="space-y-3">
            {olympiad.classtypes?.map((classType: any, index: number) => (
              <div
                key={classType.id}
                className="border-2 rounded-lg border-gray-300 pl-3  p-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-black">
                    {formatClassYear(classType.classYear)}
                  </h4>
                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                    <span>{classType.medalists} медальт</span>
                    <span>
                      {classType.participants?.length || 0} оролцогч
                    </span>
                    <span>{formatTime(classType.occurringTime)}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Дээд оноо:{" "}
                  <span className="text-black font-medium">
                    {classType.maxScore}
                  </span>
                </p>
                {classType.questions && classType.questions.length > 0 && (
                  <div className="grid grid-cols-2 gap-1">
                    {classType.questions.map(
                      (question: any, qIndex: number) => (
                        <div
                          key={question.id}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-gray-600">
                            {question.questionName}
                          </span>
                          <span className="text-gray-500">
                            {question.maxScore} оноо
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white  p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">Бүртгэл хаагдах огноо</p>
                <p className="text-sm text-black font-medium">
                  {formatDate(olympiad.closeDay)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">Олимпиадын огноо</p>
                <p className="text-sm text-black font-medium">
                  {formatDate(olympiad.occurringDay)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">Байршил</p>
                <p className="text-sm text-black font-medium">
                  {olympiad.location || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">Оролцогчид</p>
                <p className="text-sm text-black font-medium">
                  {olympiad.classtypes?.reduce(
                    (total: number, ct: any) => total + (ct.participants?.length || 0),
                    0
                  ) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end bg-white p-4">
          {onEdit && (
            <div className="ml-4">
              <Button
                onClick={onEdit}
                className="bg-[#FF8400] hover:bg-[#FF8400]/80 text-white"
              >
                Засах
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
