import { FunctionComponent } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  path: string;
  element: JSX.Element;
  isLoggedIn: boolean;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  path,
  element,
  isLoggedIn,
}) => {
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/" />;
  }

  return (
    <Route
      path={path}
      element={element}
      key={location.pathname}
    />
  );
};

export default ProtectedRoute;
