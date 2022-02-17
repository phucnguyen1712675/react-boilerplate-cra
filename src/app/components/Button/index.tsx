import { ReactNode, ReactElement, MouseEventHandler } from 'react';
import clsx from 'clsx';

type ButtonType = 'button' | 'submit' | 'reset';

type Props = {
  children: ReactNode;
  className?: string;
  type?: ButtonType;
  primary?: boolean;
  danger?: boolean;
  block?: boolean;
  icon?: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  rounded?: boolean;
  disabled?: boolean;
};

const getCustomStyling = (primary: boolean, danger: boolean) => {
  let result: string;

  if (primary && danger) {
    result = 'bg-red-500 text-white shadow-red-500/30';
  } else if (primary) {
    result = 'bg-bright-blue text-white shadow-bright-blue/30';
  } else if (danger) {
    result = 'border border-red-500/50 bg-white text-red-500 shadow-red-500/10';
  } else {
    result =
      'border border-bright-blue/50 bg-white text-bright-blue shadow-bright-blue/10';
  }

  return result;
};

const Button = ({
  children,
  icon,
  className,
  type = 'button',
  primary = false,
  danger = false,
  block = false,
  rounded = false,
  disabled = false,
  onClick = () => {},
}: Props) => {
  let content: ReactNode;

  if (icon && children) {
    content = (
      <>
        {icon}
        <span className="ml-2">{children}</span>
      </>
    );
  } else if (icon) {
    content = icon;
  } else {
    content = children;
  }

  const customStyling = getCustomStyling(primary, danger);

  return (
    <button
      /* eslint-disable-next-line react/button-has-type */
      type={type}
      className={clsx(
        'rounded-md px-4 py-2 text-center font-medium shadow-sm transition hover:bg-opacity-70 hover:text-opacity-70 focus:outline-none',
        customStyling,
        block && 'w-full shadow-2xl',
        rounded && 'rounded-full',
        icon && 'inline-flex items-center',
        disabled && 'disabled',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
