import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTimeoutFn } from 'react-use';
import { TbCheck, TbExclamationCircle, TbQuestionMark, TbX } from 'react-icons/tb';

const Toast = ({ toast, onClose }) => {
  useTimeoutFn(onClose, toast.timeout);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 1 }}
      className={classNames(
        'px-4 py-3 rounded-xl flex items-start w-full',
        { 'bg-green-600 text-white': toast.type === 'success' },
        { 'bg-red-600 text-white': toast.type === 'error' },
        { 'bg-orange-600 text-white': toast.type === 'warning' },
        { 'bg-blue-600 text-white': toast.type === 'info' },
        { 'bg-white shadow text-gray-800': toast.type === 'default' }
      )}
    >
      <div className="mt-[2px] mr-3">
        {toast.type === 'success' && <TbCheck />}
        {toast.type === 'error' && <TbExclamationCircle />}
        {toast.type === 'warning' && <TbExclamationCircle />}
        {toast.type === 'info' && <TbQuestionMark />}
      </div>
      <p className="text-sm leading-6">{toast.message}</p>
      <button onClick={onClose} className="ml-auto pl-3">
        <TbX size={18} className="mt-1" />
      </button>
    </motion.div>
  );
};

Toast.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'default']).isRequired,
    timeout: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
