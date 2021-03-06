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
  products: [],
  setProducts(value: React.SetStateAction<never[]>) {},
  totalPages: 0,
  setTotalPages(value: React.SetStateAction<number>) {},
  actualPage: 0,
  setActualPage(value: React.SetStateAction<number>) {},
  totalProducts: 0,
  setTotalProducts(value: React.SetStateAction<number>) {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [actualPage, setActualPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

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
      products,
      setProducts,
      totalPages,
      setTotalPages,
      actualPage,
      setActualPage,
      totalProducts,
      setTotalProducts,
    }),
    [
      authenticated,
      login,
      token,
      handleLogout,
      products,
      setProducts,
      totalPages,
      setTotalPages,
      actualPage,
      setActualPage,
      totalProducts,
      setTotalProducts,
    ],
  );

  return <Context.Provider value={provided}>{children}</Context.Provider>;
};

export { Context, AuthProvider };
