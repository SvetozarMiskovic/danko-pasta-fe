import React, { createContext, useEffect, useState } from 'react';
import { useToast } from './ToastProvider';
import env from '../env';

type RegisterUserParams = LoginUserParams & { name: string };
interface AuthContextType {
  isAuthenticated: boolean;
  login: ({ email, password }: LoginUserParams) => Promise<LoginResponse>;
  logout: () => void;
  register: ({
    email,
    password,
    name,
  }: RegisterUserParams) => Promise<RegisterResponse>;
  forgotPassword: (email: string) => void;
  resetPassword: (email: string, newPassword: string) => void;
  user: User | null;
  isLoading: boolean;
}

interface LoginUserParams {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}
interface LoginResponse {
  message: string;
  success: boolean;
  id: string;
  email: string;
  name: string;
}
interface RegisterResponse {
  message: string;
  id: string;
  success: boolean;
}

type AuthResponse = {
  message: string;
  success: boolean;
  [key: string]: unknown;
};
const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { addToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const refresh = async () => {
      const isDev = env.VITE_NODE_ENV === 'development';
      console.log(isDev, env.VITE_DEV_SERVER, env.VITE_PROD_SERVER);

      try {
        const response = await fetch(
          isDev
            ? env.VITE_DEV_SERVER
            : `${env.VITE_PROD_SERVER}/api/auth/refresh`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            credentials: 'include',
          }
        );

        const data = await response.json();

        if (response.ok) {
          setIsAuthenticated(true);
          setUser({ name: data.name, email: data.email, id: data.id });
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
    refresh();
  }, []);
  async function login({
    email,
    password,
  }: LoginUserParams): Promise<LoginResponse> {
    const isDev = env.VITE_NODE_ENV === 'development';
    const response = await fetch(
      isDev ? env.VITE_DEV_SERVER : `${env.VITE_PROD_SERVER}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      }
    );
    if (!response.ok) {
      const data = (await response.json()) as AuthResponse;
      addToast(data.message, 'error');
      throw new Error('Failed to login');
    }

    const data = (await response.json()) as LoginResponse;
    addToast(data.message, 'success');

    setIsAuthenticated(true);
    setUser({ name: data.name, email: data.email, id: data.id });
    return data;
  }

  const logout = async () => {
    const isDev = env.VITE_NODE_ENV === 'development';
    try {
      const response = await fetch(
        isDev ? env.VITE_DEV_SERVER : `${env.VITE_PROD_SERVER}/api/auth/logout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      const data = await response.json();
      if (response.ok) {
        addToast(data.message, 'success');
        setIsAuthenticated(false);
        setUser(null);
      } else {
        addToast(data.message, 'error');
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      throw err;
    }
  };

  async function register({
    email,
    password,
    name,
  }: RegisterUserParams): Promise<RegisterResponse> {
    const isDev = env.VITE_NODE_ENV === 'development';
    const response = await fetch(
      isDev ? env.VITE_DEV_SERVER : `${env.VITE_PROD_SERVER}/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    if (!response.ok) {
      const data = (await response.json()) as AuthResponse;
      addToast(data.message, 'error');
      throw new Error('Failed to register');
    }

    const data = await response.json();
    addToast(data.message, 'success');

    return data as RegisterResponse;
  }

  const forgotPassword = (email: string) => {
    console.log('Forgot password for:', email);
  };
  const resetPassword = (email: string, newPassword: string) => {
    console.log('Resetting password for:', email, 'to', newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        register,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
