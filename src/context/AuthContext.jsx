import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

// 1. Create the context
const AuthContext = createContext();

// 2. Provider: keeps track of who is logged in
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until Firebase tells us

  useEffect(() => {
    // Firebase calls this on page load, on login and on logout.
    // It also remembers the login after a refresh, so no localStorage needed.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // null when logged out
      setLoading(false);
    });

    return unsubscribe; // cleanup: stop listening when the app closes
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook: components call useAuth() to get the user
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
