import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Content = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

export const Advisor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  max-width: 1100px;
  background-color: #f1f1f1;
  border-radius: 8px;
  height: 60px;
  margin-top: 16px;
  margin-bottom: 30px;
`;

export const Cards = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
`;
