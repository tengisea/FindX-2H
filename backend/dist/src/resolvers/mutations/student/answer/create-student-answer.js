import { StudentAnswerModel, StudentModel } from "../../../../models";
import { GraphQLError } from "graphql";
export const createStudentAnswer = async (_, { input }) => {
    try {
        const { studentId, classTypeId, answers } = input;
        const existingStudent = await StudentModel.findById(studentId);
        if (!existingStudent)
            throw new GraphQLError("Student does not exist");
        const totalScoreofOlympiad = Array.isArray(answers)
            ? answers.reduce((sum, a) => { var _a; return sum + ((_a = a === null || a === void 0 ? void 0 : a.score) !== null && _a !== void 0 ? _a : 0); }, 0)
            : 0;
        const studentAnswer = new StudentAnswerModel({
            studentId,
            classTypeId,
            answers,
            totalScoreofOlympiad,
        });
        await studentAnswer.save();
        const created = studentAnswer.toObject();
        return Object.assign({ id: String(created._id) }, created);
    }
    catch (error) {
        throw new GraphQLError(error.message);
    }
};
