/* eslint-disable react/jsx-props-no-spreading */
import { useState, SyntheticEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import clsx from 'clsx';

type Props = {
  label: string;
  id: string;
  placeholder?: string;
  readOnly?: boolean;
  helperText?: string;
  validation?: object;
  className?: string;
};

const PasswordInput = ({
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleToggle = (e: SyntheticEvent) => {
    e.preventDefault();
    togglePassword();
  };

  let firstClassNamesArg;
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

  let buttonChild;
  if (showPassword) {
    buttonChild = (
      <HiEyeOff className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
    );
  } else {
    buttonChild = (
      <HiEye className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
    );
  }
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-bold text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          {...register(id, validation)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
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

        <button
          type="button"
          onClick={handleToggle}
          className="focus:ring-primary-500 absolute inset-y-0 right-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none focus:ring"
        >
          {buttonChild}
        </button>
      </div>
      <div className="mt-1">
        {helperText !== '' && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {errors[id] && (
          <span className="text-sm italic text-red-500">
            {errors[id].message}
          </span>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
