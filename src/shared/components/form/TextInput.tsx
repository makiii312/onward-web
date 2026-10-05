import {
  type Control,
  type FieldValues,
  type Path,
  Controller,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';

type TextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email';
  required?: boolean;
  editable?: boolean;
  icon?: React.ReactNode;
  labelClassName?: string;
  inputClassName?: string;
  displayClassName?: string;
};

const TextInput = <T extends FieldValues>({
  control,
  name,
  label = '',
  placeholder = '',
  type = 'text',
  required = false,
  editable = true,
  icon,
  labelClassName,
  inputClassName,
  displayClassName,
}: TextInputProps<T>) => {
  const fieldName = label.toLowerCase();
  const placeholderMessage = placeholder ?? `Enter ${fieldName}`;
  const displayTextClass = displayClassName ?? 'py-2 text-sm text-gray-700';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={name} className={labelClassName}>
              {icon && <span>{icon}</span>}
              {label}
              {required && <span className="text-destructive">*</span>}
            </FieldLabel>
          )}
          {editable ? (
            <Input
              {...field}
              id={name}
              type={type}
              className={inputClassName}
              aria-invalid={fieldState.invalid}
              placeholder={placeholderMessage}
              required={required}
              value={field.value ?? ''}
            />
          ) : (
            <p className={displayTextClass}>{field.value}</p>
          )}

          {editable && fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    ></Controller>
  );
};

export default TextInput;
