import { Collapsible } from '@/shared/components/ui/collapsible';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { getVisibleStages } from '../../utils/stage.util';
import {
  APPLICATION_STAGES,
  JOB_APPLICATION_LIST_COLUMNS,
} from '../../constants/application.constants';
import { ApplicationStageRow } from './ApplicationStageRow';

const JobApplicationListView = () => {
  const visibleStages = getVisibleStages({
    stages: APPLICATION_STAGES, // @TODO: replace with custom application stages of user from API
    selectedStages: [],
  });

  return (
    <Table className="w-full table-fixed">
      {/* List Header */}
      <TableHeader>
        <TableRow>
          {JOB_APPLICATION_LIST_COLUMNS.map((columnHeader) => {
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

      <TableBody>
        {/* Collapsible Job Application Status List */}
        {visibleStages.map((status) => (
          <Collapsible key={status.label} asChild>
            <ApplicationStageRow status={status} />
          </Collapsible>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobApplicationListView;
