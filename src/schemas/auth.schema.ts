import { z } from 'zod';
import {
  firstNameSchema,
  lastNameSchema,
  emailSchema,
  passwordSchema,
} from './fields';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registrationSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
