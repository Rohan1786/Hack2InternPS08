import React from 'react';
import { useRoutes, Outlet, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Header from './components/header';
import { AuthProvider, useAuth } from './contexts/authContext';
import Example from './components/Example';
import Dashboard from './components/Dashboard';

// Layout component that includes the Header for authenticated routes
const AuthenticatedLayout = () => {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

// Layout for auth pages (login/register) without header
const AuthLayout = () => {
  const { userLoggedIn } = useAuth();

  if (userLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Outlet />
    </div>
  );
};

function App() {
  const routesArray = [
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      element: <AuthenticatedLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/home",
          element: <Example />,
        },
      ],
    },
    // Fallback route
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];

  const routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      {routesElement}
    </AuthProvider>
  );
}

export default App;