import { authService } from '@/services/auth.service';
import type { MiddlewareFunction } from 'react-router';

export const authMiddleware: MiddlewareFunction = async ({
  request,
}): Promise<Response | null> => {
  const isAuthenticated = authService.isAuthenticated();
  const isPublicPath = new URL(request.url).pathname.startsWith('/auth');

  if (!isPublicPath && !isAuthenticated) {
    return new Response(null, {
      status: 302,
      headers: {
        location: '/auth/login',
      },
    });
  }

  return null;
};

export const publicRouteMiddleware: MiddlewareFunction = async ({
  request,
}): Promise<Response | null> => {
  const isAuthenticated = authService.isAuthenticated();
  const isPublicPath = new URL(request.url).pathname.startsWith('/auth');

  if (isPublicPath && isAuthenticated) {
    return new Response(null, {
      status: 302,
      headers: {
        location: '/',
      },
    });
  }

  return null;
};
