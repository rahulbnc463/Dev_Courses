import React, { useState, useEffect } from "react";
import { createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../src/config/Firebase.init";
import axios from "axios";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth(app);

  // Sign Up Functionality start from here
  const signUp = async (email, password) => {
    try {
      setLoader(true);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  //Sign  In functionality starts from here
  const logIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  //logout functionality start from here
  const logOut = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  // Update Profile functionality start from here
  const updateUser = async (name, image) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
      setUser(auth.currentUser);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  //Google Login functionality start from here
  const provider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      setLoader(true);
      return await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  // ovserver for user
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        axios
          .post("https://dev-courses-rahul-server.onrender.com/api/set-token", {
            email: user.email,
            name: user.displayName,
          })
          .then((data) => {
            if (data.data.token) {
              localStorage.setItem("token", data.data.token);
              setLoader(false);
            }
          })
          .catch((error) => {
            console.error("Error setting token:", error);
            setLoader(false);
          });
      } else {
        localStorage.removeItem("token");
        setLoader(false);
      }
    });
    return () => unSubscribe();
  }, []);

  const contextvale = {
    user,
    signUp,
    logIn,
    logOut,
    updateUser,
    googleLogin,
    error,
    setError,
    loader,
    setLoader,
  };
  return (
    <AuthContext.Provider value={contextvale}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
