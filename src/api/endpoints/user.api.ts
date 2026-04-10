import { api } from '@/api/client';
import type { UserRegistrationData } from '@/shared/types/user.type';

/**
 * Creation of new user account
 * This will use data provided from registration form values
 * @param newUserData
 * @returns
 */
export const createUser = async (newUserData: UserRegistrationData) => {
  const response = await api.post('/v1/users', newUserData);
  return response.data;
};
