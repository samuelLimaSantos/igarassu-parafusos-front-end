import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import api from '../../services/api';
import { Context } from '../../context';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { BreadCrumb } from '../../components/BreadCrumb';
import { parseImage } from '../../utils/parseImage';

type Product = {
  cod: string;
  created_at: string;
  description: string;
  image_id: number;
  name: string;
  price_buy: string;
  price_sell: string;
  quantity: number;
  type: string;
  unity: string;
};

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const [product, setProduct] = useState<Product>({} as Product);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const { setToastInfo } = useContext(Context);

  useEffect(() => {
    const id = location.pathname.split('/').slice(-1)[0];
    setIsLoading(true);
    const token = localStorage.getItem('igarassu-parafusos:token');
    setIsLoading(true);
    api
      .get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setProduct(response.data);
        setCategory(response.data.category_id.title);
        setIsLoading(false);
        setImage(parseImage(response.data.image_id));
      })
      .catch(error => {
        setIsLoading(false);
        setToastInfo({
          message: error.response.data.message,
          type: 'error',
          showToast: true,
        });
      });
  }, [location, setToastInfo]);

  return (
    <div>
      <Header />
      <BreadCrumb />
      {isLoading && <Loading />}
      <div className="content">
        <div className="header">
          {product.name}
          <img src={image} alt="ícone do produto" />
        </div>
        <div className="description-block">
          <label>Descrição</label>
          <p>{product.description}</p>
        </div>
        <div className="info-block">
          <section className="info">
            <section className="unit">
              <label>Código</label>
              <span>{product.cod}</span>
            </section>

            <section className="unit">
              <label>Unidade</label>
              <span>{product.unity}</span>
            </section>

            <section className="unit">
              <label>Tipo</label>
              <span>{product.type}</span>
            </section>

            <section className="unit">
              <label>Categoria</label>
              <span>{category}</span>
            </section>

            <section className="unit">
              <label>Preço de compra</label>
              <span>{product.price_buy}</span>
            </section>

            <section className="unit">
              <label>Preço de venda</label>
              <span>{product.price_sell}</span>
            </section>

            <section className="unit">
              <label>Quantidade em estoque</label>
              <span>{product.quantity}</span>
            </section>

            <section className="unit">
              <label>Data de cadastro</label>
              <span>{product.created_at}</span>
            </section>
          </section>

          <section className="buttons">
            <button type="button">Excluir produto</button>
            <button type="button">Atualizar estoque</button>
            <button type="button">Atualizar produto</button>
            <button type="button">Ver histórico</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export { ProductDetail };
