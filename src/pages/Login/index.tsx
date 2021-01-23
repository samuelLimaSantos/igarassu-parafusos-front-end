import React, { useState, useCallback, FormEvent } from 'react';
import { FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { Container, Content, LeftSide, RightSide } from './styles';
import logoImage from '../../assets/logo.svg';
import loginImage from '../../assets/login-image.svg';
import api from '../../services';

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        const user = await api.post('/sessions', {
          login,
          password,
        });

        console.log(user);
      } catch (error) {
        alert(error.response.data);
      }
    },
    [login, password],
  );

  return (
    <Container>
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
                    value={login}
                    onChange={({ target }) => setLogin(target.value)}
                  />
                  <FiUser color="#0E66A8" size="16" />
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
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  {isPasswordVisible ? (
                    <FiEyeOff
                      color="#0E66A8"
                      size="16"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  ) : (
                    <FiEye
                      color="#0E66A8"
                      size="16"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  )}
                </span>
              </section>

              <button type="submit">Entrar</button>
            </fieldset>
          </form>
          <a href="/">Esqueceu a senha? Clique aqui</a>
        </RightSide>
      </Content>
    </Container>
  );
};

export default Login;
