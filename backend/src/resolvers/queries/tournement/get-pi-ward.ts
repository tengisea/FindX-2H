import { PiWardModel } from "@/models/tournement/PiWard";
import { QueryResolvers } from "../../../types/generated";

export const getPiWard: QueryResolvers["getPiWard"] = async (_, { tournamentId }) => {
    const piWard = await PiWardModel.findOne({ tournamentId }).populate('students.studentId');

    if (!piWard) {
        throw new Error('PiWard not found for this tournament');
    }

    return {
        id: piWard._id.toString(),
        tournamentId: piWard.tournamentId.toString(),
        students: piWard.students.map((student: any) => ({
            studentId: student.studentId?._id?.toString() || student.studentId?.toString() || 'unknown',
            points: student.points,
            place: student.place,
            // Add student information
            studentName: student.studentId?.name || 'Unknown Student',
            studentClass: student.studentId?.class || 'Unknown Class',
            studentSchool: student.studentId?.school || 'Unknown School',
            studentEmail: student.studentId?.email || 'unknown@example.com',
        })),
        createdAt: (piWard as any).createdAt.toISOString(),
        updatedAt: (piWard as any).updatedAt.toISOString(),
    };
};