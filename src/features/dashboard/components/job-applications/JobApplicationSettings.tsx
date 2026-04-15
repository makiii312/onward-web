import {
  DragDropProvider,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
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
import { Pencil } from 'lucide-react';
import {
  APPLICATION_STAGES,
  MANAGE_APPLICATION_STAGE_COLUMNS,
} from '../../constants/application.constants';
import { ApplicationStageRow } from './ApplicationStageRow';
import { useState } from 'react';
import type { ApplicationStage } from '../../types/application.types';

const JobApplicationSettings = () => {
  const [applicationStages, setApplicationStages] =
    useState<ApplicationStage[]>(APPLICATION_STAGES);

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
            onDragEnd={(event: DragEndEvent) => {
              console.log('onDragEnd event', event);
              if (event.canceled) return;

              const { source, target } = event.operation;

              if (!source || !target) return;

              if (isSortable(source) && isSortable(target)) {
                const { initialIndex } = source;
                const { index: targetIndex } = target;

                if (initialIndex === targetIndex) return;

                if (initialIndex !== targetIndex) {
                  setApplicationStages((items) => {
                    const newItems = [...items];
                    const [movedItem] = newItems.splice(initialIndex, 1);
                    newItems.splice(targetIndex, 0, movedItem);

                    return newItems.map((item, index) => ({
                      ...item,
                      order_index: index,
                    }));
                  });
                }
              }
            }}
          >
            <TableBody>
              {[...applicationStages]
                .sort(
                  (firstItem, secondItem) =>
                    firstItem.order_index - secondItem.order_index,
                )
                .map((stage) => {
                  return (
                    <ApplicationStageRow key={stage.value} stage={stage} />
                  );
                })}
            </TableBody>
          </DragDropProvider>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="bg-white">
                <Button variant="outline" size="lg">
                  <Pencil /> Edit Stages
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </section>
  );
};

export default JobApplicationSettings;
