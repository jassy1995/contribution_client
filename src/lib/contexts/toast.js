import { createContext, useContext } from 'react';

export const ToastContext = createContext({
  success: (_message, _timeout) => {},
  error: (_message, _timeout) => {},
  warning: (_message, _timeout) => {},
  info: (_message, _timeout) => {},
  default: (_message, _timeout) => {},
});

export const useToast = () => useContext(ToastContext);
