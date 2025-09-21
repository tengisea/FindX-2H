import { ClassTypeModel } from "@/models";

// Mapping from old Mongolian values to new English values
const classYearMapping: { [key: string]: string } = {
  '1р анги': 'GRADE_1',
  '2р анги': 'GRADE_2',
  '3р анги': 'GRADE_3',
  '4р анги': 'GRADE_4',
  '5р анги': 'GRADE_5',
  '6р анги': 'GRADE_6',
  '7р анги': 'GRADE_7',
  '8р анги': 'GRADE_8',
  '9р анги': 'GRADE_9',
  '10р анги': 'GRADE_10',
  '11р анги': 'GRADE_11',
  '12р анги': 'GRADE_12',
  'C_CLASS': 'C_CLASS',
  'D_CLASS': 'D_CLASS',
  'E_CLASS': 'E_CLASS',
  'F_CLASS': 'F_CLASS',
};

export const migrateClassYear = async () => {
  try {
    // Find all ClassType documents
    const classTypes = await ClassTypeModel.find({});
    console.log(`Found ${classTypes.length} ClassType documents`);
    
    let updatedCount = 0;
    
    for (const classType of classTypes) {
      if (classType.classYear && classYearMapping[classType.classYear]) {
        const newClassYear = classYearMapping[classType.classYear];
        console.log(`Updating ${classType.classYear} to ${newClassYear}`);
        
        classType.classYear = newClassYear as any;
        await classType.save();
        
        updatedCount++;
      }
    }
    
    console.log(`Migration completed. Updated ${updatedCount} documents.`);
    return {
      success: true,
      message: `Migration completed. Updated ${updatedCount} documents.`,
      updatedCount
    };
    
  } catch (error) {
    console.error('Migration failed:', error);
    return {
      success: false,
      message: `Migration failed: ${error}`,
      updatedCount: 0
    };
  }
};
