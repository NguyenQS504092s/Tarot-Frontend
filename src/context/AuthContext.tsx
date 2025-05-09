'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/navigation'; // Will be needed for redirects

// Define the shape of the user object (can be expanded later)
interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user-specific fields like roles, preferences, etc.
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean; // To handle initial loading of token from localStorage
  login: (emailInput: string, passwordInput: string) => Promise<void>;
  logout: () => void;
  // register?: (userData: any) => Promise<void>; // Can be added later
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // True initially while checking localStorage
  // const router = useRouter(); // For redirects

  useEffect(() => {
    // Check for token in localStorage on initial load
    try {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        // TODO: Optionally, validate token with backend or decode to get user info
        // For now, just set the token. User info can be fetched separately or on demand.
        setToken(storedToken);
        // Example: Decode token to get basic user info (if token is JWT and contains it)
        // const decodedUser = jwt_decode(storedToken); // Requires jwt-decode library
        // setUser(decodedUser as User); 
        // For simplicity, we might need a separate API call to get user details after setting token
      }
    } catch (error) {
      console.error("Error accessing localStorage for authToken:", error);
      // Ensure localStorage access doesn't break SSR or if localStorage is disabled
    }
    setIsLoading(false);
  }, []);

  const login = async (emailInput: string, passwordInput: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5005/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại.');
      }

      if (data.token) {
        setToken(data.token);
        // TODO: Set user data - either from login response or a separate /me call
        // setUser(data.user || { id: 'temp-id', email: emailInput }); // Example
        localStorage.setItem('authToken', data.token);
        // router.push('/'); // Redirect to home or dashboard
      } else {
        throw new Error('Đăng nhập thành công nhưng không nhận được token.');
      }
    } catch (error: any) {
      console.error('Login error in AuthContext:', error);
      // Re-throw the error so the calling component (LoginPage) can handle it (e.g., display setError)
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error("Error accessing localStorage for authToken removal:", error);
    }
    // router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
