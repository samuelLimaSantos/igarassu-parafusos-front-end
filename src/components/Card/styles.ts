import styled from 'styled-components';

export const Container = styled.div`
  height: 208px;
  box-shadow: 1px 4px 6px 1px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr;
`;

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .block {
    display: flex;
    align-items: center;
    img {
      width: 70px;
      border-radius: 50%;
      margin-right: 16px;
    }

    h1 {
      font-size: 20px;
      width: 280px;
    }
  }

  .price {
    display: flex;
    flex-direction: column;
    font-size: 14px;

    span {
      font-weight: 300;
    }
  }
`;

export const Description = styled.section`
  margin-bottom: 16px;

  p {
    width: 80%;
    font-weight: 300;
    font-size: 14px;
  }
`;

export const Footer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 510px;

  .mini-cards {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    width: 330px;

    p {
      height: 40px;
      width: 105px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #504848;
    }
  }

  button {
    border-radius: 50px;
    background-color: var(--primary);
    color: #fff;
    height: 40px;
    border: none;
    width: 160px;
    cursor: pointer;
    font-size: 16px;
    transition: opacity 0.6s;
  }

  button:hover {
    opacity: 0.8;
  }
`;
