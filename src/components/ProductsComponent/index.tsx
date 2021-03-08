import { useEffect, useContext } from 'react';
import Paginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Card from '../Card';
import Header from '../Header';
import { IProduct, IProductsArray } from '../../interfaces';
import { Context } from '../../context';
import {
  Container,
  Content,
  NewProduct,
  Cards,
  Advisor,
  Top,
  ContainerPaginator,
} from './styles';

interface IProducts {
  products: IProduct[];
}

const ProductsComponent: React.FC<IProducts> = ({ products }: IProducts) => {
  return (
    <Cards>
      {products.map((product: IProduct) => (
        <Card {...product} key={product.id} />
      ))}
    </Cards>
  );
};

export { ProductsComponent };
