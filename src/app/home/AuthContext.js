"use client"; 

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from './firebaseConfig'; // Your Firebase config

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Store user information

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Set the user object
            setIsAuthenticated(!!user); // Update isAuthenticated based on user
        });

        return () => unsubscribe(); // Clean up listener on unmount
    }, []); // Empty dependency array ensures this runs only once on mount

    const login = async () => {
      // Login logic is handled in the LoginPage component using Firebase's signInWithEmailAndPassword
      // This context is used to track the login status
    }


    const logout = async () => {
      const auth = getAuth(app);
      try {
        await auth.signOut();
        setUser(null);
        setIsAuthenticated(false);
      } catch (error) {
        console.error("Logout Error:", error);
      }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);