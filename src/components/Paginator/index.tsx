/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IPaginatorDTO } from '../../interfaces';
import { Container, Content } from './styles';

const Paginator: React.FC<IPaginatorDTO> = ({
  numberOfPages,
  actualPage,
  changePage,
}: IPaginatorDTO) => {
  return (
    <Container>
      <Content>
        <FiChevronLeft
          size={20}
          onClick={() => {
            actualPage > 1 && changePage(actualPage - 1);
          }}
        />
        {new Array(numberOfPages).fill(1).map((page, index) => (
          <div
            className={index + 1 === actualPage ? 'active' : 'not-active'}
            key={`block-${index}`}
            onClick={() => {
              actualPage !== index + 1 && changePage(index + 1);
            }}
          >
            <span>{index + 1}</span>
          </div>
        ))}
        <FiChevronRight
          size={20}
          onClick={() => {
            actualPage < numberOfPages && changePage(actualPage + 1);
          }}
        />
      </Content>
      <div style={{ marginTop: '32px', width: '5px', height: '5px' }} />
    </Container>
  );
};

export { Paginator };
