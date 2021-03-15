import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 9999999999;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
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

export const Form = styled.form`
  background-color: #f4f3f3;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  width: 350px;

  fieldset {
    border: none;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-bottom: 40px;

      legend {
        color: #0e66a8;
        font-size: 24px;
      }

      legend::after {
        content: '';
        display: block;
        color: var(--primary);
        width: 60px;
        height: 4px;
        background-color: var(--primary);
        /* transform: rotate(45deg); */
      }

      svg {
        color: #f35757;
        cursor: pointer;
      }
    }

    .container-inputs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 8px;
      div {
        display: grid;
        label {
          font-weight: 300;
        }

        input {
          margin-top: 8px;
          height: 42px;

          width: 120px;
          padding: 8px;
          font-weight: normal;
          font-size: 14px;
          outline: none;
          border-radius: 8px;
          border: 1px solid #dedede;
          background-color: #fdfdfd;
        }

        input:focus-within {
          outline: 2px solid var(--primary);
          border-radius: 8px;
        }

        select {
          margin-top: 8px;
          height: 40px;
          width: 100%;
          padding: 8px;
          font-weight: normal;
          font-size: 14px;
          outline: none;
          border-radius: 8px;
          border: 1px solid #dedede;
          background-color: #fdfdfd;
        }

        select:focus-within {
          outline: 2px solid var(--primary);
          border-radius: 8px;
        }
      }
    }

    .container-button {
      display: flex;
      justify-content: center;
      margin-top: 32px;
      margin-bottom: 8px;

      button {
        width: 150px;
        height: 40px;
        border-radius: 8px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border: none;
        color: #fff;
        background-color: var(--primary);
        cursor: pointer;
        transition: opacity 0.6s;
      }

      button:hover {
        opacity: 0.8;
      }
    }
  }
`;
