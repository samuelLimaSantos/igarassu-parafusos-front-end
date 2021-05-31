import styled from 'styled-components';

export const Item = styled.section`
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

  &:first-child {
    margin-top: 32px;
  }

  .image-name {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      margin-right: 8px;
    }

    h1 {
      max-width: 400px;
      font-size: 22px;
    }
  }

  .historic {
    display: flex;
    flex-direction: column;
    max-width: 350px;

    span {
      font-size: 16px;
      font-weight: normal;
      text-align: center;
    }

    span:first-child {
      margin-bottom: 8px;
    }
  }

  .type {
    max-width: 150px;
    text-align: end;

    h3.income {
      color: #1e9400;
    }

    h3.outcome {
      color: #d40707;
    }

    span {
      font-weight: normal;
      font-size: 16px;
    }
  }
`;
