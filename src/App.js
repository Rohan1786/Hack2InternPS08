
import React from 'react';
import { useRoutes } from 'react-router-dom';

import Login from './components/auth/login';
import Register from './components/auth/register';
import Header from './components/header';
// import Home from './components/home';
import { AuthProvider } from './contexts/authContext';
import Example from './components/Example';
import Dashboard from './components/Dashboard';


function App() {
  const routesArray = [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Example />,
    },
    // Add a fallback route for unmatched paths
    {
      path: "*",
      element: <Login />,
    },
  ];

  // Use the `useRoutes` hook to create route elements
  const routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <Header /> {/* Ensure Header is always visible */}
      {/* <div className="w-full h-screen flex flex-col"> */}
        {routesElement}

        {/* <Example/> */}
      {/* </div> */}

    </AuthProvider>
  );
}

export default App;

// import React from 'react'
// import Example from './components/Example'

// const App = () => {
//   return (
//     <div>
//       <Example/>
//     </div>
//   )
// }

// export default App