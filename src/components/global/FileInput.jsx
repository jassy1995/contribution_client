import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TbUpload } from 'react-icons/tb';

const FileInput = forwardRef(
  (
    {
      label,
      id,
      bordered = false,
      error,
      disabled,
      value,
      onChange,
      labelClassName = '',
      inputClassName = '',
      ...props
    },
    ref
  ) => {
    const handleChange = (e) => {
      const [file] = e.target.files;
      onChange(file);
    };

    return (
      <div className="flex flex-col">
        {!!label && (
          <label htmlFor={id} className={`mb-2 ${labelClassName}`}>
            {label}
          </label>
        )}
        <div className="relative flex">
          <label
            className={classNames(
              `cursor-pointer h-[50px] inline-flex items-center  px-4 py-2 rounded-xl w-full transition duration-300 pr-12 focus-within:ring-1 ring-offset-2 ring-blue-800 ring-opacity-30`,
              { 'opacity-60 pointer-events-none': disabled },
              { 'bg-transparent border border-zinc-300': bordered },
              { 'bg-slate-200': !bordered }
            )}
            htmlFor={id}
          >
            <p className={`${labelClassName}`}>{value ? value.name : 'Click to select a file'}</p>
            <input
              type="file"
              onChange={handleChange}
              id={id}
              {...props}
              ref={ref}
              disabled={disabled}
              className={`absolute w-px opacity-0 ${inputClassName}`}
            />
          </label>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-md flex items-center justify-center pointer-events-none">
            <TbUpload size="20" />
          </div>
        </div>
        {!!error && <div className="text-sm text-red-500 mt-1">{error}</div>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

FileInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  bordered: PropTypes.bool,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default FileInput;
