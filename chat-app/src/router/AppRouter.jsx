import { BrowserRouter, createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

import '../css/login-register.css';
import { LayoutLogin } from '../pages/LayoutLogin';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { AuthRouter } from './AuthRouter';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
    verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
    return <h1>Espere por favor</h1>;
  }
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/auth/*"
            element={
              <PublicRoutes>
                <AuthRouter />
              </PublicRoutes>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoutes>
                <ChatPage />
              </PrivateRoutes>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
