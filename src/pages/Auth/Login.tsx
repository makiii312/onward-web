import { Link } from 'react-router';

import AuthCard from '../../components/card/AuthCard';
import Button from '../../components/Button';
import TextInput from '../../components/form/TextInput';
import PasswordInput from '../../components/form/PasswordInput';

const LoginPage = () => {
  return (
    <AuthCard title="User Login">
      <form action="" className="flex flex-col gap-y-4">
        <TextInput label="Email address" />
        <PasswordInput label="Password" />
      </form>

      <div className="flex flex-col gap-y-4">
        <Button>Login</Button>
        <p className="text-xs">
          Don’t have an account yet?{' '}
          <Link className="text-purple-100" to="/auth/register">
            Register here
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default LoginPage;
