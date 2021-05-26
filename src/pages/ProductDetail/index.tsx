import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState, useCallback } from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { NONAME } from 'dns';
import api from '../../services/api';
import { Context } from '../../context';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { BreadCrumb } from '../../components/BreadCrumb';
import { parseImage } from '../../utils/parseImage';
import { Container, Content } from './styles';
import '@szhsin/react-menu/dist/index.css';

type Product = {
  cod: string;
  created_at: string;
  updated_at: string;
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
  const [product, setProduct] = useState<Product>({
    cod: '',
    created_at: '',
    description: '',
    image_id: 0,
    name: '',
    price_buy: '',
    price_sell: '',
    quantity: 0,
    type: '',
    unity: '',
    updated_at: '',
  });
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const { setToastInfo } = useContext(Context);

  const menuIcon = (
    <MenuButton className="button-menu">
      <FiAlignRight size={40} />
    </MenuButton>
  );

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
    <Container>
      <Header />
      <BreadCrumb />
      {isLoading && <Loading />}
      <Content>
        <div className="header">
          <div className="name-icon">
            <img src={image} alt="ícone do produto" />
            <h1>{product.name}</h1>
          </div>
          <div className="menu-container">
            <Menu menuButton={menuIcon} className="button-menu">
              <MenuItem>Ver histórico de transações</MenuItem>
              <SubMenu label="Atualizar">
                <MenuItem>Estoque do produto</MenuItem>
                <MenuItem>Dados do produto</MenuItem>
              </SubMenu>
              <MenuItem>Excluir produto</MenuItem>
            </Menu>
          </div>
        </div>

        <div className="description-block">
          <label>Descrição</label>
          <p>{product.description}</p>
        </div>
        <section className="info-block">
          <section className="unit">
            <label>Código do produto</label>
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
            <span>R$ {product.price_buy.replace('.', ',')}</span>
          </section>

          <section className="unit">
            <label>Preço de venda</label>
            <span>R$ {product.price_sell.replace('.', ',')}</span>
          </section>

          <section className="unit">
            <label>Quantidade em estoque</label>
            <span>{product.quantity}</span>
          </section>

          <section className="unit">
            <label>Data de cadastro</label>
            <span>{product.created_at}</span>
          </section>

          <section className="unit">
            <label>Última atualização</label>
            <span>{product.updated_at}</span>
          </section>
        </section>
      </Content>
    </Container>
  );
};

export { ProductDetail };
