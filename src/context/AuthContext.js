// AuthContext.js
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
      // Store the user data in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
    });

    return () => {
      unsubscribe();

      // Clear the user data from localStorage when the user logs out
      // localStorage.removeItem('currentUser');
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
