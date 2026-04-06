import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';
import { parseAxiosError } from './errors';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_TIMEOUT = 10000;

// Axios Instance
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['X-Request-ID'] = generateRequestId();

    return config;
  },
  (error: AxiosError) => {
    const apiError = parseAxiosError(error);
    console.error('Request error:', apiError);
    return Promise.reject(apiError);
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const apiError = parseAxiosError(error);

    if (apiError.isUnauthorized() && apiError.message === 'Expired token') {
      console.error('Token expired, redirecting to login...', apiError.message);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      window.location.href = '/auth/login';
    }

    if (apiError.isForbidden()) {
      console.error('Access forbidden:', apiError.message);
    }

    if (apiError.isServerError()) {
      console.error('Server error:', apiError.message);
    }

    if (apiError.isNetworkError()) {
      console.error('Network error - check your connection:', apiError.message);
    }

    if (apiError.isTimeoutError()) {
      console.error('Request timeout:', apiError.message);
    }

    return Promise.reject(apiError);
  },
);

// Request ID Format
const generateRequestId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export default api;
