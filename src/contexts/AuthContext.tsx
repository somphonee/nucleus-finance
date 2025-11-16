import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

export type UserRole = 'admin' | 'user' | 'userprovince';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  province?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login({ username, password });
      
      if (response.success && response.data.access_token) {
        // Create user object from successful login
        const userData: User = {
          id: '1', // You'll get this from a separate user info endpoint
          email: username,
          name: username,
          role: 'admin', // You'll get this from a separate user info endpoint
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = authAPI.getToken();
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: authAPI.isAuthenticated()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};