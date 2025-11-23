import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

export type UserRole = 'admin' | 'user' | 'userprovince' | 'superAdmin';

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
  register: (username: string, email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loginBypass: () => void;
  loginBypassProvince: () => void;
  loginBypassSuperAdmin: () => void;
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

  const register = async (
    username: string,
    email: string,
    password: string,
    fullName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authAPI.register({
        username,
        email,
        password,
        full_name: fullName
      });

      if (response.success) {
        return { success: true };
      }

      return { success: false, error: response.message || 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  };

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

  const loginBypass = () => {
    const mockUser: User = {
      id: 'bypass-user',
      email: 'demo@daec.com',
      name: 'Demo User',
      role: 'admin',
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authToken', 'bypass-token');
  };

  const loginBypassProvince = () => {
    const mockUser: User = {
      id: 'bypass-province-user',
      email: 'province@daec.com',
      name: 'Demo Province User',
      role: 'userprovince',
      province: 'Demo Province',
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authToken', 'bypass-province-token');
  };

  const loginBypassSuperAdmin = () => {
    const mockUser: User = {
      id: 'bypass-superadmin-user',
      email: 'superadmin@daec.com',
      name: 'Demo SuperAdmin User',
      role: 'superAdmin',
      province: 'All Provinces',
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authToken', 'bypass-superadmin-token');
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
    register,
    logout,
    loginBypass,
    loginBypassProvince,
    loginBypassSuperAdmin,
    isAuthenticated: authAPI.isAuthenticated()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};