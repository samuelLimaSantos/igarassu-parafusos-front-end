import { Dispatch, SetStateAction, useEffect } from 'react';

import { FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Container, Content, Bar } from './style';

interface ToastProps {
  type: 'error' | 'success';
  message: string;
  setShowToast: Dispatch<SetStateAction<boolean>>;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  setShowToast,
}: ToastProps) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowToast(false);
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
            onClick={() => setShowToast(false)}
            size={20}
          />
        </div>
        <Bar className={type} />
      </Content>
    </Container>
  );
};

export default Toast;
