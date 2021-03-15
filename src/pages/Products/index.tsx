import React, { useEffect, useState, useCallback, useContext } from 'react';
import Paginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { ProductsComponent } from '../../components/ProductsComponent';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { Context } from '../../context';
import {
  Container,
  Content,
  NewProduct,
  Advisor,
  Top,
  ContainerPaginator,
} from './styles';

const Products: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(1);

  const { setToastInfo } = useContext(Context);

  const handleGetProducts = useCallback(
    (page: number) => {
      const token = localStorage.getItem('igarassu-parafusos:token');
      setIsLoading(true);
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
          setTotalProducts(response.data.totalProducts);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          setToastInfo({
            message: error.response.data.message,
            type: 'error',
            showToast: true,
          });
        });
    },
    [setToastInfo],
  );

  useEffect(() => {
    handleGetProducts(1);
  }, [handleGetProducts]);

  return (
    <Container>
      {isLoading && <Loading />}

      <Header />
      <Content>
        <Top>
          <Advisor>
            {totalProducts >= 1
              ? `${totalProducts} produto(s) encontrado(s):`
              : `Nenhum produto foi encontrado :(`}
          </Advisor>
          <Link to="registerProduct">
            <NewProduct className="advisor">Cadastrar novo produto</NewProduct>
          </Link>
        </Top>
        <ProductsComponent products={products} />
      </Content>

      <ContainerPaginator>
        <Paginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          previousLabel="<"
          previousLinkClassName="previous-label-paginator"
          nextLabel=">"
          nextLinkClassName="next-label-paginator"
          disabledClassName="disable-paginator"
          pageClassName="page-paginator"
          containerClassName="container-paginator"
          onPageChange={({ selected }) => {
            handleGetProducts(selected + 1);
          }}
        />
      </ContainerPaginator>
    </Container>
  );
};

export default Products;
