import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type DashboardSectionProps = {
  title: string;
  titleExtra?: React.ReactNode;
  children: React.ReactNode;
};

const DashboardSection = ({
  title,
  titleExtra,
  children,
}: DashboardSectionProps) => (
  <section>
    <Card>
      <CardHeader>
        <CardTitle>
          {title} {titleExtra && <>{titleExtra}</>}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </section>
);

export default DashboardSection;
