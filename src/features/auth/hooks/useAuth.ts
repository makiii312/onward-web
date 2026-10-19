import { useNavigate } from 'react-router';
import { authService } from '@/features/auth/services/auth.service';
import type { UserSessionData } from '@/shared/types/auth.types';

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (data: UserSessionData) => {
    authService.setSessionData(data);
    navigate('/');
  };

  const logout = () => {
    authService.clearSessionData();
    navigate('/auth/login');
  };

  return {
    getAccessToken: authService.getAccessToken,
    setSessionData: authService.setSessionData,
    clearSessionData: authService.clearSessionData,
    isAuthenticated: authService.isAuthenticated,
    getUserId: authService.getUserId,
    getUserName: authService.getUserName,
    login,
    logout,
  };
};
