import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User } from './auth-service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: (rememberMe: boolean) => Promise<{ success: boolean; message: string; requiresEmail?: boolean }>;
  completeGoogleLogin: (email: string, rememberMe: boolean) => { success: boolean; message: string };
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string, rememberMe: boolean) => {
    const result = authService.login(username, password, rememberMe);
    
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
    }

    return result;
  };

  const loginWithGoogle = async (rememberMe: boolean) => {
    const result = await authService.googleLogin(rememberMe);
    
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
    }

    return result;
  };

  const completeGoogleLogin = (email: string, rememberMe: boolean) => {
    const result = authService.completeGoogleLogin(email, rememberMe);
    
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
    }

    return result;
  };

  const signup = async (username: string, email: string, password: string) => {
    return authService.signUp(username, email, password);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, loginWithGoogle, completeGoogleLogin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
