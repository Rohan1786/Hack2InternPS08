import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useMediaQuery } from 'react-responsive';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Mobile detection
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile);
  }, [isMobile]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ 
        ...user,
        // Add mobile-friendly user properties
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        photoURL: user.photoURL || (isMobileDevice ? '/default-mobile-avatar.png' : '/default-avatar.png')
      });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === "google.com"
      );
      setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
      
      // Mobile-specific initialization
      if (isMobileDevice) {
        console.log("Mobile user detected");
        // You can add mobile-specific user initialization here
      }
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  // Mobile-friendly auth functions
  const mobileSignOut = async () => {
    if (isMobileDevice) {
      // Add any mobile-specific signout logic
      console.log("Mobile signout initiated");
    }
    return auth.signOut();
  };

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
    isMobileDevice,
    signOut: mobileSignOut, // Mobile-friendly signout
    // Add other mobile-friendly methods as needed
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && (
        <div className={`app-container ${isMobileDevice ? 'mobile' : 'desktop'}`}>
          {children}
        </div>
      )}
    </AuthContext.Provider>
  );
}