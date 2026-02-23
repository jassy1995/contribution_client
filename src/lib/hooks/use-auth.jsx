import React from 'react';
import PropTypes from 'prop-types';
import { authContext, useProvideAuth, useAuth as useAuthHook } from '../contexts/auth';

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = useAuthHook;
