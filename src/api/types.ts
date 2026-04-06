import { AxiosError } from 'axios';
import { ApiErrorHandler } from './errors';

export interface ApiErrorResponse {
  error?: {
    message?: string;
    status?: number;
    timestamp?: string;
    type?: string;
  };
}

export type ApiError = ApiErrorHandler | AxiosError | Error;

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
