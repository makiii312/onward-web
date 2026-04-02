type CardProps = {
  title?: string;
  titleExtra?: React.ReactNode;
  children?: React.ReactNode;
  width?: 'full' | 'auto' | string;
};

const WIDTH_MAPPER = {
  full: 'w-full',
  auto: 'w-auto',
};

const Card = ({
  title = '',
  titleExtra,
  children,
  width = 'auto',
}: CardProps) => {
  const baseStyle =
    'flex flex-col rounded-2xl bg-white px-10 pt-6 pb-12 shadow space-y-4 gap-y-8';
  const widthStyle =
    width in WIDTH_MAPPER
      ? WIDTH_MAPPER[width as keyof typeof WIDTH_MAPPER]
      : width;

  return (
    <div className={`${baseStyle}  ${widthStyle}`}>
      {title && (
        <div className="flex items-center gap-x-2">
          <h1 className="text-left text-sm font-bold text-grey-700">{title}</h1>
          {titleExtra && <>{titleExtra}</>}
        </div>
      )}

      {children && <div className="flex flex-col gap-y-12">{children}</div>}
    </div>
  );
};

export default Card;
