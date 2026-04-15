import type {
  ApplicationStage,
  StageCategory,
} from '../types/application.types';

export const JOB_APPLICATION_LIST_COLUMNS = [
  {
    label: 'Job Title',
    class: 'border',
  },
  {
    label: 'Company Name',
    class: 'border',
  },
  {
    label: 'Job Platform',
    class: 'border',
  },
  {
    label: 'Date Applied',
    class: 'border',
  },
];

export const MANAGE_APPLICATION_STAGE_COLUMNS = [
  {
    label: 'Display Label',
    class: '',
  },
  {
    label: 'Status Category',
    class: '',
  },
];

export const APPLICATION_STAGES: ApplicationStage[] = [
  { value: 'saved', label: 'Reviewing', category: 'Saved', order_index: 0 },
  { value: 'applied', label: 'Applied', category: 'Applied', order_index: 1 },
  {
    value: 'interview',
    label: 'Interview',
    category: 'Interview',
    order_index: 2,
  },
  {
    value: 'withdrawn',
    label: 'Withdrawn',
    category: 'Closed',
    order_index: 3,
  },
  { value: 'rejected', label: 'Rejected', category: 'Closed', order_index: 4 },
  { value: 'offer', label: 'Offer', category: 'Offer', order_index: 5 },
  { value: 'declined', label: 'Declined', category: 'Closed', order_index: 6 },
  { value: 'accepted', label: 'Accepted', category: 'Hired', order_index: 7 },
];

export const HIDDEN_STAGE_CATEGORIES = new Set<StageCategory>([
  'Closed',
  'Hired',
]);

export const STAGE_CATEGORY_COLORS = {
  Saved: 'gray',
  Applied: 'blue',
  Interview: 'purple',
  Exam: 'purple',
  Offer: 'orange',
  Hired: 'green',
  Closed: 'red',
} as const;

export const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Contractual',
  'Freelance',
  'Internship',
  'Temporary',
  'Project-based',
] as const;

export const WORK_SHIFTS = ['Morning', 'Mid', 'Night'] as const;

export const WORK_SETUPS = ['On-site', 'Hybrid', 'Remote'] as const;
