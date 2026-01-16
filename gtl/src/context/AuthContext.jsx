import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const ADMIN_EMAIL = 'admin@gtl.com';
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gtl_admin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const userData = { email, isAdmin: true };
      setUser(userData);
      localStorage.setItem('gtl_admin_user', JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('gtl_admin_user');
    return { success: true };
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

