import { ReactNode, ReactElement, MouseEventHandler } from 'react';
import clsx from 'clsx';

type ButtonType = 'button' | 'submit' | 'reset';

type Props = {
  children: ReactNode;
  className?: string;
  type?: ButtonType;
  primary?: boolean;
  block?: boolean;
  icon?: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  rounded?: boolean;
  disabled?: boolean;
};

const Button = ({
  children,
  icon,
  className,
  onClick = () => {},
  type = 'button',
  primary = false,
  block = false,
  rounded = false,
  disabled = false,
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

  return (
    <button
      /* eslint-disable-next-line react/button-has-type */
      type={type}
      className={clsx(
        'focus:shadow-outline hover:border-currentColor rounded-md px-4 py-2 text-center font-medium shadow-md transition hover:bg-opacity-70 hover:text-opacity-70  focus:outline-none',
        primary
          ? 'bg-bright-blue text-white shadow-bright-blue/30'
          : 'border border-bright-blue/50 bg-white text-bright-blue shadow-bright-blue/10',
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
