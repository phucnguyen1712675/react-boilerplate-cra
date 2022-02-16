import clsx from 'clsx';

type Props = {
  className?: string;
  small?: boolean;
};

const LoadingIndicator = ({ className, small = false }: Props) => {
  const sizeClass = small ? 'h-5 w-5' : 'h-12 w-12';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('animate-spin', sizeClass, className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default LoadingIndicator;
