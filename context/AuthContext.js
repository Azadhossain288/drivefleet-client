'use client';
import { createContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  updateProfile 
} from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // ১. অ্যাকাউন্ট তৈরির সাথে সাথে নাম ও ছবি আপডেট করার ব্যবস্থা (ফিক্সড)
  const createUser = async (email, password, name, photo) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // অ্যাকাউন্ট তৈরি সফল হলে সাথে সাথে নাম ও ছবি প্রোফাইলে সেভ হবে
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photo
        });
      }
      
      return userCredential;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout cookie clear failed", err);
    }
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser?.email) {
        try {
          await axios.post('http://localhost:5000/api/auth/jwt', { email: currentUser.email }, { withCredentials: true });
        } catch (err) {
          console.error("JWT token generation failed", err);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, createUser, loginUser, loginWithGoogle, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};