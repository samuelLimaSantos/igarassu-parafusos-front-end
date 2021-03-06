/* eslint-disable no-unused-expressions */
import { useState, useEffect, useCallback, useContext } from 'react';
import Paginate from 'react-paginate';
import Card from '../../components/Card';
import Header from '../../components/Header';
import api from '../../services/api';
import { IProduct } from '../../interfaces';
import { Context } from '../../context';
import { Paginator } from '../../components/Paginator';
import {
  Container,
  Content,
  NewProduct,
  Cards,
  Advisor,
  Top,
  ContainerPaginator,
} from './styles';

const Products: React.FC = () => {
  const {
    products,
    totalPages,
    totalProducts,
    getProducts,
    isGetWithFilters,
    getProductsWithFilters,
    search,
    category,
    type,
  } = useContext(Context);

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
            isGetWithFilters
              ? getProductsWithFilters(search, type, category, selected + 1)
              : getProducts(selected + 1);
          }}
        />
      </ContainerPaginator>
    </Container>
  );
};

export default Products;
