import React, { useEffect, useCallback, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Paginate from 'react-paginate';
import Header from '../../components/Header';
import { ProductsComponent } from '../../components/ProductsComponent';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { BreadCrumb } from '../../components/BreadCrumb';
import { Context } from '../../context';
import {
  ContainerPaginator,
  Container,
  Content,
  Advisor,
  NewProduct,
  Top,
} from './styles';

const Search: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { setToastInfo } = useContext(Context);

  const { search } = useLocation();
  const getWithFilters = useCallback(
    async (page: number) => {
      const [searchName, type, category, toggle] = search
        .replace('?', '')
        .replace('search', '')
        .replace('category', '')
        .replace('type', '')
        .replace('toggle', '')
        .replaceAll('=', '')
        .split('&');

      const token = localStorage.getItem('igarassu-parafusos:token');

      try {
        const Authorization = `Bearer ${token}`;
        setIsLoading(true);
        const { data } = await api.get('/products', {
          headers: {
            Authorization,
          },
          params: {
            name: toggle === 'true' ? searchName : '',
            type,
            category,
            cod: toggle === 'true' ? '' : searchName,
            page,
          },
        });
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setToastInfo({
          message: error.response.data.message,
          type: 'error',
          showToast: true,
        });
      }
    },
    [search, setToastInfo],
  );

  useEffect(() => {
    getWithFilters(1);
  }, [getWithFilters]);

  return (
    <Container>
      {isLoading && <Loading />}

      <Header />
      <BreadCrumb />
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
            getWithFilters(selected + 1);
          }}
        />
      </ContainerPaginator>
      <div className="space-bottom" />
    </Container>
  );
};

export { Search };
