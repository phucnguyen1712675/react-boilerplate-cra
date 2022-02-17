import clsx from 'clsx';

import { LoadingIndicator } from 'app/components';

type Props = {
  text: string;
  size?: string;
  className?: string;
};

const Spinner = ({ className, text, size = '5rem' }: Props) => {
  const header = text ? (
    <h4 className="mt-[5px] text-2xl font-semibold">{text}</h4>
  ) : null;

  return (
    <div
      className={clsx('flex flex-col items-center justify-center', className)}
    >
      {header}
      <LoadingIndicator className={`w-[${size}] h-[${size}]`} />
    </div>
  );
};

export default Spinner;
