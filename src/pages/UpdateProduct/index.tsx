/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  FormEvent,
  useContext,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Paginate from 'react-paginate';
import Loading from '../../components/Loading';
import { BreadCrumb } from '../../components/BreadCrumb';
import Header from '../../components/Header';
import drillImage from '../../assets/drill.svg';
import hammerImage from '../../assets/hammer.svg';
import keyImage from '../../assets/key.svg';
import measuringImage from '../../assets/measuring-tool.svg';
import screwImage from '../../assets/screw.svg';
import toolImage from '../../assets/tool.svg';
import constructionToolsImage from '../../assets/construction-tools.svg';
import api from '../../services/api';
import { Context } from '../../context';
import {
  ContainerPaginator,
  Content,
  Form,
  FirstStep,
  SecondStep,
  ThirdStep,
} from './styles';
import { maskMoney } from '../../utils/maskMoney';

type Product = {
  description: string;
  image_id: number;
  name: string;
  price_buy: string;
  price_sell: string;
  quantity: number;
  type: string;
  unity: string;
};

const ProductUpdate: React.FC = () => {
  const [step, setStep] = useState(1);

  const [pageStepCount, setPageStepCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [canSubmit, setCanSubmit] = useState(false);
  const [product, setProduct] = useState<Product>({
    description: '',
    image_id: 0,
    name: '',
    price_buy: '',
    price_sell: '',
    quantity: 0,
    type: '',
    unity: '',
  });

  const { setToastInfo } = useContext(Context);

  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/').slice(-1)[0];

  const token = localStorage.getItem('igarassu-parafusos:token');

  useMemo(() => {
    switch (step) {
      case 1:
        product.name.length > 0 && product.name.trim().length !== 0
          ? setPageStepCount(2)
          : setPageStepCount(1);
        break;
      case 2:
        product.description.length > 0 &&
        product.description.trim().length !== 0
          ? setPageStepCount(3)
          : setPageStepCount(2);
        break;

      case 3:
        product.type.length > 0 &&
        product.type.trim().length !== 0 &&
        product.quantity > 0 &&
        product.price_sell !== 'R$0,00' &&
        product.price_sell.length > 0 &&
        product.price_buy !== 'R$0,00' &&
        product.price_buy.length > 0
          ? setCanSubmit(true)
          : setCanSubmit(false);
        break;

      default:
        break;
    }
  }, [step, product]);

  useEffect(() => {
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
        response.data.price_sell = maskMoney(response.data.price_sell);
        response.data.price_buy = maskMoney(response.data.price_buy);
        setProduct(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setToastInfo({
          message: error.response.data.message,
          type: 'error',
          showToast: true,
        });
      });
  }, [token, setToastInfo, id]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      api
        .put(
          `/products/${id}`,
          {
            name: product.name,
            description: product.description,
            image_id: product.image_id,
            price_buy: Number(product.price_buy.substring(2).replace(',', '.')),
            price_sell: Number(
              product.price_sell.substring(2).replace(',', '.'),
            ),
            quantity: product.quantity,
            type: product.type,
            unity: product.unity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          setToastInfo({
            message: 'Produto cadastrado com sucesso!',
            type: 'success',
            showToast: true,
          });
          setIsLoading(false);
          history.push(`/product/${id}`);
        })
        .catch(error => {
          setToastInfo({
            message: error.response.data.message,
            type: 'error',
            showToast: true,
            redirectPath: '/registerProduct',
          });
          setIsLoading(false);
        });
    },
    [history, product, setToastInfo, token, id],
  );

  return (
    <>
      {isLoading && <Loading />}

      <Header />
      <BreadCrumb goBack={`/product/${id}`} />
      <Content>
        <div
          style={{
            width: `${step * 25}%`,
            height: 4,
            backgroundColor: '#0E66A8',
          }}
        />
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Novo produto</legend>
            {step === 1 && (
              <FirstStep>
                <h3>Escolha o nome e ícone do produto</h3>
                <section>
                  <div className="container-input">
                    <label htmlFor="name">Nome do produto</label>
                    <input
                      type="text"
                      id="name"
                      maxLength={100}
                      value={product.name}
                      required
                      onChange={({ target }) => {
                        return setProduct({
                          ...product,
                          name: target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="container-input">
                    <label>Selecione um ícone para o produto:</label>
                    <div className="container-images">
                      <img
                        src={drillImage}
                        alt="ícone"
                        onClick={() => {
                          product.image_id !== 1 &&
                            setProduct({ ...product, image_id: 1 });
                        }}
                        className={
                          product.image_id === 1 ? 'image-selected' : ''
                        }
                      />
                      <img
                        src={hammerImage}
                        alt="ícone"
                        onClick={() => {
                          product.image_id !== 1 &&
                            setProduct({ ...product, image_id: 2 });
                        }}
                        className={
                          product.image_id === 2 ? 'image-selected' : ''
                        }
                      />
                      <img
                        src={keyImage}
                        alt="ícone"
                        onClick={() => {
                          product.image_id !== 1 &&
                            setProduct({ ...product, image_id: 3 });
                        }}
                        className={
                          product.image_id === 3 ? 'image-selected' : ''
                        }
                      />
                      <img
                        src={measuringImage}
                        alt="ícone"
                        onClick={() => {
                          product.image_id !== 1 &&
                            setProduct({ ...product, image_id: 4 });
                        }}
                        className={
                          product.image_id === 4 ? 'image-selected' : ''
                        }
                      />
                      <img
                        src={screwImage}
                        alt="ícone"
                        onClick={() => {
                          product.image_id !== 1 &&
                            setProduct({ ...product, image_id: 5 });
                        }}
                        className={
                          product.image_id === 5 ? 'image-selected' : ''
                        }
                      />
                      <img
                        src={toolImage}
                        alt="ícone"
                        onClick={() => {
                          product.image_id !== 1 &&
                            setProduct({ ...product, image_id: 6 });
                        }}
                        className={
                          product.image_id === 6 ? 'image-selected' : ''
                        }
                      />
                      <img
                        src={constructionToolsImage}
                        alt="ícone"
                        onClick={() => {
                          product.image_id !== 1 &&
                            setProduct({ ...product, image_id: 7 });
                        }}
                        className={
                          product.image_id === 7 ? 'image-selected' : ''
                        }
                      />
                    </div>
                  </div>
                </section>
              </FirstStep>
            )}

            {step === 2 && (
              <SecondStep>
                <h3>Escreva uma descrição legal para o produto</h3>

                <section>
                  <div className="container-input">
                    <label htmlFor="description">Descrição</label>

                    <textarea
                      id="description"
                      value={product.description}
                      onChange={({ target }) => {
                        return setProduct({
                          ...product,
                          description: target.value,
                        });
                      }}
                      maxLength={600}
                    />
                  </div>
                </section>
              </SecondStep>
            )}

            {step === 3 && (
              <ThirdStep>
                <h3>Defina os últimos detalhes do produto</h3>

                <section className="triple-grid">
                  <div className="container-input">
                    <label htmlFor="type">Tipo do produto</label>

                    <input
                      id="type"
                      value={product.type}
                      onChange={({ target }) => {
                        setProduct({
                          ...product,
                          type: target.value,
                        });
                      }}
                      maxLength={600}
                    />
                  </div>

                  <div className="container-input">
                    <label htmlFor="unity">Unidade de medida</label>

                    <select
                      id="unity"
                      value={product.unity}
                      onChange={({ target }) => {
                        setProduct({
                          ...product,
                          unity: target.value,
                        });
                      }}
                    >
                      <option value="Unidade">Unidade</option>
                      <option value="Metro">Metro</option>
                      <option value="Centímetro">Centímetro</option>
                    </select>
                  </div>

                  <div className="container-input">
                    <label htmlFor="quantity">Quantidade</label>

                    <input
                      id="quantity"
                      value={product.quantity}
                      onChange={({ target }) => {
                        setProduct({
                          ...product,
                          quantity: Number(target.value),
                        });
                      }}
                      type="number"
                      min={1}
                    />
                  </div>
                </section>

                <h3 style={{ marginTop: 60, marginBottom: 32 }}>
                  Detalhe os preços
                </h3>

                <section className="double-grid">
                  <div className="container-input">
                    <label htmlFor="price_buy">Preço de compra</label>

                    <input
                      id="price_buy"
                      value={product.price_buy}
                      onChange={({ target }) => {
                        setProduct({
                          ...product,
                          price_buy: maskMoney(target.value),
                        });
                      }}
                      maxLength={20}
                    />
                  </div>

                  <div className="container-input">
                    <label htmlFor="price_sell">Preço de venda</label>
                    <input
                      id="price_sell"
                      value={product.price_sell}
                      onChange={({ target }) => {
                        setProduct({
                          ...product,
                          price_sell: maskMoney(target.value),
                        });
                      }}
                      maxLength={20}
                    />
                  </div>
                  <div className="container-button">
                    <button type="submit" disabled={!canSubmit}>
                      Atualizar
                    </button>
                  </div>
                </section>
              </ThirdStep>
            )}
          </fieldset>

          <ContainerPaginator>
            <Paginate
              pageCount={pageStepCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              previousLabel="Passo anterior"
              previousLinkClassName="previous-label-paginator"
              nextLabel="Próximo passo"
              nextLinkClassName="next-label-paginator"
              disabledClassName="disable-paginator"
              pageClassName="page-paginator"
              containerClassName="container-paginator"
              onPageChange={({ selected }) => {
                setStep(selected + 1);
              }}
            />
          </ContainerPaginator>
        </Form>
      </Content>
      <div className="space-bottom" />
    </>
  );
};

export { ProductUpdate };
