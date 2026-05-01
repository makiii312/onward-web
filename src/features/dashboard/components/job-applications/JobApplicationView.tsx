import { PencilIcon, PlusIcon } from 'lucide-react';
import type { ApplicationItem } from '../../types/application.types';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { SelectJobPlatform } from './SelectJobPlatform';
import { SelectAppliedDate } from './SelectAppliedDate';

type JobApplicationViewProps = {
  children?: React.ReactNode;
  applicationId?: string;
  initialData?: ApplicationItem;
  editable?: boolean;
};

export const JobApplicationView = ({
  children,
  applicationId,
  initialData,
  editable = false,
}: JobApplicationViewProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-153.75! gap-0 bg-gray-100 lg:max-w-153.75!">
        <SheetHeader className="bg-white">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-y-4">
          {/* Application Details */}
          <div className="grid h-fit flex-1 auto-rows-min gap-6 bg-white px-4 py-4 lg:grid-cols-2">
            <div className="col-span-2 grid gap-2">
              {editable ? (
                <Input
                  className="rounded-none border-0 bg-transparent text-2xl! font-semibold text-black hover:bg-transparent focus:border-b focus:border-gray-500 focus:ring-0! focus:ring-transparent!"
                  placeholder="Write a job title"
                  defaultValue={initialData?.job_title}
                  autoFocus
                />
              ) : (
                <p className="text-2xl font-semibold text-black">
                  {initialData?.job_title}
                </p>
              )}

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

            {/* Company Name */}
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Company Name</Label>
              {editable ? (
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              ) : (
                <p className="py-2 text-sm text-gray-700">Pedro Duarte</p>
              )}
            </div>
            {/* Employment Type */}
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-employment-type">
                Employment Type
              </Label>
              {editable ? (
                <Input
                  id="sheet-demo-employment-type"
                  defaultValue="Full-time"
                />
              ) : (
                <p className="py-2 text-sm text-gray-700">Full-time</p>
              )}
            </div>
            {/* Work Setup */}
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-work-setup">Work Setup</Label>
              {editable ? (
                <Input id="sheet-demo-work-setup" defaultValue="Remote" />
              ) : (
                <p className="py-2 text-sm text-gray-700">Remote</p>
              )}
            </div>
            {/* Office Location */}
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-office-location">
                Office Location
              </Label>
              {editable ? (
                <Input
                  id="sheet-demo-office-location"
                  defaultValue="New York"
                />
              ) : (
                <p className="py-2 text-sm text-gray-700">New York</p>
              )}
            </div>
            {/* Work Shift */}
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-work-shift">Work Shift</Label>
              {editable ? (
                <Input id="sheet-demo-work-shift" defaultValue="Day" />
              ) : (
                <p className="py-2 text-sm text-gray-700">Day</p>
              )}
            </div>
            {/* Work Schedule */}
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-work-schedule">Work Schedule</Label>
              {editable ? (
                <Input id="sheet-demo-work-schedule" defaultValue="Full-time" />
              ) : (
                <p className="py-2 text-sm text-gray-700">Full-time</p>
              )}
            </div>
            {/* Salary Range */}
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-salary-range">Salary Range</Label>
              {editable ? (
                <Input
                  id="sheet-demo-salary-range"
                  defaultValue="$70,000 - $90,000"
                />
              ) : (
                <p className="py-2 text-sm text-gray-700">$70,000 - $90,000</p>
              )}
            </div>
            {/* Asking Salary */}
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-asking-salary">Asking Salary</Label>
              {editable ? (
                <Input id="sheet-demo-asking-salary" defaultValue="$80,000" />
              ) : (
                <p className="py-2 text-sm text-gray-700">$80,000</p>
              )}
            </div>
            {/* Required Skills */}
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-required-skills">
                Required Skills
              </Label>
              {editable ? (
                <Input
                  id="sheet-demo-required-skills"
                  defaultValue="JavaScript, React, Node.js"
                />
              ) : (
                <p className="py-2 text-sm text-gray-700">
                  JavaScript, React, Node.js
                </p>
              )}
            </div>
            {editable && (
              <div className="col-span-full flex items-center justify-end gap-4">
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button>Save</Button>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="grid gap-3 px-4 py-2">
            <Label
              htmlFor="sheet-demo-notes"
              className="text-base font-semibold text-gray-700"
            >
              Notes
            </Label>
          </div>
        </div>

        <SheetFooter>{/* Rich Text Editor */}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
