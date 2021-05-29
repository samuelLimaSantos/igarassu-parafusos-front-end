import { TransactionsData } from '../../pages/TransactionHistory';
import { parseImage } from '../../utils/parseImage';

type TransactionProps = {
  transaction: TransactionsData;
};

const TransactionItem: React.FC<TransactionProps> = ({
  transaction,
}: TransactionProps) => {
  const image = parseImage(transaction.product_id.image_id);

  return (
    <section className="item">
      <img src={image} alt="" />
      <div className="name">
        <h1>
          {transaction.product_id.cod} {transaction.product_id.name}
        </h1>
      </div>

      <div className="historic">
        <span>Alteração feita por {transaction.user_id.login}</span>
        <span>em {transaction.created_at}</span>
      </div>

      <div className="type">
        <span>{transaction.transaction_type}</span>
        <span>
          {transaction.quantity} {transaction.product_id.unity}
        </span>
      </div>
    </section>
  );
};

export { TransactionItem };
