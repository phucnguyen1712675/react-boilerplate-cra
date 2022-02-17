/* eslint-disable react/jsx-props-no-spreading */
import { useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';
import clsx from 'clsx';

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  helperText?: string;
  validation?: object;
  className?: string;
};

const TextArea = ({
  id,
  label,
  validation,
  className,
  placeholder = '',
  helperText = '',
  readOnly = false,
  ...rest
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  let firstClassNamesArg: string;
  if (readOnly) {
    firstClassNamesArg =
      'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0';
  } else if (errors[id]) {
    firstClassNamesArg =
      'border-red-500 focus:border-red-500 focus:ring-red-500';
  } else {
    firstClassNamesArg =
      'focus:ring-primary-500 focus:border-primary-500 border-gray-300';
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-bold text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <textarea
          {...register(id, validation)}
          rows={3}
          {...rest}
          name={id}
          id={id}
          readOnly={readOnly}
          className={clsx(
            firstClassNamesArg,
            'block w-full rounded-md shadow-sm'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
        {errors[id] && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <HiExclamationCircle className="text-xl text-red-500" />
          </div>
        )}
      </div>
      <div className="mt-1">
        {helperText !== '' && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {errors[id] && (
          <span className="text-sm text-red-500">{errors[id].message}</span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
