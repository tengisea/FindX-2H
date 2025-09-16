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
import { StudentModel, StudentAnswerModel } from "../../../models";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";
export const studentsByClassType = async (_, { classTypeId }) => {
    try {
        console.log("🔍 studentsByClassType called with classTypeId:", classTypeId);
        const classTypeObjectId = new Types.ObjectId(classTypeId);
        // Find all StudentAnswers for this classType
        const studentAnswers = await StudentAnswerModel.find({
            classTypeId: classTypeObjectId,
        }).lean();
        console.log("📝 Found StudentAnswers:", studentAnswers.length);
        if (studentAnswers.length === 0) {
            console.log("❌ No StudentAnswers found for this classType");
            return [];
        }
        // Get unique student IDs from the StudentAnswers
        const studentIds = [...new Set(studentAnswers.map((sa) => sa.studentId))];
        console.log("👥 Unique student IDs:", studentIds.length);
        // Find all students with these IDs
        const students = await StudentModel.find({
            _id: { $in: studentIds },
        }).lean();
        console.log("📊 Found students:", students.length);
        const result = students.map((doc) => {
            const { _id } = doc, rest = __rest(doc, ["_id"]);
            return Object.assign({ id: String(_id) }, rest);
        });
        console.log("✅ Returning", result.length, "students");
        return result;
    }
    catch (error) {
        console.error("❌ Error in studentsByClassType:", error);
        throw new GraphQLError(error.message);
    }
};
