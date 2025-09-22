import { MandatService } from "@/services/mandatService";
import { handleAsyncError } from "@/utils/errorHandler";

export const getMandatDataByStudentAnswer = async (
  _: unknown,
  { studentAnswerId }: { studentAnswerId: string }
) => {
  return await handleAsyncError(async () => {
    return await MandatService.getMandatDataByStudentAnswer(studentAnswerId);
  });
};
