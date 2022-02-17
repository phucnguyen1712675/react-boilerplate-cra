/* eslint-disable react/jsx-props-no-spreading */
import { Children, cloneElement, ReactNode, isValidElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';
import clsx from 'clsx';

type Props = {
  id: string;
  label: string;
  children: ReactNode;
  helperText?: string;
  className?: string;
  placeholder?: string;
  validation?: object;
  readOnly?: boolean;
  defaultValue?: string;
};

// type ChildProps = {
//   value: string;
//   disabled?: boolean;
//   selected?: boolean;
//   label?: string;
// };

const Select = ({
  label,
  id,
  validation,
  children,
  className,
  helperText = '',
  placeholder = '',
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

  // Add disabled and selected attribute to option, will be used if readonly
  const readOnlyChildren = Children.map<ReactNode, ReactNode>(
    children,
    (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          disabled: child.props.value !== rest?.defaultValue,
          selected: child.props.value === rest?.defaultValue,
        });
      }
      return child;
    }
  );

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-bold text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <select
          {...register(id, validation)}
          // defaultValue to value blank, will get overriden by ...rest if needed
          defaultValue=""
          {...rest}
          name={id}
          id={id}
          className={clsx(
            firstClassNamesArg,
            'block w-full rounded-md shadow-sm'
          )}
          aria-describedby={id}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {readOnly ? readOnlyChildren : children}
        </select>

        {errors[id] && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <HiExclamationCircle className="text-xl text-red-500" />
          </div>
        )}
      </div>
      <div className="mt-1">
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        {errors[id] && (
          <span className="text-sm text-red-500">{errors[id].message}</span>
        )}
      </div>
    </div>
  );
};

export default Select;
