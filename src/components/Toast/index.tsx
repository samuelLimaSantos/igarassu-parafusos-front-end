/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect } from 'react';

import { FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Container, Content, Bar } from './style';

interface ToastPropsLocal {
  type: string;
  message: string;
  setShowToast: Dispatch<SetStateAction<any>>;
}

const Toast: React.FC<ToastPropsLocal> = ({
  type,
  message,
  setShowToast,
}: ToastPropsLocal) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowToast({
        message: '',
        type: '',
        showToast: false,
      });
    }, 2990);

    return () => {
      clearTimeout(timeOut);
    };
  }, [setShowToast]);

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
