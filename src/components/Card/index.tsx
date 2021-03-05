import drillImage from '../../assets/drill.svg';
import { IProduct } from '../../interfaces';
import { Container, Header, Description, Footer } from './styles';

const Card: React.FC<IProduct> = (product: IProduct) => {
  return (
    <Container>
      <Header>
        <section className="block">
          <img src={drillImage} alt="Ícone do produto" />
          <h1>{product.name}</h1>
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
            {product.category_id.title}
          </p>
          <p style={{ backgroundColor: 'rgba(250, 177, 10, 0.1)' }}>
            {product.type}
          </p>
          <p style={{ backgroundColor: 'rgba(242, 146, 146, 0.2)' }}>
            {product.quantity} {product.unity}
          </p>
        </section>

        <button type="button">Atualizar estoque</button>
      </Footer>
    </Container>
  );
};

export default Card;
