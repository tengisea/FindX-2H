import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";
export const getAllStudent = async () => {
    try {
        const students = await StudentModel.find();
        return students;
    }
    catch (error) {
        throw new GraphQLError(error.message);
    }
};
