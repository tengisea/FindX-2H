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
import { ClassTypeModel, StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";
export const getStudentsByOlympiadId = async (_, { olympiadId }) => {
    try {
        console.log("🔍 getStudentsByOlympiadId called with olympiadId:", olympiadId);
        const olympiadObjectId = new Types.ObjectId(olympiadId);
        console.log("📦 Converted to ObjectId:", olympiadObjectId);
        // First, let's check if there are any ClassTypes for this olympiad
        const classTypes = await ClassTypeModel.find({
            olympiadId: olympiadObjectId,
        });
        console.log("📊 Found ClassTypes:", classTypes.length);
        if (classTypes.length > 0) {
            console.log("📋 ClassType IDs:", classTypes.map((ct) => ct._id));
        }
        // Check if there are any StudentAnswers for these ClassTypes
        const classTypeIds = classTypes.map((ct) => ct._id);
        const studentAnswers = await StudentAnswerModel.find({
            classTypeId: { $in: classTypeIds },
        });
        console.log("📝 Found StudentAnswers:", studentAnswers.length);
        // Use aggregation to join ClassType -> StudentAnswer on classTypeId
        const pipeline = [
            { $match: { olympiadId: olympiadObjectId } },
            { $project: { _id: 1 } },
            {
                $lookup: {
                    from: "studentanswers",
                    localField: "_id",
                    foreignField: "classTypeId",
                    as: "answers",
                },
            },
            { $unwind: "$answers" },
            { $replaceRoot: { newRoot: "$answers" } },
        ];
        const joined = await ClassTypeModel.aggregate(pipeline);
        console.log("🔗 Aggregation result:", joined.length, "documents");
        if (!joined || joined.length === 0) {
            console.log("❌ No results from aggregation");
            return [];
        }
        const result = joined.map((doc) => {
            const { _id } = doc, rest = __rest(doc, ["_id"]);
            return Object.assign({ id: String(_id) }, rest);
        });
        console.log("✅ Returning", result.length, "student answers");
        return result;
    }
    catch (error) {
        console.error("❌ Error in getStudentsByOlympiadId:", error);
        throw new GraphQLError(error.message);
    }
};
