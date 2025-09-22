import { MandatService } from "@/services/mandatService";
import { handleAsyncError } from "@/utils/errorHandler";

export const getOlympiadMandats = async (
  _: unknown,
  { olympiadId }: { olympiadId: string }
) => {
  return await handleAsyncError(async () => {
    return await MandatService.getOlympiadMandats(olympiadId);
  });
};
