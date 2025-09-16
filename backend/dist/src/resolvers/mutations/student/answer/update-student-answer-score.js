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
import { GraphQLError } from "graphql";
import { StudentAnswerModel } from "../../../../models";
export const updateStudentAnswerScore = async (_, { studentAnswerId, questionId, score, }) => {
    try {
        const existing = await StudentAnswerModel.findById(studentAnswerId);
        if (!existing)
            throw new GraphQLError("Student answer not found");
        const answers = existing.answers || [];
        const idx = answers.findIndex((a) => String(a.questionId) === String(questionId));
        if (idx === -1) {
            answers.push({ questionId, score });
        }
        else {
            answers[idx].score = score;
        }
        const totalScoreofOlympiad = answers.reduce((sum, a) => { var _a; return sum + ((_a = a === null || a === void 0 ? void 0 : a.score) !== null && _a !== void 0 ? _a : 0); }, 0);
        const updated = await StudentAnswerModel.findByIdAndUpdate(studentAnswerId, { answers, totalScoreofOlympiad }, { new: true }).lean();
        if (!updated)
            throw new GraphQLError("Failed to update score");
        const _a = updated, { _id } = _a, rest = __rest(_a, ["_id"]);
        return Object.assign({ id: String(_id) }, rest);
    }
    catch (error) {
        throw new GraphQLError(error.message);
    }
};
