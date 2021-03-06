import React, { useState, useCallback, FormEvent, useContext } from 'react';
import { FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container, Content, LeftSide, RightSide } from './styles';
import logoImage from '../../assets/logo.svg';
import loginImage from '../../assets/login-image.svg';
import { Context } from '../../context';
import api from '../../services/api';
import Loading from '../../components/Loading';

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, setToastInfo } = useContext(Context);
  const history = useHistory();

  const handleLogin = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        const { data } = await api.post('/session', {
          login: name,
          password,
        });
        setIsLoading(false);
        login(data.token, data.id);
        history.push('/products');
      } catch (error) {
        setIsLoading(false);
        setToastInfo({
          message: error.response.data.message,
          type: 'error',
          showToast: true,
        });
      }
    },
    [name, password, login, history, setToastInfo],
  );

  return (
    <Container>
      {isLoading && <Loading />}

      <Content>
        <LeftSide>
          <header>
            <img src={logoImage} alt="Logo do Igarassu Parafusos" />
          </header>
          <img src={loginImage} alt="Imagem de login" />
        </LeftSide>
        <RightSide>
          <form onSubmit={handleLogin}>
            <fieldset>
              <legend>Entrar no sistema</legend>
              <section>
                <label htmlFor="login">Nome</label>
                <span>
                  <input
                    type="text"
                    id="login"
                    required
                    placeholder="Digite o login"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  />
                  <FiUser color="#0E66A8" size="18" />
                </span>
              </section>
              <section>
                <label htmlFor="password">Senha</label>
                <span>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    id="password"
                    required
                    placeholder="Digite a senha"
                    minLength={6}
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  {isPasswordVisible ? (
                    <FiEyeOff
                      style={{ cursor: 'pointer' }}
                      color="#0E66A8"
                      size="18"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  ) : (
                    <FiEye
                      color="#0E66A8"
                      style={{ cursor: 'pointer' }}
                      size="18"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  )}
                </span>
              </section>
              <article>
                <button type="submit">Entrar</button>
              </article>
            </fieldset>
          </form>
        </RightSide>
      </Content>
    </Container>
  );
};

export default Login;
