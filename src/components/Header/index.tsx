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
  BreadCrumb,
} from './styles';

const Header: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState<ToastProps>({
    message: '',
    type: 'error',
  });
  const [categories, setCategories] = useState<Categories[]>([]);
  const {
    handleLogout,
    getProducts,
    getProductsWithFilters,
    goBack,
    toggle,
    setToggle,
    type,
    setType,
    search,
    setSearch,
    category,
    setCategory,
  } = useContext(Context);
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
      .catch(error => console.log(error));
  }, [token]);

  const handleAppLogout = useCallback(() => {
    handleLogout();

    history.push('/');
  }, [handleLogout, history]);

  return (
    <>
      <Container>
        {showToast && (
          <Toast
            setShowToast={setShowToast}
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
                onClick={() => {
                  getProductsWithFilters(search, type, category, 1);
                }}
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
      {goBack && (
        <BreadCrumb
          onClick={() => {
            getProducts(1);
            setSearch('');
            setType('');
            setCategory('');
          }}
        >
          <span>
            <FiChevronLeft size={32} />
            <span>Voltar</span>
          </span>
        </BreadCrumb>
      )}
    </>
  );
};

export default Header;
