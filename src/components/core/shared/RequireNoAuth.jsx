import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../lib/hooks/use-auth.jsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../global/Loader.jsx';

const RequireNoAuth = ({ children }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { authenticated, resolved, user } = useAuth();

  useEffect(() => {
    if (resolved && authenticated && user) {
      if (user) {
        const redirect = params.get('from') ?? '/';
        if (redirect?.startsWith('http')) {
          window.location.href = redirect;
        } else {
          navigate(redirect, { replace: true });
        }
      }
      else navigate('/login');
    }
  }, [resolved, authenticated, user, navigate, params]);

  if (resolved && !authenticated) {
    return children;
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  );
};

RequireNoAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireNoAuth;
