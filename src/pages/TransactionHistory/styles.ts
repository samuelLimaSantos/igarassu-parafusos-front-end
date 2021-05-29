import styled from 'styled-components';

export const ContainerPaginator = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 32px;
  outline: none;

  .page-paginator {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      width: 100%;
      height: 100%;
    }
  }

  .container-paginator {
    margin: 0 auto;
    max-width: 1300px;

    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;

    .selected {
      cursor: default;
      background-color: var(--primary);
      border-radius: 8px;
      color: #fff;
    }

    .previous-label-paginator,
    .next-label-paginator {
      cursor: pointer;
      outline: none;
      margin-right: 8px;
      margin-left: 8px;
    }

    .previous-label-paginator:hover,
    .next-label-paginator:hover {
      color: var(--primary);
    }
  }
`;
