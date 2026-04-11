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

const JobApplicationSettings = () => {
  return (
    <section className="flex flex-col gap-y-8 px-8">
      <h2 className="text-base font-bold text-gray-700">
        Manage Application Stages
      </h2>
      <Card className="w-3/5">
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

          <TableBody>
            {APPLICATION_STAGES.map((stage) => {
              return (
                <TableRow key={stage.value}>
                  <TableCell>{stage.label}</TableCell>
                  <TableCell>{stage.category}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

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
