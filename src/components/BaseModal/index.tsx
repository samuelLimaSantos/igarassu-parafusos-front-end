import { FiXCircle } from 'react-icons/fi';
import { Container, Content } from './styles';

interface BaseModalProps {
  title: string;
  buttonText: string;
  children: React.ReactNode;
  quitModal(): void;
  actionButton(): void;
}

const BaseModal: React.FC<BaseModalProps> = ({
  title,
  buttonText,
  children,
  quitModal,
  actionButton,
}: BaseModalProps) => {
  return (
    <Container>
      <Content>
        <div className="header">
          <h3>{title}</h3>

          <FiXCircle size={28} onClick={quitModal} />
        </div>

        <div className="main">{children}</div>

        <div className="button">
          <button type="button" onClick={actionButton}>
            {buttonText}
          </button>
        </div>
      </Content>
    </Container>
  );
};

export { BaseModal };
