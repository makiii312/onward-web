import Card from './card/Card';

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
    <Card title={title} titleExtra={titleExtra}>
      {children}
    </Card>
  </section>
);

export default DashboardSection;
