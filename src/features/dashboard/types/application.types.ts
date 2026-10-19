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
  id?: string;
  value: string; // dynamic value based on customization
  label: string;
  category: StageCategory;
  order_index: number;
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
  date_applied: Date | string | null;
  employment_type?: EmploymentType;
  work_setup?: WorkSetup;
  office_location?: string;
  work_shift?: WorkShift;
  work_schedule?: string;
  salary_range?: string;
  asking_salary?: string;
  required_skills?: string[];
  job_post_url?: string;
  status: string;
  order_index: number;
  is_new?: boolean; // flag to indicate if the application is newly added and not yet saved in backend
};
