import React, { useState, useCallback, FormEvent, useContext } from 'react';
import { FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container, Content, LeftSide, RightSide } from './styles';
import logoImage from '../../assets/logo.svg';
import loginImage from '../../assets/login-image.svg';
import { Context } from '../../context';
import api from '../../services/api';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';

interface ToastProps {
  type: 'error' | 'success';
  message: string;
}

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState<ToastProps>({
    message: '',
    type: 'error',
  });
  const { login } = useContext(Context);
  const history = useHistory();

  const handleLogin = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        const { data } = await api.post('/sessions', {
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
        });
        setShowToast(true);
      }
    },
    [name, password, login, history],
  );

  return (
    <Container>
      {isLoading && <Loading />}
      {showToast && (
        <Toast
          type={toastInfo.type}
          message={toastInfo.message}
          setShowToast={setShowToast}
        />
      )}

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
          {/* <a href="/">Esqueceu a senha? Clique aqui</a> */}
        </RightSide>
      </Content>
    </Container>
  );
};

export default Login;
