import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-start">
      <div className="mt-10 flex w-full max-w-md grow flex-col items-center gap-10">
        <img src="/src/assets/onward-logo.svg" alt="Onward Logo" />
        <Outlet />
      </div>

      <footer className="relative my-10 w-full justify-self-end text-center text-sm text-gray-500">
        &copy; 2026 Onward
      </footer>
    </div>
  );
};

export default AuthLayout;
