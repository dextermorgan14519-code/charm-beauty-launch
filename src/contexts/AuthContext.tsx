import React, { createContext, useContext, useState, useCallback } from "react";
import data from "@/data/data.json";

interface User {
  name: string;
  email: string;
  phone?: string;
  memberSince?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, _password: string) => {
    setUser({ ...data.mockUser, email });
    return true;
  }, []);

  const signup = useCallback((name: string, email: string, _password: string) => {
    setUser({ name, email, memberSince: "February 2026" });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
