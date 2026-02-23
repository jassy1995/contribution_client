import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils.js';
import { TbChevronDown } from 'react-icons/tb';

const Select = forwardRef(
  ({ id, label, options, disabled, error, loading = false, bordered = false, placeholder, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label
          className={cn(
            'pt-5 px-5 rounded-xl w-full transition duration-300 focus-within:ring-2 ring-offset-[3px] ring-blue-800 ring-opacity-60 relative',
            { 'opacity-60 pointer-events-none': disabled },
            { 'bg-transparent border border-zinc-300': bordered },
            { 'bg-slate-200': !bordered }
          )}
        >
          <select id={id} {...props} ref={ref} className="mt-2 pb-2 w-full bg-transparent appearance-none peer">
            {loading ? (
              <option value="" disabled>
                Loading..
              </option>
            ) : (
              <>
                {!!placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </>
            )}
          </select>
          <div className="absolute bottom-1.5 right-2 w-8 h-8 rounded-md flex items-center justify-center pointer-events-none">
            <TbChevronDown size="18" />
          </div>
          {!!label && (
            <span
              className={classNames(
                'text-sm inline-flex opacity-80 transition-all absolute px-5 left-0 top-1/2 -translate-y-1/2 peer-focus:top-4 peer-not-placeholder-shown:top-4'
              )}
            >
              {label}
            </span>
          )}
        </label>
        {!!error && <div className="text-sm text-red-500 mt-1">{error}</div>}
      </div>
    );
  }
);

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  error: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
  bordered: PropTypes.bool,
};

export default Select;
