'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/navigation'; // Will be needed for redirects

// Define the shape of the user object (can be expanded later)
// Ensure this matches the structure returned by your backend's /api/users/me or login response
interface User {
  _id: string; // Changed from id to _id to match backend
  email: string;
  name?: string;
  role?: string; 
  // Add other user-specific fields like roles, preferences, etc.
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean; 
  login: (emailInput: string, passwordInput: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: (currentToken: string) => Promise<void>; // Added to fetch user after initial token load
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  // const router = useRouter(); 

  const fetchCurrentUser = async (currentToken: string) => {
    if (!currentToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5005/api/users/me', {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.success && data.data.user) {
        setUser(data.data.user);
      } else {
        // Token might be invalid or expired
        console.warn('Failed to fetch current user or token invalid:', data.message);
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    let storedToken: string | null = null;
    try {
      storedToken = localStorage.getItem('authToken');
    } catch (error) {
       console.error("Error accessing localStorage for authToken:", error);
    }

    if (storedToken) {
      setToken(storedToken);
      fetchCurrentUser(storedToken); // Fetch user info if token exists
    } else {
      setIsLoading(false); // No token, not loading
    }
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

      if (!response.ok || !data.success) { // Check data.success as well
        throw new Error(data.message || 'Đăng nhập thất bại.');
      }

      // Backend response structure is { success, message, code, data: { user, token, refreshToken } }
      if (data.data && data.data.token && data.data.user) {
        setToken(data.data.token);
        setUser(data.data.user); // Set user from response
        try {
          localStorage.setItem('authToken', data.data.token);
        } catch (error) {
          console.error("Error saving authToken to localStorage:", error);
        }
        // router.push('/'); 
      } else {
        throw new Error('Phản hồi đăng nhập không hợp lệ từ server.');
      }
    } catch (error: any) {
      console.error('Login error in AuthContext:', error);
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
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, fetchCurrentUser }}>
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
