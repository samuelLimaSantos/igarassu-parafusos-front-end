import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 32px;
`;

export const Content = styled.div`
  width: 50%;
  margin: 0 auto;
  max-width: 1300px;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    margin-left: 4px;
  }

  div.active {
    background-color: var(--primary);
    border-radius: 8px;
    color: #fff;
  }

  div.not-active {
    cursor: pointer;
    border-radius: 8px;
    transition: border 0.6s;
    transition: border color 0.6s;
  }

  div.not-active:hover {
    border: 1px solid var(--primary);
    color: var(--primary);
  }

  svg {
    cursor: pointer;
  }

  svg:hover {
    color: var(--primary);
  }
`;
