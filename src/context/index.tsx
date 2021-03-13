/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

const Context = createContext({
  authenticated: false,
  login(token: string, userId: string) {},
  token: '',
  handleLogout() {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const login = useCallback((token: string, userId: string) => {
    setToken(token);

    localStorage.setItem('igarassu-parafusos:token', token);
    localStorage.setItem('igarassu-parafusos:userId', userId);

    setAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setAuthenticated(false);
    setToken('');
    localStorage.removeItem('igarassu-parafusos:token');
    localStorage.removeItem('igarassu-parafusos:userId');
  }, []);

  const provided = useMemo(
    () => ({
      authenticated,
      login,
      token,
      handleLogout,
    }),
    [authenticated, login, token, handleLogout],
  );

  return <Context.Provider value={provided}>{children}</Context.Provider>;
};

export { Context, AuthProvider };
