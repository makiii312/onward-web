import { AxiosError } from 'axios';

interface ApiErrorResponse {
  error?: {
    message?: string;
    status?: number;
    timestamp?: string;
    type?: string;
  };
}

export class ApiErrorHandler extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly statusText: string;
  public readonly originalError?: AxiosError;

  constructor(
    message: string,
    code: string,
    status: number,
    statusText: string,
    originalError?: AxiosError,
  ) {
    super(message);
    this.name = 'ApiErrorHandler';
    this.code = code;
    this.status = status;
    this.statusText = statusText;
    this.originalError = originalError;

    Object.setPrototypeOf(this, ApiErrorHandler.prototype);
  }

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isForbidden(): boolean {
    return this.status === 403;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isNetworkError(): boolean {
    return this.code === 'ERR_NETWORK';
  }

  isTimeoutError(): boolean {
    return this.code === 'ECONNABORTED' || this.code === 'ERR_TIMEOUT';
  }
}

/**
 * Handles the parsing and formatting of API errors
 * @param error
 * @returns
 */
export const parseAxiosError = (error: unknown): ApiErrorHandler => {
  if (!(error instanceof AxiosError)) {
    return new ApiErrorHandler(
      'An unexpected error occurred',
      'UNKNOWN_ERROR',
      500,
      'Unknown Error',
    );
  }

  const { response, code, message } = error;
  const apiErrorData = response?.data as ApiErrorResponse | undefined;

  const status = response?.status ?? 500;
  const statusText = response?.statusText ?? 'Error';
  const errorCode = code ?? 'UNKNOWN_ERROR';
  const errorMessage =
    apiErrorData?.error?.message ?? message ?? 'An error occurred';

  return new ApiErrorHandler(
    errorMessage,
    errorCode,
    status,
    statusText,
    error,
  );
};
