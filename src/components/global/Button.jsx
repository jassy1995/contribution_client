import React, { forwardRef } from 'react';
import Loader from './Loader.jsx';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils.js';

const classes = {
  red: {
    filled: 'bg-red-600 hover:bg-red-700 text-white focus:ring-4 focus:ring-red-600 focus:ring-opacity-20',
    outlined: `border border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-600 focus:ring-opacity-20`,
    subtle: 'bg-red-600 bg-opacity-10 text-red-600 hover:bg-opacity-20',
    text: 'bg-red-600 bg-opacity-0 text-red-600 hover:bg-opacity-10',
    loader: {
      filled: 'bg-white',
      outlined: 'bg-red-600',
      text: 'bg-red-600',
      subtle: 'bg-red-600',
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
      subtle: 'bg-green-600',
    },
  },
  primary: {
    filled: 'bg-blue-800 hover:bg-blue-900 text-white focus:ring-4 focus:ring-blue-600 focus:ring-opacity-20',
    outlined: `border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-600 focus:ring-opacity-20`,
    subtle: 'bg-blue-600 bg-opacity-10 text-blue-600 hover:bg-opacity-20',
    text: 'bg-blue-600 bg-opacity-0 text-blue-600 hover:bg-opacity-10',
    loader: {
      filled: 'bg-white',
      outlined: 'bg-blue-600',
      text: 'bg-blue-600',
      subtle: 'bg-blue-600',
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
      subtle: 'bg-orange-500',
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
      subtle: 'bg-slate-100',
    },
  },
  black: {
    filled: 'bg-gray-800 hover:bg-gray-900 text-white focus:ring-4 focus:ring-gray-200',
    outlined: `border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200`,
    subtle: 'bg-gray-600 bg-opacity-10 text-gray-800 hover:bg-opacity-20',
    text: 'bg-gray-600 bg-opacity-0 text-gray-800 hover:bg-opacity-10',
    loader: {
      filled: 'bg-white',
      outlined: 'bg-gray-600',
      text: 'bg-gray-600',
      subtle: 'bg-gray-600',
    },
  },
};

const Button = forwardRef(
  (
    {
      variant = 'filled',
      color = 'primary',
      size = 'md',
      type = 'button',
      disabled = false,
      loading = false,
      rightIcon = null,
      leftIcon = null,
      block = false,
      onClick,
      className,
      children,
    },
    ref
  ) => {
    const _className = cn(
      {
        'px-2 py-[2px] text-[.88rem]': size === 'xs',
        'px-3 py-1 text-[.94rem]': size === 'sm',
        'px-4 py-2': size === 'md',
        'px-6 py-3': size === 'lg',
        'opacity-50 pointer-events-none cursor-not-allowed': disabled,
        'opacity-80 pointer-events-none cursor-default': loading,
        'flex w-full': block,
      },
      classes[color][variant],
      'rounded-xl transition duration-100 inline-flex items-center whitespace-nowrap',
      className
    );
    return (
      <button
        onClick={!disabled && !loading ? onClick : null}
        type={type}
        className={_className}
        disabled={disabled || loading}
        ref={ref}
      >
        {loading ? (
          <span className="mx-auto">
            <Loader size="sm" className={cn(classes[color].loader[variant])} />
          </span>
        ) : (
          <>
            {!!leftIcon && (
              <>
                <span className="mr-4">{leftIcon}</span>
                <span className="flex-1" />
              </>
            )}
            <span>{children}</span>
            {!!rightIcon && (
              <>
                <span className="flex-1" />
                <span className="ml-4">{rightIcon}</span>
              </>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(['filled', 'outlined', 'subtle', 'text']),
  color: PropTypes.oneOf(['red', 'green', 'primary', 'accent', 'white', 'black']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  rightIcon: PropTypes.node,
  leftIcon: PropTypes.node,
  block: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
