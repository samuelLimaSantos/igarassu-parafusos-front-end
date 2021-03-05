import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { Container, Content, Advisor, Cards } from './styles';
import api from '../../services/api';
import { IProduct } from '../../interfaces';

const Products: React.FC = () => {
  const token = localStorage.getItem('igarassu-parafusos:token');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
        },
      })
      .then(response => setProducts(response.data.products))
      .catch(error => console.log(error.response.data.message));
  }, [token, page]);

  return (
    <Container>
      <Header />
      <Content>
        <Advisor className="advisor">
          Todos os produtos cadastrados no sistema
        </Advisor>
        <Cards>
          {products.map((product: IProduct) => (
            <Card {...product} />
          ))}
        </Cards>
      </Content>
    </Container>
  );
};

export default Products;
