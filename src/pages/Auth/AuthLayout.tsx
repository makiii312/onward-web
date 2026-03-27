import { Outlet } from 'react-router';
import './Auth.css';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <img src="/src/assets/onward-logo.svg" alt="Onward Logo" />
        <Outlet />
      </div>

      <footer className="w-full absolute bottom-4 text-center text-sm text-gray-500">
        &copy; 2026 Onward
      </footer>
    </div>
  );
};

export default AuthLayout;
