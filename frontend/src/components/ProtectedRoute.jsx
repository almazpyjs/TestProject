import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ isAllowed, redirectTo = '/login', children }) {
  const location = useLocation();

  if (!isAllowed) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
