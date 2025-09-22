import { MandatService } from "@/services/mandatService";
import { handleAsyncError } from "@/utils/errorHandler";

export const getStudentMandats = async (
  _: unknown,
  { studentId }: { studentId: string }
) => {
  return await handleAsyncError(async () => {
    return await MandatService.getStudentMandats(studentId);
  });
};
