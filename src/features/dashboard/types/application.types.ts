import type {
  EMPLOYMENT_TYPES,
  STAGE_CATEGORY_COLORS,
  WORK_SETUPS,
  WORK_SHIFTS,
} from '../constants/application.constants';

export type StageCategory =
  | 'Saved'
  | 'Applied'
  | 'Interview'
  | 'Exam'
  | 'Offer'
  | 'Hired'
  | 'Closed';

export type ApplicationStage = {
  value: string; // dynamic value based on customization
  label: string;
  category: StageCategory;
};

export type StageCategoryColor =
  (typeof STAGE_CATEGORY_COLORS)[keyof typeof STAGE_CATEGORY_COLORS];

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export type WorkShift = (typeof WORK_SHIFTS)[number];

export type WorkSetup = (typeof WORK_SETUPS)[number];

export type ApplicationItem = {
  id: string;
  job_title: string;
  company_name: string;
  job_platform: string;
  date_applied: string | null;
  status: string;
};
