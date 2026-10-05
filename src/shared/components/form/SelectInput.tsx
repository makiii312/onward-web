import {
  type Control,
  type FieldValues,
  type Path,
  Controller,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/shared/components/ui/native-select';
import { formatSnakeToTitleCase } from '@/shared/lib/stringUtils';


type SelectInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
    editable?: boolean;
    options?: { value: string; label: string }[];
    icon?: React.ReactNode;
    labelClassName?: string;
    inputClassName?: string;
    displayClassName?: string;
};

const SelectInput = <T extends FieldValues>({ control, name, label = '', placeholder = '', required = false, editable = true, options, icon, labelClassName, inputClassName, displayClassName }: SelectInputProps<T>) => {
    const fieldName = label.toLowerCase();
    const placeholderMessage = placeholder ?? `Select ${fieldName}`;
    const displayTextClass = displayClassName ?? 'py-2 text-sm text-gray-700';
    
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                    {label && (
                        <FieldLabel htmlFor={name} className={labelClassName}>
                        {icon && <span>{icon}</span>}
                        {label}
                        {required && <span className="text-destructive">*</span>}
                        </FieldLabel>
                    )}
                    
                    {editable ? (
                        <NativeSelect {...field} className={inputClassName} aria-invalid={fieldState.invalid}>
                            {placeholderMessage && <NativeSelectOption value="">{placeholderMessage}</NativeSelectOption>}
                            {options?.map((option) => (
                                <NativeSelectOption key={option.value} value={option.value}>
                                    {option.label}
                                </NativeSelectOption>
                            ))}
                        </NativeSelect>
                    ) : (
                            <p className={displayTextClass}>
                                {formatSnakeToTitleCase(field.value)}
                            </p>
                    )}

                    {editable && fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />

    );
};

export default SelectInput;