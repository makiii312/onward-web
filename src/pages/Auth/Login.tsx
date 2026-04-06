import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import { loginAccount } from '@/api/endpoints/auth.api';
import { ApiErrorHandler } from '@/api/errors';
import { useAuth } from '@/hooks/useAuth';

import { toast } from 'sonner';
import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import AuthCard from '@/components/card/AuthCard';
import TextInput from '@/components/form/TextInput';
import PasswordInput from '@/components/form/PasswordInput';

const LoginPage = () => {
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (loginData: LoginFormValues) => {
    try {
      const response = await loginAccount(loginData);
      if ('attributes' in response.data) {
        const { token, user } = response.data.attributes;
        toast.success('Successfully logged in', { toasterId: 'global' });
        login({
          token,
          userId: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
        });
      }
    } catch (error: unknown) {
      let errorMessage = 'Failed to login.';

      if (error instanceof ApiErrorHandler) {
        errorMessage = error?.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      console.error('error', errorMessage);
      toast.error(errorMessage, { toasterId: 'global' });
    }
  };

  return (
    <AuthCard title="User Login">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
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
