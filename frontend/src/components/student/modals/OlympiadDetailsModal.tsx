"use client";

import { safeFormatDate } from "@/lib/dateUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OlympiadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  olympiad: any;
  student: any;
  isStudentRegistered: boolean;
  onRegister: () => void;
  registering: boolean;
}

const OlympiadDetailsModal = ({
  isOpen,
  onClose,
  olympiad,
  student,
  isStudentRegistered,
  onRegister,
  registering,
}: OlympiadDetailsModalProps) => {
  if (!isOpen || !olympiad) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <Card className="bg-white border border-gray-200 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-3xl font-bold text-gray-800">
              {olympiad.name}
            </CardTitle>
            <button
              onClick={onClose}
              className="text-3xl hover:opacity-70 text-gray-600"
            >
              ×
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                Description
              </h4>
              <p className="text-gray-600 text-base">{olympiad.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                  Date
                </h4>
                <p className="text-gray-600 text-base">
                  {safeFormatDate(olympiad.occurringDay)}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                  Location
                </h4>
                <p className="text-gray-600 text-base">{olympiad.location}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                  Organizer
                </h4>
                <p className="text-gray-600 text-base">
                  {olympiad.organizer?.organizationName || "Unknown"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                  Status
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    olympiad.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {olympiad.status}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                Available Grades
              </h4>
              <div className="flex flex-wrap gap-2">
                {olympiad.classtypes.map((classType: any) => (
                  <span
                    key={classType.id}
                    className={`px-3 py-1 rounded-full text-base font-medium ${
                      String(classType.classYear) === String(student?.class)
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {classType.classYear.replace("GRADE_", "Grade ")}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                Scoring
              </h4>
              <div className="space-y-2">
                {olympiad.classtypes.map((classType: any) => (
                  <div
                    key={classType.id}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800 text-base">
                        {classType.classYear.replace("GRADE_", "Grade ")}
                      </span>
                      <span className="text-base text-gray-600">
                        {classType.questions.length} questions • Max Score:{" "}
                        {classType.maxScore}
                      </span>
                    </div>
                    <div className="mt-2">
                      <h5 className="text-base font-medium text-gray-800 mb-1">
                        Questions:
                      </h5>
                      <div className="space-y-1">
                        {classType.questions.map((question: any) => (
                          <div
                            key={question.id}
                            className="text-base text-gray-600"
                          >
                            • {question.questionName} ({question.maxScore}{" "}
                            points)
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isStudentRegistered
                  ? "bg-orange-500 text-white hover:bg-orange-600 border-0 outline-none"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              style={
                isStudentRegistered
                  ? { backgroundColor: "#f97316", color: "white" }
                  : {}
              }
            >
              Close
            </button>
            {isStudentRegistered ? (
              <button className="flex-1 bg-gray-200 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed border-0 outline-none">
                Already Registered
              </button>
            ) : (
              <button
                onClick={onRegister}
                disabled={registering}
                className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-none"
                style={{ backgroundColor: "#f97316", color: "white" }}
              >
                Select Grade & Register
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OlympiadDetailsModal;
