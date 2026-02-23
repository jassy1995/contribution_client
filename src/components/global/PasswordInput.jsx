import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TbEye, TbEyeOff } from 'react-icons/tb';

const PasswordInput = forwardRef(({ id, label, error, disabled, bordered = false, ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible((v) => !v);

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
        <input
          type={visible ? 'text' : 'password'}
          id={id}
          {...props}
          ref={ref}
          placeholder=" "
          className="mt-2 pb-2 w-full bg-transparent peer"
        />
        {!!label && (
          <span
            className={classNames(
              'text-sm inline-flex opacity-80 transition-all absolute px-5 left-0 top-1/2 -translate-y-1/2 peer-focus:top-4 peer-not-placeholder-shown:top-4'
            )}
          >
            {label} {props.value}
          </span>
        )}
        <button
          onClick={toggleVisible}
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-full bg-gray-900 bg-opacity-0 hover:bg-opacity-5 focus:bg-opacity-5 flex items-center justify-center"
        >
          {visible ? <TbEyeOff size="20" /> : <TbEye size="20" />}
        </button>
      </label>
      {!!error && <div className="text-sm text-red-500 mt-2">{error}</div>}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

PasswordInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  bordered: PropTypes.bool,
  value: PropTypes.any,
};

export default PasswordInput;
