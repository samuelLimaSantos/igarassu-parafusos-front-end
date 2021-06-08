import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 9999999999;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
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
  background-color: #f4f3f3;
  padding: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  /* width: 50%; */
  min-width: 400px;
  min-height: 200px;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;

  max-height: 600px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    svg {
      color: var(--danger);
      cursor: pointer;
    }
  }

  .main {
    font-weight: normal;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 150px;
      height: 40px;
      border-radius: 8px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border: 1px solid #0e66a8;
      color: #fff;
      background-color: var(--primary);
      cursor: pointer;
      transition: opacity 0.6s;
    }
  }
`;
