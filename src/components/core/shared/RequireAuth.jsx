import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/use-auth.jsx';
import Loader from '../../global/Loader.jsx';
import PropTypes from 'prop-types';
import Button from '../../global/Button.jsx';
import { TbBan, TbNetworkOff } from 'react-icons/tb';

const RequireAuth = ({ children }) => {
  const [params] = useSearchParams();
  const { authenticated, resolved, user, error } = useAuth();

  useEffect(() => {
    if (resolved && !authenticated) {
      window.location.replace(`/login?from=${window.location.href}`);
    }
  }, [resolved, authenticated, user, params]);

  if (error) {
    if (error?.response?.status >= 400 && error?.response?.status < 500) {
      window.location.replace(`/login?from=${window.location.href}`);
    } else {
      return (
        <div className="h-screen w-full flex flex-col justify-center items-center text-center">
          <TbNetworkOff className="text-6xl text-red-500 opacity-50" />
          <p className="max-w-[300px] mt-10">
            We&apos;re having trouble loading this page, please check your internet connection and try again
          </p>
          <Button variant="outlined" color="black" onClick={() => window.location.reload()} className="mt-8">
            Reload
          </Button>
        </div>
      );
    }
  }

  if (resolved && user && !['admin'].includes(user.role)) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center text-center">
        <TbBan className="text-6xl text-slate-500 opacity-50" />
        <p className="max-w-[300px] mt-10">
          You are not authorized to access this page, please contact support if you think this is an error.
        </p>
        <Link to="/">
          <Button variant="outlined" color="black" className="mt-8">
            Back to dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (resolved && authenticated) return children;

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-center">
      <Loader />
      <p className="mt-6">Just a moment..</p>
    </div>
  );
};

RequireAuth.propTypes = {
  children: PropTypes.any,
};

export default RequireAuth;
