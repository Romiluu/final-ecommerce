import { createContext, useContext, useState, useEffect } from "react";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, googleProvider, signInWithPopup } from "../firebase/FireBaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  return (
    <AuthContext.Provider value={{ user, registerUser, login, logout, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
