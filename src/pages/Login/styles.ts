import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background-color: #fff;
`;

export const Content = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const LeftSide = styled.section`
  max-width: 700px;

  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 85%;
  background-color: var(--background);
  img {
    justify-self: center;
    align-self: center;
  }
`;

export const RightSide = styled.section`
  height: 100vh;
  background-color: #fff;
`;
