import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { Container, Content, NewProduct, Cards, Advisor, Top } from './styles';
import api from '../../services/api';
import { IProduct } from '../../interfaces';

interface ILocation {
  products: IProduct[];
}

const Products: React.FC = () => {
  const token = localStorage.getItem('igarassu-parafusos:token');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation<ILocation>();
  // const filteredProducts = location.state.products;

  // if (filteredProducts.length > 0) {
  //   setProducts(filteredProducts as SetStateAction<never[]>);
  // }
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
      <Header setProducts={setProducts} />
      <Content>
        <Top>
          <Advisor>Foram encontrados {products.length} resultados:</Advisor>
          <NewProduct className="advisor">Cadastrar novo produto</NewProduct>
        </Top>
        <Cards>
          {products.map((product: IProduct) => (
            <Card {...product} key={product.id} />
          ))}
        </Cards>
      </Content>
    </Container>
  );
};

export default Products;
