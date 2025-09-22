import { useState, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  FINISH_OLYMPIAD,
  PREVIEW_MEDALS,
  UPDATE_MEDAL_ASSIGNMENTS,
  FINALIZE_MEDALS,
  GET_OLYMPIAD,
} from "../graphql/olympiad/mutation/mutation-medal-preview";
import {
  PreviewMedalsResponse,
  FinalizeMedalsResponse,
  UpdateMedalAssignmentsInput,
  MedalPreview,
  MedalPreviewFlowState,
} from "../types/medal-preview.types";

export const useMedalPreview = (olympiadId: string) => {
  const [currentFlowState, setCurrentFlowState] =
    useState<MedalPreviewFlowState>("CLOSED");
  const [medalPreviews, setMedalPreviews] = useState<MedalPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get olympiad data
  const { data: olympiadData, refetch: refetchOlympiad } = useQuery(
    GET_OLYMPIAD,
    {
      variables: { olympiadId },
      onCompleted: (data) => {
        if (data?.olympiad?.status) {
          setCurrentFlowState(data.olympiad.status as MedalPreviewFlowState);
        }
      },
    }
  );

  // Finish olympiad mutation
  const [finishOlympiad] = useMutation(FINISH_OLYMPIAD, {
    onCompleted: (data: { finishOlympiad: PreviewMedalsResponse }) => {
      if (data.finishOlympiad.success) {
        setMedalPreviews(data.finishOlympiad.medalPreviews);
        setCurrentFlowState("MEDALS_PREVIEW");
        refetchOlympiad();
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // Preview medals mutation
  const [previewMedals] = useMutation(PREVIEW_MEDALS, {
    onCompleted: (data: { previewMedals: PreviewMedalsResponse }) => {
      if (data.previewMedals.success) {
        setMedalPreviews(data.previewMedals.medalPreviews);
        refetchOlympiad();
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // Update medal assignments mutation
  const [updateMedalAssignments] = useMutation(UPDATE_MEDAL_ASSIGNMENTS, {
    onCompleted: (data: { updateMedalAssignments: PreviewMedalsResponse }) => {
      if (data.updateMedalAssignments.success) {
        setMedalPreviews(data.updateMedalAssignments.medalPreviews);
        refetchOlympiad();
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // Finalize medals mutation
  const [finalizeMedals] = useMutation(FINALIZE_MEDALS, {
    onCompleted: (data: { finalizeMedals: FinalizeMedalsResponse }) => {
      if (data.finalizeMedals.success) {
        setCurrentFlowState("FINISHED");
        refetchOlympiad();
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // Action handlers
  const handleFinishOlympiad = useCallback(async () => {
    if (currentFlowState !== "CLOSED") {
      setError("Olympiad must be CLOSED before finishing");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await finishOlympiad({
        variables: { finishOlympiadId: olympiadId },
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to finish olympiad"
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentFlowState, olympiadId, finishOlympiad]);

  const handlePreviewMedals = useCallback(async () => {
    if (currentFlowState !== "MEDALS_PREVIEW") {
      setError("Olympiad must be in MEDALS_PREVIEW status");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await previewMedals({
        variables: { previewMedalsId: olympiadId },
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to preview medals"
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentFlowState, olympiadId, previewMedals]);

  const handleUpdateMedalAssignments = useCallback(
    async (assignments: UpdateMedalAssignmentsInput[]) => {
      if (currentFlowState !== "MEDALS_PREVIEW") {
        setError("Olympiad must be in MEDALS_PREVIEW status");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        await updateMedalAssignments({
          variables: {
            olympiadId,
            assignments,
          },
        });
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to update medal assignments"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [currentFlowState, olympiadId, updateMedalAssignments]
  );

  const handleFinalizeMedals = useCallback(async () => {
    if (currentFlowState !== "MEDALS_PREVIEW") {
      setError("Olympiad must be in MEDALS_PREVIEW status");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await finalizeMedals({
        variables: { finalizeMedalsId: olympiadId },
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to finalize medals"
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentFlowState, olympiadId, finalizeMedals]);

  // Helper functions
  const canFinishOlympiad = currentFlowState === "CLOSED";
  const canPreviewMedals = currentFlowState === "MEDALS_PREVIEW";
  const canUpdateAssignments = currentFlowState === "MEDALS_PREVIEW";
  const canFinalizeMedals = currentFlowState === "MEDALS_PREVIEW";
  const isFinished = currentFlowState === "FINISHED";

  const getMedalPreviewByClassType = useCallback(
    (classTypeId: string) => {
      return medalPreviews.find(
        (preview) => preview.classTypeId === classTypeId
      );
    },
    [medalPreviews]
  );

  const getTotalMedalists = useCallback(() => {
    return medalPreviews.reduce(
      (total, preview) => total + preview.medalists,
      0
    );
  }, [medalPreviews]);

  const getTotalParticipants = useCallback(() => {
    return medalPreviews.reduce(
      (total, preview) => total + preview.totalParticipants,
      0
    );
  }, [medalPreviews]);

  return {
    // State
    currentFlowState,
    medalPreviews,
    olympiadData: olympiadData?.olympiad,
    isLoading,
    error,

    // Actions
    handleFinishOlympiad,
    handlePreviewMedals,
    handleUpdateMedalAssignments,
    handleFinalizeMedals,

    // Helpers
    canFinishOlympiad,
    canPreviewMedals,
    canUpdateAssignments,
    canFinalizeMedals,
    isFinished,
    getMedalPreviewByClassType,
    getTotalMedalists,
    getTotalParticipants,

    // Utilities
    setError,
    refetchOlympiad,
  };
};
