import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { Container } from './styles';

const BreadCrumb: React.FC = () => {
  return (
    <Container>
      <Link to="/products">
        <span>
          <FiChevronLeft size={32} />
          <span>Voltar</span>
        </span>
      </Link>
    </Container>
  );
};

export { BreadCrumb };
