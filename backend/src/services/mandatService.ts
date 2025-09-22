import { StudentModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { OlympiadModel } from "@/models";
import { OrganizerModel } from "@/models";
import { StudentAnswerModel } from "@/models";
import { ClassRoomModel } from "@/models";
import { generateMandatNumber } from "@/utils/mandat-number-generator";
import { createGraphQLError, ErrorCodes } from "@/utils/errorHandler";

export interface MandatData {
  mandatNumber: string;
  studentName: string;
  studentEmail: string;
  school: string;
  class: string;
  province: string;
  region: string;
  olympiadName: string;
  olympiadLocation: string;
  olympiadDate: string;
  classType: string;
  roomNumber?: string;
  organizerName: string;
  organizerLogo?: string;
  registrationDate: string;
}

export class MandatService {
  /**
   * Generates mandat data for a student after olympiad registration
   */
  static async generateMandatData(
    studentId: string,
    classTypeId: string,
    olympiadId: string
  ): Promise<MandatData> {
    try {
      // Fetch all required data
      const [student, classType, olympiad, studentAnswer] = await Promise.all([
        StudentModel.findById(studentId).lean(),
        ClassTypeModel.findById(classTypeId).lean(),
        OlympiadModel.findById(olympiadId).populate("organizer").lean(),
        StudentAnswerModel.findOne({ studentId, classTypeId }).lean(),
      ]);

      if (!student) {
        throw createGraphQLError("Student not found", ErrorCodes.NOT_FOUND);
      }

      if (!classType) {
        throw createGraphQLError("ClassType not found", ErrorCodes.NOT_FOUND);
      }

      if (!olympiad) {
        throw createGraphQLError("Olympiad not found", ErrorCodes.NOT_FOUND);
      }

      if (!studentAnswer) {
        throw createGraphQLError(
          "Student answer record not found",
          ErrorCodes.NOT_FOUND
        );
      }

      // Get organizer name and logo
      const organizer = olympiad.organizer as any;
      const organizerName = organizer?.organizationName || "Unknown Organizer";
      const organizerLogo = organizer?.logo;

      // Debug logging
      console.log("MandatService - Organizer data:", {
        id: organizer?._id,
        name: organizerName,
        logo: organizerLogo,
      });

      // Get room number if assigned
      let roomNumber: string | undefined;
      if (studentAnswer.classRoom) {
        const room = await ClassRoomModel.findById(
          studentAnswer.classRoom
        ).lean();
        roomNumber = room?.roomNumber;
      }

      // Format dates
      const formatDate = (date: Date | string) => {
        if (!date) return "TBD";
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

      const mandatData: MandatData = {
        mandatNumber: studentAnswer.mandatNumber,
        studentName: student.name,
        studentEmail: student.email,
        school: student.school,
        class: student.class,
        province: student.province,
        region: student.region,
        olympiadName: olympiad.name,
        olympiadLocation: olympiad.location,
        olympiadDate: formatDate(olympiad.occurringDay || new Date()),
        classType: classType.classYear,
        roomNumber,
        organizerName,
        organizerLogo,
        registrationDate: formatDate(studentAnswer.createdAt || new Date()),
      };

      return mandatData;
    } catch (error) {
      console.error("Error generating mandat data:", error);
      throw error;
    }
  }

  /**
   * Gets mandat data for a specific student answer
   */
  static async getMandatDataByStudentAnswer(
    studentAnswerId: string
  ): Promise<MandatData> {
    try {
      const studentAnswer = await StudentAnswerModel.findById(studentAnswerId)
        .populate("studentId")
        .populate("classTypeId")
        .lean();

      if (!studentAnswer) {
        throw createGraphQLError(
          "Student answer not found",
          ErrorCodes.NOT_FOUND
        );
      }

      const student = studentAnswer.studentId as any;
      const classType = studentAnswer.classTypeId as any;

      // Get olympiad data
      const olympiad = await OlympiadModel.findById(classType.olympiadId)
        .populate("organizer")
        .lean();

      if (!olympiad) {
        throw createGraphQLError("Olympiad not found", ErrorCodes.NOT_FOUND);
      }

      // Get organizer name and logo
      const organizer = olympiad.organizer as any;
      const organizerName = organizer?.organizationName || "Unknown Organizer";
      const organizerLogo = organizer?.logo;

      // Debug logging
      console.log("MandatService - Organizer data:", {
        id: organizer?._id,
        name: organizerName,
        logo: organizerLogo,
      });

      // Get room number if assigned
      let roomNumber: string | undefined;
      if (studentAnswer.classRoom) {
        const room = await ClassRoomModel.findById(
          studentAnswer.classRoom
        ).lean();
        roomNumber = room?.roomNumber;
      }

      // Format dates
      const formatDate = (date: Date | string) => {
        if (!date) return "TBD";
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

      const mandatData: MandatData = {
        mandatNumber: studentAnswer.mandatNumber,
        studentName: student.name,
        studentEmail: student.email,
        school: student.school,
        class: student.class,
        province: student.province,
        region: student.region,
        olympiadName: olympiad.name,
        olympiadLocation: olympiad.location,
        olympiadDate: formatDate(olympiad.occurringDay || new Date()),
        classType: classType.classYear,
        roomNumber,
        organizerName,
        organizerLogo,
        registrationDate: formatDate(studentAnswer.createdAt || new Date()),
      };

      return mandatData;
    } catch (error) {
      console.error("Error getting mandat data:", error);
      throw error;
    }
  }

  /**
   * Gets all mandats for a student
   */
  static async getStudentMandats(studentId: string): Promise<MandatData[]> {
    try {
      const studentAnswers = await StudentAnswerModel.find({
        studentId,
      }).lean();

      const mandatDataPromises = studentAnswers.map(async (studentAnswer) => {
        // Check if classTypeId exists
        if (!studentAnswer.classTypeId) {
          return null;
        }

        // Fetch classType separately
        const classType = await ClassTypeModel.findById(
          studentAnswer.classTypeId
        ).lean();

        // Check if classType exists and has olympiadId
        if (!classType || !classType.olympiadId) {
          return null;
        }

        // Get olympiad data
        const olympiad = await OlympiadModel.findById(classType.olympiadId)
          .populate("organizer")
          .lean();

        if (!olympiad) return null;

        // Get student data
        const student = await StudentModel.findById(studentId).lean();
        if (!student) return null;

        // Get organizer name
        const organizer = olympiad.organizer as any;
        const organizerName =
          organizer?.organizationName || "Unknown Organizer";

        // Get room number if assigned
        let roomNumber: string | undefined;
        if (studentAnswer.classRoom) {
          const room = await ClassRoomModel.findById(
            studentAnswer.classRoom
          ).lean();
          roomNumber = room?.roomNumber;
        }

        // Format dates
        const formatDate = (date: Date | string) => {
          if (!date) return "TBD";
          const d = new Date(date);
          return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        };

        return {
          mandatNumber: studentAnswer.mandatNumber,
          studentName: student.name,
          studentEmail: student.email,
          school: student.school,
          class: student.class,
          province: student.province,
          region: student.region,
          olympiadName: olympiad.name,
          olympiadLocation: olympiad.location,
          olympiadDate: formatDate(olympiad.occurringDay || new Date()),
          classType: classType.classYear,
          roomNumber,
          organizerName,
          registrationDate: formatDate(studentAnswer.createdAt || new Date()),
        } as MandatData;
      });

      const mandatData = await Promise.all(mandatDataPromises);
      return mandatData.filter((data): data is MandatData => data !== null);
    } catch (error) {
      console.error("Error getting student mandats:", error);
      throw error;
    }
  }

  /**
   * Gets mandat data for a specific olympiad
   */
  static async getOlympiadMandats(olympiadId: string): Promise<MandatData[]> {
    try {
      // Get all class types for this olympiad
      const classTypes = await ClassTypeModel.find({ olympiadId }).lean();
      const classTypeIds = classTypes.map((ct) => ct._id);

      // Get all student answers for these class types
      const studentAnswers = await StudentAnswerModel.find({
        classTypeId: { $in: classTypeIds },
      })
        .populate("studentId")
        .lean();

      const mandatDataPromises = studentAnswers.map(async (studentAnswer) => {
        const student = studentAnswer.studentId as any;
        const classType = classTypes.find(
          (ct) => ct._id.toString() === studentAnswer.classTypeId.toString()
        );

        if (!classType) return null;

        // Get olympiad data
        const olympiad = await OlympiadModel.findById(olympiadId)
          .populate("organizer")
          .lean();

        if (!olympiad) return null;

        // Get organizer name
        const organizer = olympiad.organizer as any;
        const organizerName =
          organizer?.organizationName || "Unknown Organizer";

        // Get room number if assigned
        let roomNumber: string | undefined;
        if (studentAnswer.classRoom) {
          const room = await ClassRoomModel.findById(
            studentAnswer.classRoom
          ).lean();
          roomNumber = room?.roomNumber;
        }

        // Format dates
        const formatDate = (date: Date | string) => {
          if (!date) return "TBD";
          const d = new Date(date);
          return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        };

        return {
          mandatNumber: studentAnswer.mandatNumber,
          studentName: student.name,
          studentEmail: student.email,
          school: student.school,
          class: student.class,
          province: student.province,
          region: student.region,
          olympiadName: olympiad.name,
          olympiadLocation: olympiad.location,
          olympiadDate: formatDate(olympiad.occurringDay || new Date()),
          classType: classType.classYear,
          roomNumber,
          organizerName,
          registrationDate: formatDate(studentAnswer.createdAt || new Date()),
        } as MandatData;
      });

      const mandatData = await Promise.all(mandatDataPromises);
      return mandatData.filter((data): data is MandatData => data !== null);
    } catch (error) {
      console.error("Error getting olympiad mandats:", error);
      throw error;
    }
  }
}
