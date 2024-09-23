import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import ApiClient from '../services/APIClient';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (userData: {
    national_id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resetPasswordWithNewPassword: (
    email: string,
    otp: string,
    newPassword: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      const email = localStorage.getItem('email');

      if (token && email) {
        try {
          const user = await ApiClient.fetchUser(email);
          setUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('email');
          localStorage.removeItem('national_id');
          localStorage.removeItem('first_name');
          localStorage.removeItem('last_name');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const resetPassword = async (email: string) => {
    try {
      await ApiClient.requestReset(email);
    } catch (error) {
      console.error('Error sending reset password email', error);
      throw error;
    }
  };

  const resetPasswordWithNewPassword = async (
    email: string,
    otp: string,
    newPassword: string
  ) => {
    try {
      await ApiClient.updatePassword(email, otp, newPassword);
    } catch (error) {
      console.error('Error resetting password', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await ApiClient.login(email, password);
      const user = await ApiClient.fetchUser(email);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const signOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    localStorage.removeItem('national_id');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    setUser(null);
    setIsAuthenticated(false);
  };

  const signUp = async (userData: {
    national_id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      await ApiClient.register(userData);
      const user = await ApiClient.fetchUser(userData.email);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signOut,
        signUp,
        resetPassword,
        resetPasswordWithNewPassword,
      }}
    >
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
