import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Field } from '@/shared/components/ui/field';
import { Calendar } from '@/shared/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { formatDate } from '@/shared/lib/dateUtils';

type SelectAppliedDateProps = {
  selectedDate?: Date | undefined;
  disabled?: boolean;
  onDateChange?: (date: Date | undefined) => void;
  onOpenChange?: (open: boolean) => void;
};

export const SelectAppliedDate = ({
  selectedDate,
  disabled = false,
  onDateChange,
  onOpenChange,
}: SelectAppliedDateProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(selectedDate);

  const handleSelectDate = (date: Date | undefined) => {
    setDate(date);
    setOpen(false);
    onOpenChange?.(false);
    onDateChange?.(date);
  };

  return (
    <Field className="w-fit" data-ignore-outside-click aria-disabled={disabled}>
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          onOpenChange?.(open);
        }}
      >
        <PopoverTrigger
          className="flex h-fit w-fit items-center justify-start gap-2"
          asChild
        >
          <button
            className="flex gap-x-2 text-xs text-gray-500"
            disabled={disabled}
          >
            <span className="flex cursor-pointer items-center justify-start rounded-2xl border-2 border-dashed p-1">
              <CalendarIcon className="h-4 w-4" color="#a0a9b3 " />
            </span>
            {date ? formatDate(date) : ''}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={handleSelectDate}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
};
