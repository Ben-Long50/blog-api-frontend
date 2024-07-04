import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  });

  const apiUrl = 'https://legends-of-the-hearth.adaptable.app';

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, apiUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
