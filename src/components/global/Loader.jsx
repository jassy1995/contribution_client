import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Loader = ({ text, size = 'md', className = 'bg-blue-600' }) => {
  return (
    <>
      <div
        className={classNames(
          { 'small h-4': size === 'sm' },
          'loader-wrap text-center relative inline-flex flex-col items-center'
        )}
      >
        <div className={classNames('sp sp-3balls', className)} />
        {!!text && <div className="mt-8 opacity-70">{text}</div>}
      </div>
      <style>{`
        .loader-wrap {
          padding: 0 calc(16px * 2);
        }

        .sp-3balls,
        .sp-3balls:before,
        .sp-3balls:after {
          border-radius: 50%;
          width: 8px;
          height: 8px;
          transform-origin: center center;
          display: inline-block;
        }

        .sp-3balls {
          position: relative;
          opacity: 1;
          -webkit-animation: spScaleAlpha 1s infinite linear;
          animation: spScaleAlpha 1s infinite linear;
        }

        .sp-3balls:before,
        .sp-3balls:after {
          background-color: inherit;
          content: '';
          position: absolute;
          opacity: 0.25;
        }

        .sp-3balls:before {
          left: 15px;
          top: 0;
          -webkit-animation: spScaleAlphaBefore 1s infinite linear;
          animation: spScaleAlphaBefore 1s infinite linear;
        }

        .sp-3balls:after {
          left: -15px;
          top: 0;
          -webkit-animation: spScaleAlphaAfter 1s infinite linear;
          animation: spScaleAlphaAfter 1s infinite linear;
        }

        .loader-wrap.small {
          padding: 0 calc(9px * 2);
        }

        .loader-wrap.small .sp-3balls,
        .loader-wrap.small .sp-3balls:before,
        .loader-wrap.small .sp-3balls:after {
          width: 6px;
          height: 6px;
        }

        .loader-wrap.small .sp-3balls:before {
          left: 10px;
        }

        .loader-wrap.small .sp-3balls:after {
          left: -10px;
        }

        @-webkit-keyframes spScaleAlpha {
          0% {
            opacity: 1;
          }
          33% {
            opacity: 0.25;
          }
          66% {
            opacity: 0.25;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes spScaleAlpha {
          0% {
            opacity: 1;
          }
          33% {
            opacity: 0.25;
          }
          66% {
            opacity: 0.25;
          }
          100% {
            opacity: 1;
          }
        }

        @-webkit-keyframes spScaleAlphaBefore {
          0% {
            opacity: 0.25;
          }
          33% {
            opacity: 1;
          }
          66% {
            opacity: 0.25;
          }
        }

        @keyframes spScaleAlphaBefore {
          0% {
            opacity: 0.25;
          }
          33% {
            opacity: 1;
          }
          66% {
            opacity: 0.25;
          }
        }

        @-webkit-keyframes spScaleAlphaAfter {
          33% {
            opacity: 0.25;
          }
          66% {
            opacity: 1;
          }
          100% {
            opacity: 0.25;
          }
        }

        @keyframes spScaleAlphaAfter {
          33% {
            opacity: 0.25;
          }
          66% {
            opacity: 1;
          }
          100% {
            opacity: 0.25;
          }
        }
      `}</style>
    </>
  );
};

Loader.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  className: PropTypes.string,
};

export default Loader;
