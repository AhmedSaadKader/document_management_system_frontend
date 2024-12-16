import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resetPasswordWithNewPassword: (
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
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          setUser(firebaseUser.uid);
          setIsAuthenticated(true);
        } else {
          alert('Please verify your email to activate your account.');
          await firebaseSignOut(auth);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      if (!firebaseUser.emailVerified) {
        await sendEmailVerification(firebaseUser);
        alert(
          'Your email is not verified. A new verification email has been sent. Please verify your email to proceed.'
        );
        throw new Error('Email not verified.');
      }

      setUser(firebaseUser);
      setIsAuthenticated(true);

      if (analytics) {
        logEvent(analytics, 'login', {
          method: 'email',
          debug_mode: process.env.REACT_APP_DEBUG_MODE,
        });
      }
    } catch (error) {
      if (analytics) {
        logEvent(analytics, 'login_error', {
          error_type: 'invalid_credentials',
          debug_mode: process.env.REACT_APP_DEBUG_MODE,
        });
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);

      if (analytics) {
        logEvent(analytics, 'logout', {
          debug_mode: process.env.REACT_APP_DEBUG_MODE,
        });
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  const signUp = async ({
    first_name,
    last_name,
    email,
    password,
  }: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<void> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (analytics)
      logEvent(analytics, 'sign_up', {
        method: 'email',
        debug_mode: process.env.REACT_APP_DEBUG_MODE,
      });
    const user = userCredential.user;
    await updateProfile(user, { displayName: `${first_name} ${last_name}` });
    await sendEmailVerification(user);
    alert(
      'Please check your email for a verification link to activate your account.'
    );
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending reset password email', error);
      throw error;
    }
  };

  const resetPasswordWithNewPassword = async (
    otp: string,
    newPassword: string
  ): Promise<void> => {
    try {
      // Firebase uses a different method for password reset
      // You would typically get the OTP (actionCode) from the password reset link
      await confirmPasswordReset(auth, otp, newPassword);
    } catch (error) {
      console.error('Error resetting password', error);
      throw error;
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
