import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IProduct } from '../../interfaces';
import { Container, Header, Description, Footer } from './styles';
import { parseImage } from '../../utils/parseImage';

const Card: React.FC<IProduct> = (product: IProduct) => {
  const [image] = useState(parseImage(product.image_id));
  const history = useHistory();

  return (
    <Container>
      <Header>
        <section className="block">
          <img src={image} alt="Ícone do produto" />
          <h1>
            {product.cod} {product.name}
          </h1>
        </section>
        <section className="price">
          <strong>R$ {product.price_sell.replace('.', ',')}</strong>
          <span>{product.unity}</span>
        </section>
      </Header>
      <Description>
        <p>{product.description.substr(0, 100)}...</p>
      </Description>

      <Footer className="footer">
        <section className="mini-cards">
          <p style={{ backgroundColor: 'rgba(14, 102, 168, 0.1)' }}>
            {product.category_id.title.substr(0, 13)}
          </p>
          <p style={{ backgroundColor: 'rgba(250, 177, 10, 0.1)' }}>
            {product.type.substr(0, 15)}
          </p>
          <p style={{ backgroundColor: 'rgba(242, 146, 146, 0.2)' }}>
            {product.quantity} {product.unity}
            {product.quantity > 1 && product.unity !== 'Par' && `s`}
            {product.quantity > 1 && product.unity === 'Par' && `es`}
          </p>
        </section>

        <button
          type="button"
          onClick={() => {
            history.push(`/product/${product.id}`, {
              id: product.id,
            });
          }}
        >
          Ver detalhes
        </button>
      </Footer>
    </Container>
  );
};

export default Card;
