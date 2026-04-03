import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registrationSchema,
  type RegistrationFormValues,
} from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';

import AuthCard from '../../components/card/AuthCard';
import TextInput from '../../components/form/TextInput';
import PasswordInput from '../../components/form/PasswordInput';

const RegistrationPage = () => {
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

  const onSubmit = (data: RegistrationFormValues) => {
    console.log('Register:', data);
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
