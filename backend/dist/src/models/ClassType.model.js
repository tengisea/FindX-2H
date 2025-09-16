import { model, models, Schema } from "mongoose";
export var ClassYear;
(function (ClassYear) {
    ClassYear["GRADE_1"] = "1\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_2"] = "2\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_3"] = "3\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_4"] = "4\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_5"] = "5\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_6"] = "6\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_7"] = "7\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_8"] = "8\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_9"] = "9\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_10"] = "10\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_11"] = "11\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_12"] = "12\u0440 \u0430\u043D\u0433\u0438";
})(ClassYear || (ClassYear = {}));
const classTypeSchema = new Schema({
    olympiadId: { type: Schema.Types.ObjectId, ref: "Olympiad", required: true },
    classYear: { type: String, enum: Object.values(ClassYear), required: true },
    maxScore: { type: Number, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    participants: [{ type: Schema.Types.ObjectId, ref: "Student", default: [] }],
    studentsResults: [{ type: Schema.Types.ObjectId, ref: "StudentAnswer", default: [] }],
    medalists: { type: Number, required: true },
}, { timestamps: true });
export const ClassTypeModel = models["ClassType"] || model("ClassType", classTypeSchema);
