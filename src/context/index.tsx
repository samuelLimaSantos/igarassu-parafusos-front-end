/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import Toast from '../components/Toast';
import { ToastProps } from '../interfaces';

const Context = createContext({
  authenticated: false,
  login(token: string, userId: string) {},
  token: '',
  handleLogout() {},
  setToastInfo(value: React.SetStateAction<ToastProps>) {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [toastInfo, setToastInfo] = useState<ToastProps>({
    message: '',
    type: 'error',
    showToast: false,
  });

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
      setToastInfo,
    }),
    [authenticated, login, token, handleLogout, setToastInfo],
  );

  return (
    <Context.Provider value={provided}>
      <>
        {toastInfo.showToast && (
          <Toast
            setShowToast={setToastInfo}
            message={toastInfo.message}
            type={toastInfo.type}
          />
        )}
        {children}
      </>
    </Context.Provider>
  );
};

export { Context, AuthProvider };
