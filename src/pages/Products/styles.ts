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

export const Cards = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
`;
