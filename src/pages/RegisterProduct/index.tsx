/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  FormEvent,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
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
import { Categories } from '../../interfaces';
import api from '../../services/api';
import { Context } from '../../context';
import {
  ContainerPaginator,
  Content,
  Form,
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
} from './styles';
import { maskMoney } from '../../utils/maskMoney';

const RegisterProduct: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageId, setImageId] = useState(1);
  const [pageStepCount, setPageStepCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [unity, setUnity] = useState('Unidade');
  const [priceBuy, setPriceBuy] = useState('');
  const [priceSell, setPriceSell] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [canSubmit, setCanSubmit] = useState(false);

  const { setToastInfo } = useContext(Context);

  const history = useHistory();

  const token = localStorage.getItem('igarassu-parafusos:token');

  useMemo(() => {
    switch (step) {
      case 1:
        name.length > 0 && name.trim().length !== 0
          ? setPageStepCount(2)
          : setPageStepCount(1);
        break;
      case 2:
        description.length > 0 && description.trim().length !== 0
          ? setPageStepCount(3)
          : setPageStepCount(2);
        break;

      case 3:
        if (category === 'new-category') {
          newCategory.length > 0 ? setPageStepCount(4) : setPageStepCount(3);
          break;
        } else {
          category.length > 0 ? setPageStepCount(4) : setPageStepCount(3);
          break;
        }
      case 4:
        type.length > 0 &&
        type.trim().length !== 0 &&
        quantity > 0 &&
        priceSell !== 'R$0,00' &&
        priceSell.length > 0 &&
        priceBuy !== 'R$0,00' &&
        priceBuy.length > 0
          ? setCanSubmit(true)
          : setCanSubmit(false);
        break;

      default:
        break;
    }
  }, [
    name,
    step,
    description,
    category,
    newCategory,
    type,
    quantity,
    priceBuy,
    priceSell,
  ]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setCategories(response.data);
        setCategory(response.data[0].title);
        setIsLoading(false);
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
  }, [token, setToastInfo]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      api
        .post(
          '/products',
          {
            name,
            quantity,
            type,
            unity,
            price_sell: Number(priceSell.substring(2).replace(',', '.')),
            price_buy: Number(priceBuy.substring(2).replace(',', '.')),
            description,
            image_id: imageId,
            category: category === 'new-category' ? newCategory : category,
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
          history.push('/products');
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
    [
      name,
      type,
      category,
      newCategory,
      description,
      imageId,
      priceBuy,
      priceSell,
      quantity,
      token,
      unity,
      setToastInfo,
      history,
    ],
  );

  return (
    <>
      {isLoading && <Loading />}

      <Header />
      <BreadCrumb />
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
                      value={name}
                      required
                      onChange={({ target }) => setName(target.value)}
                    />
                  </div>
                  <div className="container-input">
                    <label>Selecione um ícone para o produto:</label>
                    <div className="container-images">
                      <img
                        src={drillImage}
                        alt="ícone"
                        onClick={() => imageId !== 1 && setImageId(1)}
                        className={imageId === 1 ? 'image-selected' : ''}
                      />
                      <img
                        src={hammerImage}
                        alt="ícone"
                        onClick={() => imageId !== 2 && setImageId(2)}
                        className={imageId === 2 ? 'image-selected' : ''}
                      />
                      <img
                        src={keyImage}
                        alt="ícone"
                        onClick={() => imageId !== 3 && setImageId(3)}
                        className={imageId === 3 ? 'image-selected' : ''}
                      />
                      <img
                        src={measuringImage}
                        alt="ícone"
                        onClick={() => imageId !== 4 && setImageId(4)}
                        className={imageId === 4 ? 'image-selected' : ''}
                      />
                      <img
                        src={screwImage}
                        alt="ícone"
                        onClick={() => imageId !== 5 && setImageId(5)}
                        className={imageId === 5 ? 'image-selected' : ''}
                      />
                      <img
                        src={toolImage}
                        alt="ícone"
                        onClick={() => imageId !== 6 && setImageId(6)}
                        className={imageId === 6 ? 'image-selected' : ''}
                      />
                      <img
                        src={constructionToolsImage}
                        alt="ícone"
                        onClick={() => imageId !== 7 && setImageId(7)}
                        className={imageId === 7 ? 'image-selected' : ''}
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
                      value={description}
                      onChange={({ target }) => setDescription(target.value)}
                      maxLength={600}
                    />
                  </div>
                </section>
              </SecondStep>
            )}

            {step === 3 && (
              <ThirdStep>
                <h3>Selecione a categoria do produto</h3>

                <section>
                  <div className="container-input">
                    <label htmlFor="categories">Categorias</label>

                    <select
                      id="categories"
                      value={category}
                      onChange={({ target }) => setCategory(target.value)}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                      <option value="new-category">Criar nova categoria</option>
                    </select>

                    {category === 'new-category' && (
                      <>
                        <p>
                          Ao selecionar essa opção você está criando uma nova
                          categoria que estará disponível nas próximas vezes que
                          for criar um produto.
                        </p>
                        <div className="new-category-container">
                          <article>
                            <label htmlFor="new-category">
                              Nome da nova categoria
                            </label>
                            <input
                              type="text"
                              id="new-category"
                              maxLength={100}
                              value={newCategory}
                              required
                              onChange={({ target }) => {
                                setNewCategory(target.value);
                              }}
                            />
                          </article>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </ThirdStep>
            )}

            {step === 4 && (
              <FourthStep>
                <h3>Defina os últimos detalhes do produto</h3>

                <section className="triple-grid">
                  <div className="container-input">
                    <label htmlFor="type">Tipo do produto</label>

                    <input
                      id="type"
                      value={type}
                      onChange={({ target }) => setType(target.value)}
                      maxLength={600}
                    />
                  </div>

                  <div className="container-input">
                    <label htmlFor="unity">Unidade de medida</label>

                    <select
                      id="unity"
                      value={unity}
                      onChange={({ target }) => setUnity(target.value)}
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
                      value={quantity}
                      type="number"
                      min={1}
                      onChange={({ target }) => {
                        setQuantity(Number(target.value));
                      }}
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
                      value={priceBuy}
                      onChange={({ target }) => {
                        setPriceBuy(maskMoney(target.value));
                      }}
                      maxLength={20}
                    />
                  </div>

                  <div className="container-input">
                    <label htmlFor="price_sell">Preço de venda</label>
                    <input
                      id="price_sell"
                      value={priceSell}
                      onChange={({ target }) => {
                        setPriceSell(maskMoney(target.value));
                      }}
                      maxLength={20}
                    />
                  </div>
                  <div className="container-button">
                    <button type="submit" disabled={!canSubmit}>
                      Cadastrar
                    </button>
                  </div>
                </section>
              </FourthStep>
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
    </>
  );
};

export { RegisterProduct };
