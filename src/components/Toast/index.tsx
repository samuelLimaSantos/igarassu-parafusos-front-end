/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect } from 'react';

import { FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container, Content, Bar } from './style';

interface ToastPropsLocal {
  type: string;
  message: string;
  setShowToast: Dispatch<SetStateAction<any>>;
  redirectPath?: string;
}

const Toast: React.FC<ToastPropsLocal> = ({
  type,
  message,
  setShowToast,
  redirectPath,
}: ToastPropsLocal) => {
  const { push } = useHistory();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowToast({
        message: '',
        type: '',
        showToast: false,
      });

      redirectPath && push(redirectPath);
    }, 2990);

    return () => {
      clearTimeout(timeOut);
      redirectPath && push(redirectPath);
    };
  }, [setShowToast, push, redirectPath]);

  return (
    <Container>
      <Content className={type}>
        <div>
          {type === 'success' ? (
            <FiCheckCircle color="#fff" size={26} />
          ) : (
            <FiAlertCircle color="#fff" size={26} />
          )}
          <h4>{message}</h4>
          <FiXCircle
            color="#fff"
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setShowToast({
                message: '',
                type: '',
                showToast: false,
              });
            }}
            size={20}
          />
        </div>
        <Bar className={type} />
      </Content>
    </Container>
  );
};

export default Toast;
