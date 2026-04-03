import { Outlet } from 'react-router';
import './Auth.css';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <div className="mt-10 flex w-full max-w-md flex-col items-center gap-10">
        <img src="/src/assets/onward-logo.svg" alt="Onward Logo" />
        <Outlet />
      </div>

      <footer className="absolute bottom-4 w-full text-center text-sm text-gray-500">
        &copy; 2026 Onward
      </footer>
    </div>
  );
};

export default AuthLayout;
