import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loader from './Loader.jsx';

const classes = {
  primary: {
    filled: 'bg-blue-800 hover:bg-blue-900 text-white focus:ring-4 focus:ring-blue-600 focus:ring-opacity-20',
    outlined: `border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-600 focus:ring-opacity-20`,
    subtle: 'bg-blue-600 bg-opacity-10 text-blue-600 hover:bg-opacity-20',
    text: 'bg-blue-600 bg-opacity-0 text-blue-600 hover:bg-opacity-10',
    loader: {
      filled: 'bg-white',
      outlined: 'bg-blue-600',
      text: 'bg-blue-600',
    },
  },
  accent: {
    filled: 'bg-orange-300 hover:bg-orange-400 text-black focus:ring-4 focus:ring-orange-600 focus:ring-opacity-20',
    outlined: `border border-orange-600 text-orange-600 hover:bg-orange-500 hover:text-white focus:ring-4 focus:ring-orange-600 focus:ring-opacity-20`,
    subtle: 'bg-orange-500 bg-opacity-10 text-orange-600 hover:bg-opacity-20',
    text: 'bg-orange-500 bg-opacity-0 text-orange-600 hover:bg-opacity-10',
    loader: {
      filled: 'bg-white',
      outlined: 'bg-orange-500',
      text: 'bg-orange-500',
    },
  },
  white: {
    filled: 'bg-slate-100 hover:bg-slate-200 text-gray-800 focus:ring-4 focus:ring-slate-100 focus:ring-opacity-20',
    outlined: `border border-slate-100 text-slate-100 hover:bg-slate-200 hover:text-gray-800 focus:ring-4 focus:ring-slate-100 focus:ring-opacity-20`,
    subtle: 'bg-slate-100 bg-opacity-10 text-slate-100 hover:bg-opacity-20',
    text: 'bg-slate-100 bg-opacity-0 text-slate-100 hover:bg-opacity-10',
    loader: {
      filled: 'bg-gray-800',
      outlined: 'bg-slate-100',
      text: 'bg-slate-100',
    },
  },
  black: {
    filled: 'bg-gray-800 hover:bg-gray-900 text-white focus:ring-4 focus:ring-gray-200',
    outlined: 'border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200',
    subtle: 'bg-gray-600/10 text-gray-800 hover:bg-gray-600/20',
    text: 'bg-gray-600 bg-opacity-0 text-gray-800 hover:bg-opacity-10',
    loader: {
      filled: 'bg-white',
      outlined: 'bg-gray-600',
      text: 'bg-gray-600',
    },
  },
  red: {
    filled: 'bg-red-600 hover:bg-red-700 text-white focus:ring-4 focus:ring-red-600 focus:ring-opacity-20',
    outlined: `border border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-600 focus:ring-opacity-20`,
    subtle: 'bg-red-600 bg-opacity-10 text-red-600 hover:bg-opacity-20',
    text: 'bg-red-600 bg-opacity-0 text-red-600 hover:bg-opacity-10',
    loader: {
      filled: 'bg-white',
      outlined: 'bg-red-600',
      text: 'bg-red-600',
    },
  },
  green: {
    filled: 'bg-green-600 hover:bg-green-700 text-white focus:ring-4 focus:ring-green-600 focus:ring-opacity-20',
    outlined: `border border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-4 focus:ring-green-600 focus:ring-opacity-20`,
    subtle: 'bg-green-600 bg-opacity-10 text-green-600 hover:bg-opacity-20',
    text: 'bg-green-600 bg-opacity-0 text-green-600 hover:bg-opacity-10',
    loader: {
      filled: 'bg-white',
      outlined: 'bg-green-600',
      text: 'bg-green-600',
    },
  },
};

const IconButton = ({
  variant = 'filled',
  color = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  icon = null,
  rounded = false,
  onClick,
  className,
}) => {
  const _className = classNames(
    {
      'w-6 h-6 text-[.88rem]': size === 'xs',
      'w-8 h-8 text-[.94rem]': size === 'sm',
      'w-10 h-10': size === 'md',
      'w-12 h-12': size === 'lg',
      'opacity-50 pointer-events-none cursor-not-allowed': disabled,
      'opacity-80 pointer-events-none cursor-default': loading,
      'rounded-full!': rounded,
    },
    classes[color][variant],
    'font-medium rounded-xl transition duration-100 inline-flex justify-center items-center whitespace-nowrap cursor-pointer',
    className
  );
  return (
    <button
      onClick={!disabled && !loading ? onClick : null}
      type={type}
      className={_className}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="mx-auto">
          <Loader size="sm" className={classNames(classes[color].loader[variant])} />
        </span>
      ) : (
        <>{!!icon && <span>{icon}</span>}</>
      )}
    </button>
  );
};

IconButton.propTypes = {
  variant: PropTypes.oneOf(['filled', 'outlined', 'subtle', 'text']),
  color: PropTypes.oneOf(['primary', 'accent', 'white', 'black', 'green', 'red']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  rounded: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

export default IconButton;
