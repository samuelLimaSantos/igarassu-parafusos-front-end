import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Content = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const LeftSide = styled.section`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 85%;
  background-color: var(--background);

  header {
    max-width: 700px;
    margin: 0 auto;
    width: 80%;
  }

  & > img {
    justify-self: center;
    align-self: center;
    width: 480px;
  }
`;

export const RightSide = styled.section`
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px 0 0 40px;

  form {
    max-width: 400px;
    margin: 0 auto;
    width: 90%;

    fieldset {
      border: none;

      legend {
        text-align: center;
        margin-bottom: 64px;
        font-size: 32px;
        color: var(--primary);
      }

      section {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;

        label {
          margin-bottom: 8px;
          color: var(--primary);
          font-size: 16px;
        }
        span {
          display: flex;
          align-items: center;
          border-radius: 8px;
          border: 1px solid #dedede;
          background-color: #fdfdfd;

          input {
            border-radius: 8px;

            height: 42px;
            width: 90%;
            padding: 8px;
            font-weight: normal;
            font-size: 14px;
            border: none;
            outline: none;
          }

          svg {
            margin-left: 4px;
          }
        }

        span:focus-within {
          outline: 2px solid var(--primary);
          border-radius: 8px;
        }
      }

      article {
        display: flex;
        justify-content: center;
        margin-top: 48px;

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

        button:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;
