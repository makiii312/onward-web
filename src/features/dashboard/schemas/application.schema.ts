import { z } from 'zod';

export const applicationSchema = z.object({
  job_title: z.string().min(1, { message: 'Job title is required' }),
  company_name: z.string().min(1, { message: 'Company name is required' }),
  job_platform: z.string().min(1, { message: 'Job platform is required' }),
  date_applied: z.date().nullable(),
  employment_type: z.string().optional(),
  work_setup: z.string().optional(),
  office_location: z.string().optional(),
  work_shift: z.string().optional(),
  work_schedule: z.string().optional(),
  salary_range: z.string().optional(),
  asking_salary: z.string().optional(),
  required_skills: z.array(z.string()).optional(),
  job_post_url: z.string().url({ message: 'Invalid URL' }).optional(),
});

export type ApplicationFormValues = {
  job_title: string;
  company_name: string;
  job_platform: string;
  date_applied: Date | null;
  employment_type?: string;
  work_setup?: string;
  office_location?: string;
  work_shift?: string;
  work_schedule?: string;
  salary_range?: string;
  asking_salary?: string;
  required_skills?: string[];
  job_post_url?: string;
};
