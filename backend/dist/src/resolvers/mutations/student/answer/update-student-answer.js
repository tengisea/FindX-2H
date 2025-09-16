var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
export const updateStudentAnswer = async (_, { input }) => {
    var _a;
    try {
        const { id, answers, studentId, classTypeId } = input;
        const existingStudentAnswer = await StudentAnswerModel.findById(id);
        if (!existingStudentAnswer) {
            throw new GraphQLError("Student answer does not exist");
        }
        const totalScoreofOlympiad = Array.isArray(answers)
            ? answers.reduce((sum, a) => { var _a; return sum + ((_a = a === null || a === void 0 ? void 0 : a.score) !== null && _a !== void 0 ? _a : 0); }, 0)
            : (_a = existingStudentAnswer.totalScoreofOlympiad) !== null && _a !== void 0 ? _a : 0;
        const updatedStudentAnswer = await StudentAnswerModel.findByIdAndUpdate(id, { answers, studentId, classTypeId, totalScoreofOlympiad }, { new: true }).lean();
        if (!updatedStudentAnswer) {
            throw new GraphQLError("Failed to update student answer");
        }
        const _b = updatedStudentAnswer, { _id } = _b, rest = __rest(_b, ["_id"]);
        return Object.assign({ id: String(_id) }, rest);
    }
    catch (error) {
        throw new GraphQLError(error.message);
    }
};
