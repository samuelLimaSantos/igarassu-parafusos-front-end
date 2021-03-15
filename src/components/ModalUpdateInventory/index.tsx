import { Dispatch, useState, useCallback, FormEvent, useContext } from 'react';
import { FiXCircle } from 'react-icons/fi';
import Loading from '../Loading';
import api from '../../services/api';
import { Context } from '../../context';

import { Container, Content, Form } from './styles';

interface IModalUpdateInventory {
  productId: string;
  setShowModalUpdateInventory: Dispatch<React.SetStateAction<boolean>>;
}

const ModalUpdateInventory: React.FC<IModalUpdateInventory> = ({
  productId,
  setShowModalUpdateInventory,
}: IModalUpdateInventory) => {
  const [quantity, setQuantity] = useState(1);
  const [transactionType, setTransactionType] = useState('income');
  const [isLoading, setIsLoading] = useState(false);
  const { setToastInfo } = useContext(Context);

  const handleUpdateInventory = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const token = localStorage.getItem('igarassu-parafusos:token');
      setIsLoading(true);
      api
        .put(
          `products/inventory/${productId}`,
          {
            quantity,
            transaction_type: transactionType,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          setToastInfo({
            message: 'Inventário atualizado com sucesso!',
            type: 'success',
            showToast: true,
          });
          setIsLoading(false);
          setShowModalUpdateInventory(false);
        })
        .catch(error => {
          setShowModalUpdateInventory(false);
          setToastInfo({
            message: error.response.data.message,
            type: 'error',
            showToast: true,
          });
          setIsLoading(false);
        });
    },
    [
      productId,
      quantity,
      transactionType,
      setShowModalUpdateInventory,
      setToastInfo,
    ],
  );

  return (
    <Container>
      {isLoading && <Loading />}
      <Content>
        <Form onSubmit={handleUpdateInventory}>
          <fieldset>
            <div>
              <legend>Atualizar estoque</legend>
              <FiXCircle
                size={24}
                onClick={() => setShowModalUpdateInventory(false)}
              />
            </div>

            <section className="container-inputs">
              <div>
                <label htmlFor="quantity">Quantidade</label>
                <input
                  type="number"
                  id="quantity"
                  min={1}
                  value={quantity}
                  required
                  onChange={({ target }) => setQuantity(Number(target.value))}
                />
              </div>

              <div>
                <label htmlFor="type-operation">Tipo da operação</label>
                <select
                  name="type-operation"
                  id="ty-operation"
                  value={transactionType}
                  onChange={({ target }) => setTransactionType(target.value)}
                  required
                >
                  <option value="income">Entrada</option>
                  <option value="outcome">Saída</option>
                </select>
              </div>
            </section>
            <div className="container-button">
              <button type="submit">Atualizar</button>
            </div>
          </fieldset>
        </Form>
      </Content>
    </Container>
  );
};

export { ModalUpdateInventory };
