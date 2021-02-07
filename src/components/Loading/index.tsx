import { Container, Content, LoadingElement } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <Content>
        <LoadingElement />
        <h2>Carregando...</h2>
      </Content>
    </Container>
  );
};

export default Loading;
