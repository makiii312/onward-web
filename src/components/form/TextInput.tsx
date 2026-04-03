import {
  type Control,
  type FieldValues,
  type Path,
  Controller,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type TextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: 'text' | 'email';
  required?: boolean;
};

const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  required = false,
}: TextInputProps<T>) => {
  const fieldName = label.toLowerCase();
  const placeholderMessage = `Enter ${fieldName}`;

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
          <Input
            {...field}
            id={name}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholderMessage}
            required={required}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    ></Controller>
  );
};

export default TextInput;
