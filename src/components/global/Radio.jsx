import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Radio = forwardRef(({ id, disabled, children, ...props }, ref) => {
  return (
    <div className="flex items-center">
      <input
        className={classNames('w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300', {
          'opacity-60 pointer-events-none': disabled,
        })}
        id={id}
        type="radio"
        {...props}
        ref={ref}
      />
      {!!children && (
        <label htmlFor={id} className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {children}
        </label>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Radio;
