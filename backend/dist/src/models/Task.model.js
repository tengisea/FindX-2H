import { model, models, Schema } from "mongoose";
export var TaskType;
(function (TaskType) {
    TaskType["CHALLENGE"] = "CHALLENGE";
    TaskType["TOURNAMENT"] = "TOURNAMENT";
})(TaskType || (TaskType = {}));
export var Difficulty;
(function (Difficulty) {
    Difficulty["EASY"] = "EASY";
    Difficulty["MEDIUM"] = "MEDIUM";
    Difficulty["HARD"] = "HARD";
})(Difficulty || (Difficulty = {}));
export var ClassType;
(function (ClassType) {
    ClassType["GRADE_1"] = "GRADE_1";
    ClassType["GRADE_2"] = "GRADE_2";
    ClassType["GRADE_3"] = "GRADE_3";
    ClassType["GRADE_4"] = "GRADE_4";
    ClassType["GRADE_5"] = "GRADE_5";
    ClassType["GRADE_6"] = "GRADE_6";
    ClassType["GRADE_7"] = "GRADE_7";
    ClassType["GRADE_8"] = "GRADE_8";
    ClassType["GRADE_9"] = "GRADE_9";
    ClassType["GRADE_10"] = "GRADE_10";
    ClassType["GRADE_11"] = "GRADE_11";
    ClassType["GRADE_12"] = "GRADE_12";
})(ClassType || (ClassType = {}));
export const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, enum: Object.values(Difficulty), required: true },
    type: { type: String, enum: Object.values(TaskType), required: true },
    classType: { type: String, enum: Object.values(ClassType), required: true },
    piPoints: { type: Number, required: true },
    problemStatement: { type: String, required: false, default: '' },
    aiGenerated: { type: Boolean, default: true },
    generatedAt: { type: Date, default: Date.now },
    usageCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
export const TaskModel = models["Task"] || model("Task", taskSchema);
