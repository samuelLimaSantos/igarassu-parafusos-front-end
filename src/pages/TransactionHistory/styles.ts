import styled from 'styled-components';

export const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;

  .menu-container {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    svg {
      color: var(--primary);
      cursor: pointer;
    }

    a {
      text-decoration: none;
      color: var(--dark);
    }

    .button-menu {
      border: none;
      background-color: var(--background);
      font-size: 14px;
      margin-right: 8px;
    }

    .cancel-filter-date {
      background-color: var(--danger);
      padding: 2px;
      border-radius: 8px;

      svg {
        color: #fff;
      }
    }
  }
`;

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

export const Total = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  margin-top: 16px;
  margin-bottom: 16px;

  h1 {
    font-size: 24px;
  }

  .outcomes,
  .incomes {
    display: flex;
    flex-direction: column;
    text-align: end;

    span:nth-child(2) {
      font-weight: normal;
      font-size: 16px;
    }
  }

  .outcomes {
    span:first-child {
      color: #d40707;
    }
  }

  .incomes {
    span:first-child {
      color: #1e9400;
    }
  }

  .actual-quantity {
    text-align: end;
    span {
      font-size: 16px;
      font-weight: normal;
    }
  }
`;
