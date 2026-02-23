import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

import { ToastContext } from '../contexts/toast';
import { generateUEID } from '../utils';
import Toast from '../../components/global/Toast';

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const open = ({ message, type = 'success', timeout = 5000 }) => {
    setToasts((prev) => [{ id: generateUEID(), message, type, timeout }, ...prev]);
  };

  const close = (id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  const success = (message, timeout = 5000) => {
    open({ message, type: 'success', timeout });
  };

  const error = (message, timeout = 5000) => {
    open({ message, type: 'error', timeout });
  };

  const warning = (message, timeout = 5000) => {
    open({ message, type: 'warning', timeout });
  };

  const info = (message, timeout = 5000) => {
    open({ message, type: 'info', timeout });
  };

  const _default = (message, timeout = 5000) => {
    open({ message, type: 'default', timeout });
  };

  const value = { success, error, warning, info, default: _default };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="p-4 md:p-8 space-y-3 w-max max-w-md fixed bottom-0 left-1/2 transform -translate-x-1/2 z-999">
          <AnimatePresence>
            {toasts.reverse().map((toast) => (
              <Toast key={toast.id} onClose={() => close(toast.id)} toast={toast} />
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
