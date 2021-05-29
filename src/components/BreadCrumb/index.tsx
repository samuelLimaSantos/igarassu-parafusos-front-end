/* eslint-disable react/require-default-props */
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { Container } from './styles';

type BreadCrumbProps = {
  goBack?: string;
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ goBack }: BreadCrumbProps) => {
  return (
    <Container>
      <span>
        <Link to={goBack || '/products'}>
          <FiChevronLeft size={32} />
          <span>Voltar</span>
        </Link>
      </span>
    </Container>
  );
};

export { BreadCrumb };
