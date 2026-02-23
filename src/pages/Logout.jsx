import { useEffect } from 'react';
import { useAuth } from '../lib/hooks/use-auth.jsx';
import Loader from '../components/global/Loader.jsx';

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const ref = document.referrer;
    let from = '/';
    try {
      if (ref && new URL(ref).origin === window.location.origin) {
        from = ref;
      }
    } catch {
      void 0;
    }
    logout(from);
  }, [logout]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-center">
      <Loader />
      <p className="mt-6">Logging you out...</p>
    </div>
  );
};

export default Logout;
