import { TableCell, TableRow } from '@/shared/components/ui/table';
import type { ApplicationStage } from '../../types/application.types';
import { useSortable } from '@dnd-kit/react/sortable';

type StageRowProps = {
  stage: ApplicationStage;
  isEditEnabled?: boolean;
};

export const ApplicationStageRow = ({
  stage,
  isEditEnabled = false,
}: StageRowProps) => {
  const { ref } = useSortable({
    id: stage.value,
    index: stage.order_index,
    disabled: !isEditEnabled,
  });

  return (
    <TableRow ref={ref} className="bg-white">
      <TableCell>{stage.label}</TableCell>
      <TableCell>{stage.category}</TableCell>
    </TableRow>
  );
};
