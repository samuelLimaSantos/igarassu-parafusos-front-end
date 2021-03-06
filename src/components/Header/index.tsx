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
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(true);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [toastInfo, setToastInfo] = useState<ToastProps>({
    message: '',
    type: 'error',
  });
  const [categories, setCategories] = useState<Categories[]>([]);
  const {
    handleLogout,
    setProducts,
    setActualPage,
    setTotalPages,
    setTotalProducts,
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

  const handleSearchWithFilters = useCallback(async () => {
    if (!search && !type && !category) {
      setShowToast(true);
      setToastInfo({
        message: 'Você deve preencher ao menos um dos campos',
        type: 'error',
      });
      return;
    }

    const token = localStorage.getItem('igarassu-parafusos:token');

    try {
      const Authorization = `Bearer ${token}`;
      const { data } = await api.get('/products/filter', {
        headers: {
          Authorization,
        },
        params: {
          name: toggle ? search : '',
          type,
          category,
          cod: toggle ? '' : search,
          page: 1,
        },
      });
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setActualPage(data.actualPage);
      setTotalProducts(data.totalProducts);
      setGoBack(true);
    } catch (error) {
      setShowToast(true);
      setToastInfo({
        message: error.response.data.message,
        type: 'error',
      });
    }
  }, [
    search,
    type,
    category,
    toggle,
    setProducts,
    setTotalProducts,
    setTotalPages,
    setActualPage,
  ]);

  const handleAllProducts = useCallback(async () => {
    const token = localStorage.getItem('igarassu-parafusos:token');

    try {
      const Authorization = `Bearer ${token}`;
      const { data } = await api.get('/products', {
        headers: {
          Authorization,
        },
        params: {
          page: 1,
        },
      });
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setActualPage(data.actualPage);
      setTotalProducts(data.totalProducts);
      setSearch('');
      setType('');
      setCategory('');
      setGoBack(false);
    } catch (error) {
      setShowToast(true);
      setToastInfo({
        message: error.response.data.message,
        type: 'error',
      });
    }
  }, [setProducts, setActualPage, setTotalPages, setTotalProducts]);

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
                onClick={handleSearchWithFilters}
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
            handleAllProducts();
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
