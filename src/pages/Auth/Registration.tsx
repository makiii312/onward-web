import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  registrationSchema,
  type RegistrationFormValues,
} from '@/schemas/auth.schema';
import { createUser } from '@/api/endpoints/user.api';
import { ApiErrorHandler } from '@/api/errors';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AuthCard from '@/components/card/AuthCard';
import TextInput from '@/components/form/TextInput';
import PasswordInput from '@/components/form/PasswordInput';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (registrationData: RegistrationFormValues) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        registrationData;

      const formattedRequestData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: confirmPassword,
      };

      await createUser(formattedRequestData);
      toast.success('Successfully registered', { toasterId: 'global' });
      navigate('/auth/login');
    } catch (error: unknown) {
      let errorMessage = 'Failed to register.';

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
    <AuthCard title="Registration">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <TextInput control={form.control} name="firstName" label="First name" />
        <TextInput control={form.control} name="lastName" label="Last name" />
        <TextInput
          control={form.control}
          name="email"
          label="Email address"
          type="email"
        />
        <PasswordInput
          control={form.control}
          name="password"
          label="Password"
        />
        <PasswordInput
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter password"
        />

        <div className="mt-8 flex flex-col gap-y-4">
          <Button type="submit" size="lg">
            Register
          </Button>
          <p className="text-xs">
            Already have an account?{' '}
            <Link className="text-purple-100" to="/auth/login">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default RegistrationPage;
