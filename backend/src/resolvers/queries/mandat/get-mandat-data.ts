import { MandatService } from "@/services/mandatService";
import { handleAsyncError } from "@/utils/errorHandler";

export const getMandatData = async (
  _: unknown,
  {
    studentId,
    classTypeId,
    olympiadId,
  }: {
    studentId: string;
    classTypeId: string;
    olympiadId: string;
  }
) => {
  return await handleAsyncError(async () => {
    return await MandatService.generateMandatData(
      studentId,
      classTypeId,
      olympiadId
    );
  });
};
