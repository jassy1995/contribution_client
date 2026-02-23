import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Message = ({ color = 'default', size = 'md', className, children }) => {
  const _className = classNames(
    'rounded-md',
    {
      'bg-slate-100 text-slate-600': color === 'default',
      'text-white bg-red-600': color === 'error',
      'text-white bg-primary-600': color === 'primary',
      'text-white bg-green-600': color === 'success',
      'text-white bg-blue-600': color === 'info',
      'px-4 py-2 text-sm': size === 'sm',
      'px-5 py-3': size === 'md',
      'px-6 py-4 text-lg': size === 'lg',
    },
    className
  );

  return <div className={_className}>{children}</div>;
};

Message.propTypes = {
  color: PropTypes.oneOf(['default', 'error', 'success', 'info', 'primary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Message;
