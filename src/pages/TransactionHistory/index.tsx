import { useState, useEffect, useContext, useCallback } from 'react';
import Paginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import { DateRange, OnChangeProps, Range } from 'react-date-range';
import { ptBR } from 'date-fns/esm/locale';
import { BreadCrumb } from '../../components/BreadCrumb';
import api from '../../services/api';
import Header from '../../components/Header';
import { Context } from '../../context';
import Loading from '../../components/Loading';
import { TransactionItem } from '../../components/TransactionItem';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ContainerPaginator, Content, Total } from './styles';

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

type IDate = {
  startDate: Date;
  endDate: Date;
};

type IDateOnChange = {
  date: IDate;
};

type IGetTransaction = {
  page: number;
  date?: IDate;
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { setToastInfo } = useContext(Context);

  const selectionRange: Range = {
    startDate,
    endDate,
    key: 'date',
    color: '#0E66A8',
  };

  const handleGetTransactions = useCallback(
    async ({ page, date }: IGetTransaction) => {
      if (date) console.log(date.startDate, date.endDate);
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

  const onChangeRange = (ranges: OnChangeProps) => {
    const { date } = ranges as IDateOnChange;
    const { startDate, endDate } = date;
    setStartDate(startDate);
    setEndDate(endDate);
    handleGetTransactions({ page: 1, date: { endDate, startDate } });
  };

  useEffect(() => {
    handleGetTransactions({ page: 1 });
  }, [handleGetTransactions]);

  return (
    <div className="container">
      <Header />
      <BreadCrumb goBack={`/product/${id}`} />
      {isLoading && <Loading />}

      <Content>
        <DateRange
          ranges={[selectionRange]}
          onChange={onChangeRange}
          locale={ptBR}
          maxDate={new Date()}
        />

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
              handleGetTransactions({ page: selected + 1 });
            }}
          />
        </ContainerPaginator>

        <Total>
          <h1>Total</h1>
          <div className="outcomes">
            <span>Saídas</span>
            <span>
              <strong>{totalIncomesAndOutcomes.outcomes} </strong>
              {totalProducts > 1
                ? `${transactions[0]?.product_id.unity}s`
                : transactions[0]?.product_id.unity}
            </span>
          </div>

          <div className="incomes">
            <span>Entradas</span>
            <span>
              <strong>{totalIncomesAndOutcomes.incomes} </strong>
              {totalProducts > 1
                ? `${transactions[0]?.product_id.unity}s`
                : transactions[0]?.product_id.unity}
            </span>
          </div>

          <div className="actual-quantity">
            <h1>Quantidade atual</h1>
            <span>
              {totalProducts}{' '}
              {totalProducts > 1
                ? `${transactions[0]?.product_id.unity}s`
                : transactions[0]?.product_id.unity}
            </span>
          </div>
        </Total>
        <div className="space-bottom" />
      </Content>
    </div>
  );
};

export { TransactionHistory };
