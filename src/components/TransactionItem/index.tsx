import { TransactionsData } from '../../pages/TransactionHistory';
import { parseImage } from '../../utils/parseImage';
import { Item } from './styles';

type TransactionProps = {
  transaction: TransactionsData;
};

const TransactionItem: React.FC<TransactionProps> = ({
  transaction,
}: TransactionProps) => {
  const image = parseImage(transaction.product_id.image_id);

  return (
    <Item>
      <div className="image-name">
        <img src={image} alt="ícone do produto" />
        <h1>
          {transaction.product_id.cod} {transaction.product_id.name}
        </h1>
      </div>

      <div className="historic">
        <span>
          Alteração feita por <strong>{transaction.user_id.login},</strong>
        </span>
        <span>em {transaction.created_at}</span>
      </div>

      <div className="type">
        <h3 className={transaction.transaction_type}>
          {transaction.transaction_type === 'income' ? 'Entrada' : 'Saída'}
        </h3>
        <span>
          <strong>{transaction.quantity} </strong>
          {transaction.quantity > 1
            ? `${transaction.product_id.unity}s`
            : transaction.product_id.unity}
        </span>
      </div>
    </Item>
  );
};

export { TransactionItem };
