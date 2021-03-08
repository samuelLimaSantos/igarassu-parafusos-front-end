import { useState, useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch, FiXCircle, FiLogOut, FiChevronLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import nameIcon from '../../assets/name-icon.svg';
import codeIcon from '../../assets/code-icon.svg';
import typeIcon from '../../assets/type-icon.svg';
import categoryIcon from '../../assets/category-icon.svg';
import api from '../../services/api';
import { Context } from '../../context';
import Toast from '../Toast';
import { Categories, ToastProps } from '../../interfaces';
import {
  Container,
  Content,
  LeftSide,
  RightSide,
  Search,
  Filters,
  Divider,
} from './styles';

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const { handleLogout } = useContext(Context);
  const [toastInfo, setToastInfo] = useState<ToastProps>({
    message: '',
    type: 'error',
    showToast: false,
  });
  const history = useHistory();
  const token = localStorage.getItem('igarassu-parafusos:token');

  useEffect(() => {
    api
      .get('/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => setCategories(response.data))
      .catch(error => {
        setToastInfo({
          message: error.response.data.message,
          type: 'error',
          showToast: true,
        });
      });
  }, [token]);

  const handleAppLogout = useCallback(() => {
    handleLogout();

    history.push('/');
  }, [handleLogout, history]);

  const handleRedirectToSearch = useCallback(() => {
    if (!search && !type && !category) {
      setToastInfo({
        message: 'Você deve preencher ao menos um dos campos de pesquisa',
        type: 'error',
        showToast: true,
      });
      return;
    }

    history.push({
      pathname: '/search',
      search: `search=${search}&type=${type}&category=${category}&toggle=${toggle}`,
    });
  }, [category, history, type, search, toggle]);

  return (
    <>
      <Container>
        {toastInfo.showToast && (
          <Toast
            setShowToast={setToastInfo}
            message={toastInfo.message}
            type={toastInfo.type}
          />
        )}

        <Content>
          <LeftSide>
            <Search>
              <FiSearch
                color="#9A9595"
                size={24}
                cursor="pointer"
                onClick={handleRedirectToSearch}
              />
              <input
                type="text"
                aria-label="Barra de pesquisa"
                placeholder="Pesquise algo..."
                value={search}
                onChange={({ target }) => setSearch(target.value)}
              />
              <FiXCircle
                color="#9A9595"
                size={18}
                cursor="pointer"
                onClick={() => setSearch('')}
              />
            </Search>
            <Filters>
              <section
                className={toggle ? 'selected' : ''}
                onClick={() => setToggle(true)}
              >
                <img src={nameIcon} alt="ícone de nome" />
                <span>Nome</span>
              </section>

              <section
                className={!toggle ? 'selected' : ''}
                onClick={() => setToggle(false)}
              >
                <img src={codeIcon} alt="ícone de código" />
                <span>Código</span>
              </section>
            </Filters>
          </LeftSide>

          <Divider />

          <RightSide>
            <div>
              <section>
                <img src={typeIcon} alt="ícone de filtro de tipo" />
                <input
                  type="text"
                  placeholder="Tipo"
                  value={type}
                  onChange={({ target }) => setType(target.value)}
                />
              </section>

              <section>
                <img src={categoryIcon} alt="ícone de filtro de categoria" />
                <input
                  type="text"
                  placeholder="Categoria"
                  id="category"
                  list="categories"
                  value={category}
                  onChange={({ target }) => setCategory(target.value)}
                />
                <datalist id="categories">
                  {categories.map(category => (
                    <option key={category.id} value={category.title} />
                  ))}
                </datalist>
              </section>
            </div>

            <div>
              <section style={{ cursor: 'pointer' }} onClick={handleAppLogout}>
                <span>Sair</span>
                <FiLogOut />
              </section>

              <section>
                <img src={logo} alt="Logo da empresa" />
              </section>
            </div>
          </RightSide>
        </Content>
      </Container>
    </>
  );
};

export default Header;
