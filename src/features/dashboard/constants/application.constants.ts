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
  { value: 'saved', label: 'Reviewing', category: 'Saved' },
  { value: 'applied', label: 'Applied', category: 'Applied' },
  { value: 'interview', label: 'Interview', category: 'Interview' },
  { value: 'withdrawn', label: 'Withdrawn', category: 'Closed' },
  { value: 'rejected', label: 'Rejected', category: 'Closed' },
  { value: 'offer', label: 'Offer', category: 'Offer' },
  { value: 'declined', label: 'Declined', category: 'Closed' },
  { value: 'accepted', label: 'Accepted', category: 'Hired' },
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
