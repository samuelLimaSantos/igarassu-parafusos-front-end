import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 9999999999;
  background-color: rgba(0, 0, 0, 0.899);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    color: var(--light);
  }
`;

export const LoadingElement = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 7px solid var(--light);
  border-bottom: 7px solid var(--primary);
  margin-bottom: 32px;
  animation: loading 1s ease-in infinite;
  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }
`;
