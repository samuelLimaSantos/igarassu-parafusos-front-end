import Card from '../Card';
import { IProduct } from '../../interfaces';
import { Cards } from './styles';

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
