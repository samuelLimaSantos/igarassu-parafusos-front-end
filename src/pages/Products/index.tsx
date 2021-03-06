import { useState, useEffect, useCallback, useContext } from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { Container, Content, NewProduct, Cards, Advisor, Top } from './styles';
import api from '../../services/api';
import { IProduct } from '../../interfaces';
import { Context } from '../../context';
import { Paginator } from '../../components/Paginator';

const Products: React.FC = () => {
  const token = localStorage.getItem('igarassu-parafusos:token');

  const {
    products,
    setProducts,
    actualPage,
    setActualPage,
    totalPages,
    setTotalPages,
    totalProducts,
    setTotalProducts,
  } = useContext(Context);

  const getProducts = useCallback(
    (page: number) => {
      api
        .get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
          },
        })
        .then(response => {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
          setActualPage(response.data.actualPage);
          setTotalProducts(response.data.totalProducts);
        })
        .catch(error => console.log(error.response.data.message));
    },
    [token, setProducts, setActualPage, setTotalPages, setTotalProducts],
  );

  useEffect(() => {
    getProducts(1);
  }, [getProducts]);

  return (
    <Container>
      <Header />
      <Content>
        <Top>
          <Advisor>
            {totalProducts >= 1
              ? `${totalProducts} produto(s) encontrado(s):`
              : `Nenhum produto foi encontrado :(`}
          </Advisor>
          <NewProduct className="advisor">Cadastrar novo produto</NewProduct>
        </Top>
        <Cards>
          {products.map((product: IProduct) => (
            <Card {...product} key={product.id} />
          ))}
        </Cards>
      </Content>
      <Paginator
        numberOfPages={totalPages}
        actualPage={actualPage}
        changePage={getProducts}
      />
    </Container>
  );
};

export default Products;
