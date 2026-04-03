import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

import AuthCard from '@/components/card/AuthCard';
import TextInput from '@/components/form/TextInput';
import PasswordInput from '@/components/form/PasswordInput';

const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <AuthCard title="User Login">
      <form className="flex flex-col gap-y-4">
        <FieldGroup>
          {/* Email */}
          <TextInput
            control={form.control}
            name="email"
            label="Email address"
            type="email"
          />
          {/* Password */}
          <PasswordInput
            control={form.control}
            name="password"
            label="Password"
          />
        </FieldGroup>
        <div className="mt-8 flex flex-col gap-y-4">
          <Button type="submit" size="lg">
            Login
          </Button>
          <p className="text-xs">
            Don’t have an account yet?{' '}
            <Link className="text-purple-100" to="/auth/register">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default LoginPage;
