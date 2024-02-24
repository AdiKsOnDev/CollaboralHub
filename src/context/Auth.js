import * as React from "react";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    login(auth, email, password) {
      return new Promise((res) => {
        setAuthed(true);
        setPersistence(auth, browserLocalPersistence);

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })

        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}