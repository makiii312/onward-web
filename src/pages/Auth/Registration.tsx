import { Link } from 'react-router';

import AuthCard from '../../components/card/AuthCard';
import Button from '../../components/Button';
import TextInput from '../../components/form/TextInput';
import PasswordInput from '../../components/form/PasswordInput';

function RegistrationPage() {
  return (
    <AuthCard title="Registration">
      <form action="" className="flex flex-col gap-y-4">
        <TextInput label="First name" />
        <TextInput label="Last name" />
        <TextInput label="Email address" />
        <PasswordInput label="Password" />
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter password"
        />
      </form>

      <div className="flex flex-col gap-y-4">
        <Button>Register</Button>
        <p className="text-xs">
          Already have an account?{' '}
          <Link className="text-purple-100" to="/auth/login">
            Login here
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}

export default RegistrationPage;
