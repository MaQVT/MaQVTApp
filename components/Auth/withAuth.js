import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isAuthenticated } from '../../utils/auth';

export const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Redirect the user to the login page if they are not authenticated
      console.log(router.route)
      if (!isAuthenticated() && router.route != "/auth/reset_password") {
        router.push('/auth/login');
      }
    }, []);

    // Render the wrapped component with the props
    return <WrappedComponent {...props} />;
  };

  // Set the display name of the HOC for easier debugging
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};
