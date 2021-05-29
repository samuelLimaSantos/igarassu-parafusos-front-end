import { useState, useEffect, useContext, useCallback } from 'react';
import Paginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import { BreadCrumb } from '../../components/BreadCrumb';
import api from '../../services/api';
import Header from '../../components/Header';
import { Context } from '../../context';
import Loading from '../../components/Loading';
import { TransactionItem } from '../../components/TransactionItem';
import { ContainerPaginator } from './styles';

type ProductData = {
  cod: string;
  name: string;
  image_id: number;
  unity: string;
};

export type TransactionsData = {
  id: string;
  quantity: number;
  transaction_type: 'income' | 'outcome';
  created_at: string;
  user_id: {
    login: string;
  };
  product_id: ProductData;
};

const TransactionHistory: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split('/').slice(-1)[0];
  const token = localStorage.getItem('igarassu-parafusos:token');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionsData[]>([]);
  const [totalIncomesAndOutcomes, setTotalIncomesAndOutcomes] = useState({
    incomes: 0,
    outcomes: 0,
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { setToastInfo } = useContext(Context);

  const handleGetTransactions = useCallback(
    async (page: number) => {
      setIsLoading(true);
      api
        .get(`transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
          },
        })
        .then(response => {
          setTransactions(response.data.transactions);
          setTotalIncomesAndOutcomes({
            incomes: response.data.incomes,
            outcomes: response.data.outcomes,
          });
          setTotalProducts(response.data.productActualQuantity);
          setTotalPages(response.data.totalPages);
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
    },
    [id, setToastInfo, token],
  );

  useEffect(() => {
    handleGetTransactions(1);
  }, [handleGetTransactions]);

  return (
    <div className="container">
      <Header />
      <BreadCrumb goBack={`/product/${id}`} />
      {isLoading && <Loading />}

      <div className="content">
        {transactions.map(transaction => (
          <TransactionItem transaction={transaction} key={transaction.id} />
        ))}

        <ContainerPaginator>
          <Paginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            previousLabel="<"
            previousLinkClassName="previous-label-paginator"
            nextLabel=">"
            nextLinkClassName="next-label-paginator"
            disabledClassName="disable-paginator"
            pageClassName="page-paginator"
            containerClassName="container-paginator"
            onPageChange={({ selected }) => {
              handleGetTransactions(selected + 1);
            }}
          />
        </ContainerPaginator>

        <div className="total">
          <h1>Total</h1>
          <div className="outcomes">
            <span>Saídas</span>
            <span>{totalIncomesAndOutcomes.outcomes}</span>
          </div>

          <div className="incomes">
            <span>Entradas</span>
            <span>{totalIncomesAndOutcomes.incomes}</span>
          </div>

          <div className="actual-quantity">
            <h2>Quantidade atual</h2>
            <span>
              {totalProducts}{' '}
              {totalProducts > 1
                ? `${transactions[0]?.product_id.unity}s`
                : transactions[0]?.product_id.unity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TransactionHistory };
