import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

const api_url = 'http://localhost:5000/api/v1/users';

const register = async (userData: {
  national_id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}) => {
  const response = await fetch(`${api_url}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  const data = await response.json();
  console.log(data);
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('username', data.username);
  localStorage.setItem('national_id', data.national_id);
  return data;
};

const login = async (user_name: string, password: string): Promise<void> => {
  const response = await fetch(`${api_url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: user_name, password }),
  });

  const contentType = response.headers.get('content-type');
  if (
    !response.ok ||
    !contentType ||
    !contentType.includes('application/json')
  ) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error('Login failed');
  }

  const { token, username, national_id } = await response.json();
  localStorage.setItem('authToken', token);
  localStorage.setItem('username', username);
  localStorage.setItem('national_id', national_id);
};

const fetchUser = async (username: string) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No token found');
  const response = await fetch(`${api_url}/${username}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const user = await response.json();
  return user;
};

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
    username: string;
    password: string;
  }) => Promise<void>;
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
      const username = localStorage.getItem('username');

      if (token && username) {
        try {
          const user = await fetchUser(username);
          setUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('username');
          localStorage.removeItem('national_id');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const signIn = async (username: string, password: string): Promise<void> => {
    try {
      await login(username, password);
      const user = await fetchUser(username);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('national_id');
    setUser(null);
    setIsAuthenticated(false);
  };

  const signUp = async (userData: {
    national_id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
  }): Promise<void> => {
    try {
      await register(userData);
      const user = await fetchUser(userData.username);
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
