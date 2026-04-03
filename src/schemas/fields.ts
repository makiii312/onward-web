import { z } from 'zod';

export const firstNameSchema = z
  .string()
  .min(1, { message: 'First name is required' });

export const lastNameSchema = z
  .string()
  .min(1, { message: 'Last name is required' });

export const emailSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .email({ message: 'Invalid email address' });

export const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' });
