import { useState, useEffect, useContext, createContext } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const AuthContext = createContext<{ currentUser: User | null }>({ currentUser: null });

export function useAuth() {
  return useContext(AuthContext);
}
