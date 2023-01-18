import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export const PublicRoutes = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.logged ? <Navigate to="/chat" /> : children;
};
