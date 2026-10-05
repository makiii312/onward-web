import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Field } from '@/shared/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

type SelectJobPlatformProps = {
  selectedValue?: string;
  disabled?: boolean;
  onSelectChange?: (platform: string) => void;
  onOpenChange?: (open: boolean) => void;
};

export const SelectJobPlatform = ({
  selectedValue,
  disabled = false,
  onSelectChange,
  onOpenChange,
}: SelectJobPlatformProps) => {
  const [value, setValue] = useState<string | undefined>(selectedValue);

  const OPTIONS = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'jobstreet', label: 'JobStreet' },
    { value: 'indeed', label: 'Indeed' },
    { value: 'company_website', label: 'Company Website' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'other', label: 'Other' },
  ];

  const handleValueChange = (val: string) => {
    setValue(val);
    onSelectChange?.(val);
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open);
  };

  return (
    <Field className="w-fit" data-ignore-outside-click>
      <Select
        value={value}
        onValueChange={handleValueChange}
        onOpenChange={handleOpenChange}
        disabled={disabled}
      >
        <SelectTrigger className="flex h-fit w-fit cursor-default! items-center justify-start gap-2 border-0 p-0 text-xs text-gray-500 opacity-100! [&>svg]:hidden">
          <span className="flex cursor-pointer items-center justify-start rounded-2xl border-2 border-dashed p-1">
            <Globe className="h-4 w-4" color="#a0a9b3 " />
          </span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
};
