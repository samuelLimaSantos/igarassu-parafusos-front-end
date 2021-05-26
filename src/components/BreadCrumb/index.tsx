import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { Container } from './styles';

const BreadCrumb: React.FC = () => {
  return (
    <Container>
      <span>
        <Link to="/products">
          <FiChevronLeft size={32} />
          <span>Voltar</span>
        </Link>
      </span>
    </Container>
  );
};

export { BreadCrumb };
