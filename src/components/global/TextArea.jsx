import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TextArea = forwardRef(({ label, id, error, disabled, bordered = false, ...props }, ref) => {
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
        <textarea
          id={id}
          ref={ref}
          className="mt-2 pb-2 w-full bg-transparent peer leading-tight"
          placeholder=" "
          rows="2"
          {...props}
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
      </label>
      {!!error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  bordered: PropTypes.bool,
  value: PropTypes.any,
};

export default TextArea;
