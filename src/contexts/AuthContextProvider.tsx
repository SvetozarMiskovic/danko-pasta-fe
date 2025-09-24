import React, { createContext, useEffect, useState } from 'react';
import { useToast } from './ToastProvider';
import { URL_CONSTANTS } from '../constants';
import type {
  AuthContextType,
  AuthResponse,
  LoginResponse,
  LoginUserParams,
  RegisterResponse,
  RegisterUserParams,
  User,
} from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { addToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await fetch(URL_CONSTANTS.REFRESH_USER(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          credentials: 'include',
        });

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
    const response = await fetch(URL_CONSTANTS.LOGIN_USER(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
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
    try {
      const response = await fetch(URL_CONSTANTS.LOGOUT_USER(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

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
    const response = await fetch(URL_CONSTANTS.REGISTER_USER(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const data = (await response.json()) as AuthResponse;
      addToast(data.message, 'error');
      throw new Error('Failed to register');
    }

    const data = await response.json();
    addToast(data.message, 'success');

    return data as RegisterResponse;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        register,
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
