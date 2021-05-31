import { useLocation, useHistory, Link } from 'react-router-dom';
import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import api from '../../services/api';
import { Context } from '../../context';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { BreadCrumb } from '../../components/BreadCrumb';
import { parseImage } from '../../utils/parseImage';
import { BaseModal } from '../../components/BaseModal';
import '@szhsin/react-menu/dist/index.css';
import { Container, Content, UpdateInventoryContent } from './styles';

type Product = {
  id: string;
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

type UpdateInventory = {
  quantity: number;
  transaction_type: string;
};

const ProductDetail: React.FC = () => {
  const token = localStorage.getItem('igarassu-parafusos:token');
  const history = useHistory();
  const location = useLocation();

  const defaultUpdateInventoryData = useMemo(() => {
    return {
      quantity: 1,
      transaction_type: 'income',
    };
  }, []);

  const [product, setProduct] = useState<Product>({
    id: '',
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
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateInventoryModal, setUpdateInventoryModal] = useState(false);
  const [
    updateInventoryData,
    setUpdateInventoryData,
  ] = useState<UpdateInventory>(defaultUpdateInventoryData);

  const menuIcon = (
    <MenuButton className="button-menu">
      <FiAlignRight size={40} />
    </MenuButton>
  );

  // const [name, setName] = useState('');

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
        // setName(response.data.name);
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

  const handleDeleteProduct = useCallback(() => {
    api
      .delete(`/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setToastInfo({
          message: 'Produto deletado com sucesso!',
          type: 'success',
          showToast: true,
        });
        setIsLoading(false);
        history.push('/products');
      })
      .catch(error => {
        setToastInfo({
          message: error.response.data.message,
          type: 'error',
          showToast: true,
          redirectPath: `/product/${product.id}`,
        });
        setIsLoading(false);
      });
  }, [history, product.id, setToastInfo, token]);

  const handleUpdateInventory = useCallback(() => {
    api
      .put(
        `/products/inventory/${product.id}`,
        {
          quantity: updateInventoryData.quantity,
          transaction_type: updateInventoryData.transaction_type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setToastInfo({
          message: 'Produto atualizado com sucesso!',
          type: 'success',
          showToast: true,
        });
        setIsLoading(false);
        history.push(`/product/${product.id}`);
      })
      .catch(error => {
        setToastInfo({
          message: error.response.data.message,
          type: 'error',
          showToast: true,
          redirectPath: `/product/${product.id}`,
        });
        setIsLoading(false);
      });
  }, [history, product.id, setToastInfo, token, updateInventoryData]);

  // const handleUpdateInventory = useCallback(() => {
  //   api
  //     .put(
  //       `/products/${product.id}`,
  //       {
  //         name,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     )
  //     .then(() => {
  //       setToastInfo({
  //         message: 'Produto atualizado com sucesso!',
  //         type: 'success',
  //         showToast: true,
  //       });
  //       setIsLoading(false);
  //       history.push(`/product/${product.id}`);
  //     })
  //     .catch(error => {
  //       setToastInfo({
  //         message: error.response.data.message,
  //         type: 'error',
  //         showToast: true,
  //         redirectPath: `/product/${product.id}`,
  //       });
  //       setIsLoading(false);
  //     });
  // }, [history, product.id, setToastInfo, token, name]);

  const quitModal = useCallback(
    (modalType: string) => {
      switch (modalType) {
        case 'delete':
          setDeleteModal(false);
          break;
        case 'updateInventory':
          setUpdateInventoryModal(false);
          setUpdateInventoryData(defaultUpdateInventoryData);
          // setName(product.name);
          break;
        default:
          return '';
      }
    },
    [
      defaultUpdateInventoryData,
      // product.name
    ],
  );

  const actionModalButton = useCallback(
    (modalType: string) => {
      switch (modalType) {
        case 'delete':
          handleDeleteProduct();
          setDeleteModal(false);
          break;
        case 'updateInventory':
          handleUpdateInventory();
          setUpdateInventoryModal(false);
          setUpdateInventoryData(defaultUpdateInventoryData);
          // setName(product.name);

          break;
        default:
          return '';
      }
    },
    [
      handleDeleteProduct,
      handleUpdateInventory,
      defaultUpdateInventoryData,
      // product.name,
    ],
  );

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
              <MenuItem>
                <Link to={`/transactions/${product.id}`}>
                  Ver histórico de transações
                </Link>
              </MenuItem>
              <SubMenu label="Atualizar">
                <MenuItem onClick={() => setUpdateInventoryModal(true)}>
                  Estoque do produto
                </MenuItem>
                <MenuItem>
                  <Link
                    to={{
                      pathname: `/update/${product.id}`,
                      state: {
                        id: product.id,
                      },
                    }}
                  >
                    Dados do produto
                  </Link>
                </MenuItem>
              </SubMenu>
              <MenuItem onClick={() => setDeleteModal(true)}>
                Excluir produto
              </MenuItem>
            </Menu>
          </div>

          {updateInventoryModal && (
            <BaseModal
              title="Atualizar estoque"
              buttonText="Atualizar"
              quitModal={() => {
                quitModal('updateInventory');
              }}
              actionButton={() => {
                actionModalButton('updateInventory');
              }}
            >
              <UpdateInventoryContent>
                <section className="block">
                  <label htmlFor="quantity">Quantidade</label>
                  <input
                    type="number"
                    id="quantity"
                    min={1}
                    value={updateInventoryData.quantity}
                    onChange={({ target }) => {
                      setUpdateInventoryData({
                        ...updateInventoryData,
                        quantity: Number(target.value),
                      });
                    }}
                  />
                </section>

                <section className="block">
                  <label htmlFor="OperationType">Tipo de operação</label>
                  <select
                    id="OperationType"
                    value={updateInventoryData.transaction_type}
                    onChange={({ target }) => {
                      setUpdateInventoryData({
                        ...updateInventoryData,
                        transaction_type: target.value,
                      });
                    }}
                  >
                    <option value="income">Entrada</option>
                    <option value="outcome">Saída</option>
                  </select>
                </section>

                {/* <section>
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  />
                </section> */}
              </UpdateInventoryContent>
            </BaseModal>
          )}

          {deleteModal && (
            <BaseModal
              title="Deletar produto"
              buttonText="Deletar"
              quitModal={() => {
                quitModal('delete');
              }}
              actionButton={() => {
                actionModalButton('delete');
              }}
            >
              <p style={{ width: 450 }}>
                Tem certeza que deseja deletar esse produto? Ao fazer isso você
                perderá todas as informações do produto e histórico. Essa ação é
                irreversível!
              </p>
            </BaseModal>
          )}
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
      <div className="space-bottom" />
    </Container>
  );
};

export { ProductDetail };
