import {
  TOKEN_KEY,
  USER_FIRST_NAME,
  USER_ID,
  USER_LAST_NAME,
} from '@/constants/auth.constants';
import type { UserSessionData } from '@/types/auth.types';

export const authService = {
  getAccessToken: () => localStorage.getItem(TOKEN_KEY),

  setSessionData: (userSessionData: UserSessionData) => {
    localStorage.setItem(TOKEN_KEY, userSessionData.token);
    localStorage.setItem(USER_ID, userSessionData.userId);
    localStorage.setItem(USER_FIRST_NAME, userSessionData.firstName);
    localStorage.setItem(USER_LAST_NAME, userSessionData.lastName);
  },

  clearSessionData: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_FIRST_NAME);
    localStorage.removeItem(USER_LAST_NAME);
  },

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),

  getUserId: () => localStorage.getItem(USER_ID),

  getUserName: () => {
    return {
      firstName: localStorage.getItem(USER_FIRST_NAME),
      lastName: localStorage.getItem(USER_LAST_NAME),
    };
  },
};
