import { useState } from 'react';
import { DragDropProvider, type DragOverEvent } from '@dnd-kit/react';
import { Pencil } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {
  APPLICATION_STAGES,
  MANAGE_APPLICATION_STAGE_COLUMNS,
} from '../../constants/application.constants';
import { ApplicationStageRow } from './ApplicationStageRow';
import type { ApplicationStage } from '../../types/application.types';
import { useApplicationStageDrag } from '../../hooks/useApplicationStageDrag';
import { sortByNumberKey } from '../../utils';

const JobApplicationSettings = () => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [applicationStages, setApplicationStages] =
    useState<ApplicationStage[]>(APPLICATION_STAGES);
  const { handleApplicationStageDragEnd } =
    useApplicationStageDrag(setApplicationStages);

  const handleApplicationStageSave = () => {
    setIsEditEnabled(false);
  };

  return (
    <section className="flex flex-col gap-y-8 px-8">
      <h2 className="text-base font-bold text-gray-700">
        Manage Application Stages
      </h2>
      <Card className="w-full lg:w-3/5">
        <Table>
          <TableHeader>
            <TableRow>
              {MANAGE_APPLICATION_STAGE_COLUMNS.map((columnHeader) => {
                return (
                  <TableHead
                    key={columnHeader.label}
                    className={columnHeader.class}
                  >
                    {columnHeader.label}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <DragDropProvider
            onDragOver={(event: DragOverEvent) => {
              event.preventDefault();
            }}
            onDragEnd={handleApplicationStageDragEnd}
          >
            <TableBody>
              {[...applicationStages]
                .sort(sortByNumberKey('order_index'))
                .map((stage) => {
                  return (
                    <ApplicationStageRow
                      key={stage.value}
                      stage={stage}
                      isEditEnabled={isEditEnabled}
                    />
                  );
                })}
            </TableBody>
          </DragDropProvider>

          <TableFooter>
            <TableRow>
              {isEditEnabled ? (
                <TableCell colSpan={2} className="bg-white">
                  <div className="flex justify-end gap-x-2">
                    <Button
                      className="min-w-28"
                      variant="outline"
                      size="lg"
                      onClick={() => setIsEditEnabled(false)}
                    >
                      Cancel
                    </Button>

                    <Button
                      className="min-w-28"
                      size="lg"
                      onClick={handleApplicationStageSave}
                    >
                      Save
                    </Button>
                  </div>
                </TableCell>
              ) : (
                <TableCell colSpan={2} className="bg-white">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsEditEnabled(true)}
                  >
                    <Pencil /> Edit Stages
                  </Button>
                </TableCell>
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </section>
  );
};

export default JobApplicationSettings;
