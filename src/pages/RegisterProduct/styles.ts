import styled from 'styled-components';

export const Content = styled.div`
  max-width: 1200px;
  margin: 16px auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  background-color: #fff;
`;

export const Form = styled.form`
  padding: 32px;

  fieldset {
    border: none;

    legend {
      color: var(--primary);
      font-size: 30px;
      margin-bottom: 48px;
    }
  }
`;

export const FirstStep = styled.div`
  h3 {
    text-align: center;
    margin-bottom: 48px;
  }

  section {
    display: grid;
    justify-content: center;

    & > .container-input {
      margin-bottom: 32px;
    }

    .container-input {
      width: 700px;
      display: grid;

      label {
        font-weight: 300;
      }

      input {
        margin-top: 8px;
        height: 42px;

        width: 100%;
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

      .container-images {
        width: 500px;
        margin: 32px auto 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        justify-items: center;
        align-content: center;
        row-gap: 16px;
        img {
          width: 100px;
          cursor: pointer;
          border-radius: 50%;
        }

        img.image-selected {
          border: 5px solid var(--primary);
        }
      }
    }
  }
`;

export const SecondStep = styled.div`
  h3 {
    text-align: center;
    margin-bottom: 48px;
  }

  section {
    display: grid;
    justify-content: center;

    & > .container-input {
      margin-bottom: 32px;
    }

    .container-input {
      width: 700px;
      display: grid;

      label {
        font-weight: 300;
      }

      textarea {
        margin-top: 8px;
        height: 200px;
        width: 100%;
        padding: 8px;
        font-weight: normal;
        font-size: 14px;
        outline: none;
        border-radius: 8px;
        border: 1px solid #dedede;
        background-color: #fdfdfd;
        resize: none;
      }

      textarea:focus-within {
        outline: 2px solid var(--primary);
        border-radius: 8px;
      }
    }
  }
`;

export const ThirdStep = styled.div`
  h3 {
    text-align: center;
    margin-bottom: 48px;
  }

  section {
    display: grid;
    justify-content: center;

    & > .container-input {
      margin-bottom: 32px;
    }

    .container-input {
      width: 700px;
      display: grid;

      label {
        font-weight: 300;
      }

      p {
        font-weight: 200;
        font-size: 13px;
        opacity: 0.5;
        margin-top: 2px;
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

      .new-category-container {
        margin-top: 32px;

        article {
          width: 700px;
          justify-self: flex-start;

          label {
            font-weight: 300;
          }

          input {
            margin-top: 8px;
            height: 42px;

            width: 100%;
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
        }
      }
    }
  }
`;

export const FourthStep = styled.div`
  h3 {
    text-align: center;
    margin-bottom: 48px;
  }
  .container-input {
    display: grid;

    label {
      font-weight: 300;
    }

    input,
    select {
      margin-top: 8px;
      height: 42px;
      width: 200px;
      padding: 8px;
      font-weight: normal;
      font-size: 14px;
      outline: none;
      border-radius: 8px;
      border: 1px solid #dedede;
      background-color: #fdfdfd;
      resize: none;
    }

    input:focus-within,
    select:focus-within {
      outline: 2px solid var(--primary);
      border-radius: 8px;
    }
  }

  section.triple-grid {
    display: grid;
    justify-items: center;

    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 36px;
    /* & > .container-input {
      margin-bottom: 32px;
    } */
  }

  section.double-grid {
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 auto;
  }

  .container-button {
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;

    button {
      width: 250px;
      height: 40px;
      border-radius: 8px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border: none;
      color: #fff;
      background-color: var(--secondary-details);
      cursor: pointer;
      transition: opacity 0.6s;
    }

    button:hover {
      opacity: 0.8;
    }

    button:disabled,
    button[disabled] {
      background-color: #cccccc;
      color: #666666;
      cursor: default;
      opacity: 0.5;
    }
  }
`;

export const FinalStep = styled.div`
  h3 {
    text-align: center;
    margin-bottom: 48px;
  }

  .container-image {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 250px;
    }
  }
`;

export const ContainerPaginator = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 32px;
  outline: none;

  .page-paginator {
    display: none;
    cursor: pointer;
  }

  .container-paginator {
    margin: 0 auto;
    width: 400px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    .next,
    .previous {
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        width: 100%;
        height: 100%;
      }
      list-style: none;
      width: 150px;
      height: 40px;
      cursor: pointer;
      background-color: var(--primary);
      border-radius: 8px;
      color: #fff;
    }

    .disable-paginator {
      display: none;
      /* cursor: default !important; */
      /* opacity: 0.3; */
    }
  }
`;
