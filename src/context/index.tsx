/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { ToastProps } from '../interfaces';
import api from '../services/api';

const Context = createContext({
  authenticated: false,
  login(token: string, userId: string) {},
  token: '',
  handleLogout() {},
  products: [],
  totalPages: 0,
  totalProducts: 0,
  getProducts(page: number) {},
  getProductsWithFilters(
    search: string,
    type: string,
    category: string,
    page: number,
  ) {},
  goBack: false,
  toggle: true,
  setToggle(value: React.SetStateAction<boolean>) {},
  isGetWithFilters: false,
  search: '',
  setSearch(value: React.SetStateAction<string>) {},
  type: '',
  setType(value: React.SetStateAction<string>) {},
  category: '',
  setCategory(value: React.SetStateAction<string>) {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [actualPage, setActualPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showToast, setShowToast] = useState(false);
  // const [toastInfo, setToastInfo] = useState<ToastProps>({
  //   message: '',
  //   type: 'error',
  // });
  const [toggle, setToggle] = useState(true);
  const [goBack, setGoBack] = useState(false);
  const [isGetWithFilters, setIsGetWithFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

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

  const getProducts = useCallback(
    (page: number) => {
      const token = localStorage.getItem('igarassu-parafusos:token');
      api
        .get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
          },
        })
        .then(response => {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
          setActualPage(response.data.actualPage);
          setTotalProducts(response.data.totalProducts);
          setIsGetWithFilters(false);
          setGoBack(false);
        })
        .catch(error => console.log(error.response.data.message));
    },
    [setProducts, setActualPage, setTotalPages, setTotalProducts],
  );

  const getProductsWithFilters = useCallback(
    async (search: string, type: string, category: string, page: number) => {
      if (!search && !type && !category) {
        // setShowToast(true);
        // setToastInfo({
        //   message: 'Você deve preencher ao menos um dos campos',
        //   type: 'error',
        // });
        // return;
      }

      const token = localStorage.getItem('igarassu-parafusos:token');

      try {
        const Authorization = `Bearer ${token}`;
        const { data } = await api.get('/products/filter', {
          headers: {
            Authorization,
          },
          params: {
            name: toggle ? search : '',
            type,
            category,
            cod: toggle ? '' : search,
            page,
          },
        });
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setActualPage(data.actualPage);
        setTotalProducts(data.totalProducts);
        setIsGetWithFilters(true);
        setGoBack(true);
      } catch (error) {
        // setShowToast(true);
        // setToastInfo({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
      }
    },
    [toggle, setProducts, setTotalProducts, setTotalPages, setActualPage],
  );

  const provided = useMemo(
    () => ({
      authenticated,
      login,
      token,
      handleLogout,
      products,
      totalPages,
      getProducts,
      getProductsWithFilters,
      totalProducts,
      goBack,
      toggle,
      setToggle,
      isGetWithFilters,
      search,
      setSearch,
      type,
      setType,
      category,
      setCategory,
    }),
    [
      authenticated,
      login,
      token,
      handleLogout,
      products,
      totalPages,
      getProducts,
      getProductsWithFilters,
      totalProducts,
      goBack,
      toggle,
      setToggle,
      isGetWithFilters,
      search,
      setSearch,
      type,
      setType,
      category,
      setCategory,
    ],
  );

  return <Context.Provider value={provided}>{children}</Context.Provider>;
};

export { Context, AuthProvider };
