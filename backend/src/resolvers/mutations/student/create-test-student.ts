import { StudentModel } from "@/models";
import { GraphQLError } from "graphql";

export const createTestStudent = async () => {
  try {
    // Check if student already exists
    const existingStudent = await StudentModel.findById('68c54f3c22ed3250680b05c8');
    if (existingStudent) {
      return existingStudent;
    }

    // Create new student with specific ID
    const student = new StudentModel({
      _id: '68c54f3c22ed3250680b05c8',
      name: 'Batbayar Enkhbold',
      email: 'batbayar.enkhbold@example.com',
      school: 'Mongolian National University',
      class: '12р анги',
      location: 'Ulaanbaatar, Mongolia',
      profilePicture: 'https://via.placeholder.com/150',
      totalScore: 285,
      piPoints: 1850,
      participatedOlympiads: []
    });

    await student.save();
    return student;
  } catch (error: any) {
    throw new GraphQLError(error.message || "Failed to create test student");
  }
};
