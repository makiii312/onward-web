import clsx from 'clsx';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  rounded?: boolean;
  className?: string;
};

const VARIANT_STYLES = {
  default: 'bg-grey-100 text-grey-700',
  primary: 'bg-lavender-200 text-purple-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-orange-50 text-orange-700',
  danger: 'bg-red-50 text-red-700',
};

const SIZE_STYLES = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  rounded = true,
  className,
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        rounded ? 'rounded-full' : 'rounded-md',
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
