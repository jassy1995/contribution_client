import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Input = forwardRef(
  (
    { label, rightIcon, id, error, disabled, bordered = false, inputClassName = '', labelClassName = '', ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        <label
          className={classNames(
            'pt-5 px-5 rounded-xl w-full transition duration-300 focus-within:ring-2 ring-offset-[3px] ring-blue-800 ring-opacity-60 relative',
            { 'opacity-60 pointer-events-none': disabled },
            { 'bg-transparent border border-zinc-300': bordered },
            { 'bg-slate-200': !bordered }
          )}
        >
          <input id={id} {...props} ref={ref} className={`py-2 w-full  peer ${inputClassName}`} placeholder = '' />
          {!!label && (
            <span
              className={classNames(
                `text-sm inline-flex opacity-80 transition-all absolute px-5 left-0 top-1/2 -translate-y-1/2 peer-focus:top-4 peer-not-placeholder-shown:top-4 ${labelClassName}`
              )}
            >
              {label} {props.value}
            </span>
          )}
          {!!rightIcon && (
            <div className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-md flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </label>
        {!!error && <div className="text-sm text-red-500 mt-2">{error}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  rightIcon: PropTypes.element,
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  bordered: PropTypes.bool,
  value: PropTypes.any,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default Input;
