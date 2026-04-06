import { api } from '@/api/client';
import type { UserCredentials } from '@/types/auth.types';

/**
 * User account login via email & password credentials
 * This will retrieve access token and user details
 * after successful authentication request if credentials are valid
 * @param credentials
 * @returns
 */
export const loginAccount = async (credentials: UserCredentials) => {
  const response = await api.post('/v1/login', credentials);
  return response.data;
};

/**
 * User account logout
 * @returns
 */
export const logoutAccount = async () => {
  const response = await api.post('/v1/logout');
  return response.data;
};
