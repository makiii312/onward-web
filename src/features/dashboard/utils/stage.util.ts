import type { ApplicationStage } from '../types/application.types';
import { HIDDEN_STAGE_CATEGORIES } from '../constants/application.constants';

type GetVisibleStagesParams = {
  stages: ApplicationStage[];
  selectedStages?: string[];
};

export const getVisibleStages = ({
  stages,
  selectedStages = [],
}: GetVisibleStagesParams): ApplicationStage[] => {
  return stages.filter((stage) => {
    const isHiddenCategory = HIDDEN_STAGE_CATEGORIES.has(stage.category);

    const isSelected = selectedStages.includes(stage.value);

    // Show if:
    // - NOT hidden category (default visible)
    // - OR explicitly selected in filter
    return !isHiddenCategory || isSelected;
  });
};
