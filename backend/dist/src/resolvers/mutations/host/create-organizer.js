import { OrganizerModel } from "../../../models";
import { GraphQLError } from "graphql";
export const createOrganizer = async (_, { input }) => {
    try {
        const { organizationName, email } = input;
        const existingOrganizer = await OrganizerModel.findOne({ email });
        if (existingOrganizer) {
            throw new GraphQLError("Organizer with this email already exists");
        }
        const organizer = new OrganizerModel({ organizationName, email });
        await organizer.save();
        return organizer;
    }
    catch (error) {
        throw new GraphQLError(error.message);
    }
};
