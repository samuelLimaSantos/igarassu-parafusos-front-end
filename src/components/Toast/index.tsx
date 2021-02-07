import { Dispatch, SetStateAction, useEffect } from 'react';

import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
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
    setTimeout(() => {
      setShowToast(false);
    }, 3990);
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
        </div>
        <Bar className={type} />
      </Content>
    </Container>
  );
};

export default Toast;
