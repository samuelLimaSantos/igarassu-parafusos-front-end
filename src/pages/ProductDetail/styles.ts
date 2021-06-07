import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Content = styled.div`
  width: 75%;
  max-width: 1300px;
  margin: 32px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  padding: 16px;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;

    .name-icon {
      display: flex;
      align-items: center;
      img {
        width: 150px;
        margin-right: 16px;
        border: 6px solid var(--primary);
        border-radius: 50%;
      }
    }

    .menu-container {
      margin-top: 16px;
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
        background-color: #fff;
        font-size: 14px;
      }
    }
  }

  .description-block {
    margin-bottom: 32px;
    label {
      /* color: var(--primary); */
    }

    p {
      margin-top: 16px;
      font-weight: normal;
      font-size: 14px;
      text-justify: auto;
    }
  }

  .info-block {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 32px;
    margin-bottom: 32px;

    .unit {
      display: flex;
      flex-direction: column;

      label {
        /* color: var(--primary); */
      }

      span {
        margin-top: 8px;
        font-weight: normal;
        font-size: 14px;
      }
    }
  }

  .date {
    margin-bottom: 8px;
    label {
      color: var(--primary);
    }

    span {
      font-weight: normal;
      font-size: 14px;
    }
  }
`;

export const UpdateInventoryContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;

  .block {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 8px;
    }

    input {
      width: 100px;
      border-radius: 8px;
      border: 1px solid var(--primary);
      height: 42px;
      padding: 8px;
      font-weight: normal;
      font-size: 14px;
      outline: none;
    }

    select {
      width: 200px;
      border-radius: 8px;
      height: 42px;
      padding: 8px;
      font-weight: normal;
      font-size: 14px;
      border: none;
      outline: none;
      background-color: #fff;
      border: 1px solid var(--primary);
    }
  }
`;
