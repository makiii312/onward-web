import React, { useCallback, useEffect, useState } from 'react';
import type { ApplicationItem } from '../../types/application.types';
import { ApplicationCardDropdown } from './ApplicationCardDropdown';
import { Input } from '@/shared/components/ui/input';
import { SelectJobPlatform } from './SelectJobPlatform';
import { SelectAppliedDate } from './SelectAppliedDate';
import { useSortableWithRef } from '../../hooks/useSortableWithRef';

type ApplicationCardProps = {
  application: ApplicationItem;
  onNewUpdate?: (id: string, updates: Partial<ApplicationItem>) => void;
  onNewDelete?: (id: string) => void;
  onExistingDelete?: (id: string) => void;
};

export const ApplicationCard = ({
  application,
  onNewUpdate,
  onNewDelete,
  onExistingDelete,
}: ApplicationCardProps) => {
  const [isEditable, setIsEditable] = useState(application?.is_new ?? false);
  const [jobTitle, setJobTitle] = useState(application.job_title ?? '');
  const [companyName, setCompanyName] = useState(
    application.company_name ?? '',
  );
  const [jobPlatform, setJobPlatform] = useState(
    application.job_platform ?? '',
  );
  const [dateApplied, setDateApplied] = useState(
    application.date_applied ? new Date(application.date_applied) : undefined,
  );

  const [isInteractingChild, setIsInteractingChild] = useState(false);

  const { ref, localRef } = useSortableWithRef<HTMLDivElement>({
    id: application.id,
    index: application.order_index,
    group: application.status,
    type: 'application',
    accept: ['application'],
  });

  /**
   * Finalizes changes for new application when user clicks outside the card or presses Enter,
   * and deletes the card if it's a new application with empty job title
   */
  const finalizeNewChanges = useCallback(() => {
    setIsEditable(false);
    const shouldDelete = application.is_new && !jobTitle.trim();

    if (shouldDelete) {
      onNewDelete?.(application.id);
      return;
    }

    onNewUpdate?.(application.id, {
      job_title: jobTitle,
      company_name: companyName,
      job_platform: jobPlatform,
      date_applied: dateApplied ? dateApplied.toISOString() : null,
      is_new: false,
    });
  }, [
    application.id,
    application.is_new,
    jobTitle,
    companyName,
    jobPlatform,
    dateApplied,
    onNewUpdate,
    onNewDelete,
  ]);

  /**
   * Handles interaction state changes for child elements
   * @param isInteracting
   */
  const handleInteractChildChange = (isInteracting: boolean) => {
    setIsInteractingChild(isInteracting);
  };

  /**
   * Handles key down events for the input fields
   * @param event
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') finalizeNewChanges();
    if (event.key === 'Escape') onNewDelete?.(application.id);
  };

  /**
   * Click outside handler to finalize changes when clicking outside the card, but ignore clicks on interactive child elements (like dropdowns or popovers)
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!localRef.current) return;

      const target = event.target as HTMLElement;
      const isInsideCard = localRef.current?.contains(target);
      const isIgnored = target.closest('[data-ignore-outside-click]');

      if (isEditable && !isInsideCard && !isIgnored && !isInteractingChild) {
        finalizeNewChanges();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [localRef, finalizeNewChanges, isInteractingChild, isEditable]);

  return (
    <div
      ref={ref}
      className="flex min-h-38 w-full cursor-pointer flex-col justify-between gap-y-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      {isEditable ? (
        <div
          className="relative flex flex-col gap-y-1"
          data-ignore-outside-click
        >
          <Input
            className="rounded-none border-0 bg-transparent text-base font-semibold text-black hover:bg-transparent focus:border-b focus:border-gray-500 focus:ring-0! focus:ring-transparent!"
            placeholder="Write a job title"
            defaultValue={application.job_title}
            onKeyDown={handleKeyDown}
            onChange={(e) => setJobTitle(e.target.value)}
            autoFocus
          />
          <Input
            className="rounded-none border-0 bg-transparent text-sm text-gray-700 hover:bg-transparent focus:ring-0! focus:ring-transparent!"
            placeholder="Write a company name"
            defaultValue={application.company_name}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
      ) : (
        <div className="relative flex flex-col gap-y-2">
          <p className="w-11/12 text-base font-semibold text-black">
            {application.job_title}
          </p>
          <p className="text-sm text-gray-700">{application.company_name}</p>
          <ApplicationCardDropdown
            applicationId={application.id}
            applicationData={application}
            onDelete={() => onExistingDelete?.(application.id)}
          />
        </div>
      )}

      <div className="flex flex-col gap-y-2" data-ignore-outside-click>
        {(application?.job_platform || isEditable) && (
          <SelectJobPlatform
            selectedValue={application.job_platform}
            disabled={!isEditable && !application?.is_new}
            onSelectChange={(selectedValue) => setJobPlatform(selectedValue)}
            onOpenChange={(open) => handleInteractChildChange(open)}
          />
        )}
        {(application?.date_applied || isEditable) && (
          <SelectAppliedDate
            selectedDate={
              application.date_applied
                ? new Date(application.date_applied)
                : undefined
            }
            disabled={!isEditable && !application?.is_new}
            onDateChange={(selectedDate) => setDateApplied(selectedDate)}
            onOpenChange={(open) => handleInteractChildChange(open)}
          />
        )}
      </div>
    </div>
  );
};
