import type React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ElementType;
  width?: 'full' | 'auto' | string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
};

const WIDTH_MAPPER = {
  full: 'w-full',
  auto: 'w-auto',
};

const VARIANT_MAPPER = {
  primary: 'bg-purple-100 text-white hover:bg-purple-50',
  secondary: 'bg-grey-100 text-grey-700 hover:bg-lavender-200',
  outline:
    'border border-grey-100 text-grey-700 hover:border-purple-100 hover:text-purple-100',
  danger: 'bg-red-500 text-white hover:bg-red-100',
};

const Button = ({
  children,
  onClick,
  icon: Icon,
  width = 'auto',
  variant = 'primary',
  disabled = false,
}: ButtonProps) => {
  const baseStyle =
    'flex text-sm text-center font-semibold rounded-md py-2 gap-2 justify-center items-center';

  const stateStyle = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  const widthStyle =
    width in WIDTH_MAPPER
      ? WIDTH_MAPPER[width as keyof typeof WIDTH_MAPPER]
      : width;

  const variantStyle =
    variant in VARIANT_MAPPER
      ? VARIANT_MAPPER[variant as keyof typeof VARIANT_MAPPER]
      : VARIANT_MAPPER.primary;

  return (
    <button
      type="button"
      className={`${baseStyle} ${stateStyle} ${widthStyle} ${variantStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default Button;
