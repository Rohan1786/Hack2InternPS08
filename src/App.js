// import { Auth0Provider } from '@auth0/auth0-react';
// import AuthButton from './components/AuthButton';

// // function MyApp({ Component, pageProps }) {
//   // return (
//     // <Auth0Provider
//     //   domain="dev-8gblfki1kwedo2gv.us.auth0.com"
      
//     //   clientId="yIEVkRFBPSbSVlPO0s4Gec3BNIfWlxQ3"
//     //   clientSectret="lzp1_xjGrLEW-LrC5En6zlDogleIb1iQT2flfUpGbRKo1myZ1Y4HpGhrXF1K-Oa6"
//     //   authorizationParams={{ redirect_uri: window.location.origin }}
//     // >
//     //   {/* <Component {...pageProps} /> */}
//     //   <AuthButton/>
//     // </Auth0Provider>
//     const App = () => {
//       return (
//         <Auth0Provider
//           domain="dev-8gblfki1kwedo2gv.us.auth0.com"
//           clientId="yIEVkRFBPSbSVlPO0s4Gec3BNIfWlxQ3"
//           authorizationParams={{
//             redirect_uri: window.location.origin,
//           }}
//         >
//           {/* Your App's main component */}
//           {/* <MainComponent /> */}
//         </Auth0Provider>
//       );
//     };
    
//     export default App;
    
// //   );
// // }

// // export default MyApp;
// import React from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainComponent from "./components/MainComponent";
// import AuthButton from "./components/AuthButton";
// import Dashboard from "./components/Dashboard/DashBoard";
// import Wizard from "./components/Wizard";
// import PieChart from "./components/PieChart";

// const App = () => {
//   return (
//     <Auth0Provider
//       domain="dev-8gblfki1kwedo2gv.us.auth0.com"
//       clientId="yIEVkRFBPSbSVlPO0s4Gec3BNIfWlxQ3"
//       authorizationParams={{
//         redirect_uri: window.location.origin,
//       }}
//     >
//       <Router>
//         <Routes>
//           {/* Define routes here */}
//           <Route path="/mainComponent" element={<MainComponent />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/wizard" element={<Wizard/>} />
//           <Route path="/PieChart" element={<PieChart/>} />
//           <Route path="/auth" element={<AuthButton />} />
//         </Routes>
//       </Router>
//     </Auth0Provider>
//   );
// };

// export default App;

import React from 'react'
import PieChartGenerator from './components/PieChartGenerator'
// import Example from './components/Example'

const App = () => {
  return (
    <div>
<PieChartGenerator/>
      {/* <Example/> */}
    </div>
  )
}

export default App
//just for clerk provider



// import React from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainComponent from "./components/MainComponent";
// import AuthButton from "./components/AuthButton";

// import Wizard from "./components/Wizard";
// import PieChart from "./components/PieChart";
// import Dashboard from "./components/Dashboard/DashBoard";

// const App = () => {
//   return (
//     <Auth0Provider
//       domain="dev-8gblfki1kwedo2gv.us.auth0.com"
//       clientId="yIEVkRFBPSbSVlPO0s4Gec3BNIfWlxQ3"
//       authorizationParams={{
//         redirect_uri: window.location.origin,
//       }}
//     >
//       <Router>
//         <Routes>
//           {/* Define routes */}
//           <Route path="/mainComponent" element={<MainComponent />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/" element={<Wizard/>} />
//           <Route path="/wizard" element={<Wizard />} />
//           <Route
//             path="/piechart"
//             element={
//               <PieChart
//                 data={{
//                   labels: ["Democratic Party", "Republican Party"],
//                   datasets: [
//                     {
//                       data: [52, 48],
//                       backgroundColor: ["#3498db", "#e74c3c"],
//                     },
//                   ],
//                 }}
//               />
//             }
//           />
//           <Route path="/auth" element={<AuthButton />} />
//         </Routes>
//       </Router>
//     </Auth0Provider>
//   );
// };

// export default App;



// import React from "react";
// import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
// import SignInPage from "./components/SignInPage";


// const App = () => {
//   const { user } = useUser();

//   return (
//     <div>
//       {/* If user is signed in, show user info */}
//       <SignedIn>
//         <div className="h-screen flex flex-col items-center justify-center">
//           <h1 className="text-2xl font-bold mb-4">Welcome, {user?.fullName}!</h1>
//           <img
//             src={user?.profileImageUrl}
//             alt="User Avatar"
//             className="w-16 h-16 rounded-full mb-4"
//           />
//           <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
//           <UserButton afterSignOutUrl="/" />
//         </div>
//       </SignedIn>

//       {/* If user is signed out, show sign-in page */}
//       <SignedOut>
//         <SignInPage />
//       </SignedOut>
//     </div>
//   );
// };

// export default App;


// 