import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

// LOGIN
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// LOGOUT
export const logout = () => signOut(auth);
