import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("Hello --> " + user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = {
    currentUser: currentUser || null,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
