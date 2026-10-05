import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock,
  HandCoins,
  MapPinned,
  Monitor,
  PencilIcon,
  SquareArrowOutUpRight,
  Wrench,
  Trash,
} from 'lucide-react';
import type { ApplicationItem } from '../../types/application.types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { SelectJobPlatform } from './SelectJobPlatform';
import { SelectAppliedDate } from './SelectAppliedDate';
import { useState } from 'react';
import RichTextEditor from '@/shared/components/tiptap/RichTextEditor';
import TextInput from '@/shared/components/form/TextInput';
import SelectInput from '@/shared/components/form/SelectInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  applicationSchema,
  type ApplicationFormValues,
} from '../../schemas/application.schema';
import { FieldGroup } from '@/shared/components/ui/field';
import RichTextCard from '@/shared/components/tiptap/RichTextCard';
import { EMPLOYMENT_TYPE_OPTIONS, WORK_SETUP_OPTIONS, WORK_SHIFT_OPTIONS } from '../../constants/application.constants';

type JobApplicationViewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
  applicationId?: string;
  initialData?: ApplicationItem;
  mode?: 'view' | 'edit';
  onModeChange?: (mode: 'view' | 'edit') => void;
  onDelete?: () => void;
};

export const JobApplicationView = ({
  open,
  onOpenChange,
  applicationId,
  initialData,
  mode = 'view',
  onModeChange,
  onDelete,
}: JobApplicationViewProps) => {
  const editable = mode === 'edit';
  console.log('editable', editable);
  console.log('mode', mode);

  const [notes, setNotes] = useState<object[]>([]);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      job_title: initialData?.job_title ?? '',
      company_name: initialData?.company_name ?? '',
      job_platform: initialData?.job_platform ?? '',
      date_applied: initialData?.date_applied
        ? new Date(initialData.date_applied)
        : null,
      employment_type: initialData?.employment_type ?? '',
      work_setup: initialData?.work_setup ?? '',
      office_location: initialData?.office_location ?? '',
      work_shift: initialData?.work_shift ?? '',
      work_schedule: initialData?.work_schedule ?? '',
      salary_range: initialData?.salary_range ?? '',
      asking_salary: initialData?.asking_salary ?? '',
      required_skills: initialData?.required_skills ?? [],
      job_post_url: initialData?.job_post_url ?? '',
    },
  });

  const handleDelete = () => {
    onDelete?.();
  };

  const saveNewNote = (note: object) => {
    console.log('saveNewNote', note);
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const onSubmit = () => {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* <SheetTrigger asChild>{children}</SheetTrigger> */}
      <SheetContent className="w-153.75! gap-0 bg-gray-100 lg:max-w-153.75!">
        <SheetHeader className="bg-white">
          <SheetTitle className="sr-only">Job Application Details</SheetTitle>
          <SheetDescription className="sr-only"></SheetDescription>
          {!editable && (
            <div className="flex items-center justify-start gap-x-4">
              <Button variant="ghost" size="icon-sm">
                <SquareArrowOutUpRight className="h-4 w-4 text-gray-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onModeChange?.('edit')}
              >
                <PencilIcon className="h-4 w-4 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={handleDelete}>
                <Trash className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          )}
        </SheetHeader>
        <div className="flex flex-col gap-y-4 overflow-auto">
          {/* Application Details */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-fit flex-col gap-8 bg-white px-4 pt-4 pb-8"
          >
            <FieldGroup>
              <div className="flex flex-col gap-2">
                <TextInput
                  control={form.control}
                  name="job_title"
                  inputClassName="rounded-none border-0 bg-transparent text-2xl! font-semibold text-black hover:bg-transparent focus:border-b focus:border-gray-500 focus:ring-0! focus:ring-transparent!"
                  displayClassName="text-2xl font-semibold text-black"
                  placeholder="Write a job title"
                  editable={editable}
                />

                <div className="flex items-center justify-start gap-x-4">
                  {(initialData?.job_platform || editable) && (
                    <SelectJobPlatform
                      selectedValue={initialData?.job_platform}
                      disabled={!editable}
                    />
                  )}

                  {(initialData?.date_applied || editable) && (
                    <SelectAppliedDate
                      selectedDate={
                        initialData?.date_applied
                          ? new Date(initialData?.date_applied)
                          : undefined
                      }
                      disabled={!editable}
                    />
                  )}
                </div>
              </div>

              <div className="grid h-fit flex-1 auto-rows-min gap-6 lg:grid-cols-2">
                {/* Company Name */}
                <div className="grid gap-3">
                  <TextInput
                    labelClassName="flex items-center gap-x-2 text-xs font-semibold text-purple-700"
                    control={form.control}
                    name="company_name"
                    label="Company Name"
                    icon={<Building2 className="h-4 w-4" />}
                    editable={editable}
                  />
                </div>
                {/* Employment Type */}
                <div className="grid gap-3">
                  <SelectInput
                    labelClassName="flex items-center gap-x-2 text-xs font-semibold text-purple-700"
                    control={form.control}
                    name="employment_type"
                    label="Employment Type"
                    icon={<BriefcaseBusiness className="h-4 w-4" />}
                    editable={editable}
                    options={EMPLOYMENT_TYPE_OPTIONS}
                  />
                </div>
                {/* Work Setup */}
                <div className="grid gap-3">
                  <SelectInput
                    labelClassName="flex items-center gap-x-2 text-xs font-semibold text-purple-700"
                    control={form.control}
                    name="work_setup"
                    label="Work Setup"
                    icon={<Monitor className="h-4 w-4" />}
                    editable={editable}
                    options={WORK_SETUP_OPTIONS}
                  />
                </div>
                {/* Office Location */}
                <div className="grid gap-3">
                  <TextInput
                    labelClassName="flex items-center gap-x-2 text-xs font-semibold text-purple-700"
                    control={form.control}
                    name="office_location"
                    label="Office Location"
                    icon={<MapPinned className="h-4 w-4" />}
                    editable={editable}
                  />
                </div>
                {/* Work Shift */}
                <div className="grid gap-3">
                  <SelectInput
                    labelClassName="flex items-center gap-x-2 text-xs font-semibold text-purple-700"
                    control={form.control}
                    name="work_shift"
                    label="Work Shift"
                    icon={<Clock className="h-4 w-4" />}
                    editable={editable}
                    options={WORK_SHIFT_OPTIONS}
                  />
                </div>
                {/* Work Schedule */}
                <div className="grid gap-3">
                  <TextInput
                    labelClassName="flex items-center gap-x-2 text-xs font-semibold text-purple-700"
                    control={form.control}
                    name="work_schedule"
                    label="Work Schedule"
                    icon={<CalendarDays className="h-4 w-4" />}
                    editable={editable}
                  />
                </div>
                {/* Salary Range */}
                <div className="grid gap-3">
                  <TextInput
                    labelClassName="flex items-center gap-x-2 text-xs font-semibold text-purple-700"
                    control={form.control}
                    name="salary_range"
                    label="Salary Range"
                    icon={<Banknote className="h-4 w-4" />}
                    editable={editable}
                  />
                </div>
                {/* Asking Salary */}
                <div className="grid gap-3">
                  <TextInput
                    labelClassName="flex items-center gap-x-2 text-xs font-semibold text-purple-700"
                    control={form.control}
                    name="asking_salary"
                    label="Asking Salary"
                    icon={<HandCoins className="h-4 w-4" />}
                    editable={editable}
                  />
                </div>
                {/* Required Skills */}
                <div className="grid gap-3">
                  <TextInput
                    labelClassName="flex items-center gap-x-2 text-xs font-semibold text-purple-700"
                    control={form.control}
                    name="required_skills"
                    label="Required Skills"
                    icon={<Wrench className="h-4 w-4" />}
                    editable={editable}
                  />
                </div>
                {editable && (
                  <div className="col-span-full flex items-center justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={() => onModeChange?.('view')}
                    >
                      Cancel
                    </Button>
                    <Button>Save</Button>
                  </div>
                )}
              </div>
            </FieldGroup>
          </form>

          {/* Notes */}
          <div className="grid gap-3 px-4 py-2">
            <Label
              htmlFor="sheet-demo-notes"
              className="text-base font-semibold text-gray-700"
            >
              Notes
            </Label>

            {notes.map((note, index) => (
              <RichTextCard key={index} jsonNote={note} />
            ))}
          </div>
        </div>

        <SheetFooter>
          <RichTextEditor onAddNote={(note) => saveNewNote(note)} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
