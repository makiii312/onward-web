import { useState } from 'react';
import {
  type Control,
  type FieldValues,
  type Path,
  Controller,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { EyeIcon, EyeSlashIcon } from '../Icons';

type PasswordInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
};

const PasswordInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = '',
  required = false,
}: PasswordInputProps<T>) => {
  const [isPasswordDisplayed, setIsPasswordDisplayed] = useState(false);

  const fieldName = label.toLowerCase();
  const placeholderMessage = placeholder || `Enter ${fieldName}`;

  const togglePassword = () => {
    setIsPasswordDisplayed(!isPasswordDisplayed);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>
            {label}
            {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <div className="relative">
            <Input
              {...field}
              id={name}
              type={isPasswordDisplayed ? 'text' : 'password'}
              aria-invalid={fieldState.invalid}
              placeholder={placeholderMessage}
              required={required}
            />
            <button
              type="button"
              aria-label="Show password"
              aria-pressed={isPasswordDisplayed}
              onClick={() => togglePassword()}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
            >
              {isPasswordDisplayed ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    ></Controller>
  );
};

export default PasswordInput;
