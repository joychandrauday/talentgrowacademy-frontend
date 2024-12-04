import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create a new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //log in an existing user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //manage the user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Update state with the signed-in user
      } else {
        setUser(null); // Clear user state when signed out
      }
    });
    setLoading(false);
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  //log out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  //pass the information through context api
  const AuthInfo = {
    createUser,
    signInUser,
    user,
    loading,
    logOut,

  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.node,
};
