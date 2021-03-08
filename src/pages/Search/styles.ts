import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Content = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

export const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  max-width: 1300px;
  margin-top: 40px;
  margin-bottom: 32px;
  a {
    text-decoration: none;
    color: var(--dark);
  }
`;

export const NewProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  max-width: 1100px;
  background-color: #e4e4e4;
  border-radius: 8px;
  height: 60px;
  transition: background-color 1s;
  transition: color background-color 1s;
  align-self: flex-end;

  cursor: pointer;

  &:hover {
    background-color: var(--primary);
    color: #f1f1f1;
  }
`;

export const Advisor = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  font-weight: 500;
  font-size: 18px;
  align-self: flex-end;
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

export const BreadCrumb = styled.div`
  margin: 0 auto;
  max-width: 1200px;

  font-size: 24px;
  margin-top: 24px;

  a {
    color: var(--dark);
    text-decoration: none;
  }

  span {
    width: 100px;
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      margin-right: 6px;
    }

    transition: color 0.1s;
  }

  span:hover {
    color: var(--primary);
  }
`;
