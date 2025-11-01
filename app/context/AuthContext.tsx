'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    loginEmail: string,
    loginPassword: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    loginEmail: string,
    loginPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user exists in localStorage (demo mode)
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const foundUser = users.find(
        (u: any) => u.email === loginEmail && u.password === loginPassword
      );

      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const existingUser = users.find((u: any) => u.email === userData.email);

      if (existingUser) {
        return { success: false, error: 'Email already registered' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const userInfo: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      };

      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading,
      }}
    >
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
