import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

export const Content = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 39% 1% 59%;
  padding: 8px;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;

  svg:first-child {
    margin-right: 16px;
    margin-bottom: 2px;
  }

  svg:last-child {
    margin-top: 4px;
  }

  input {
    border: none;
    outline: none;
    font-weight: normal;
    width: 280px;
    margin-right: 8px;
  }

  input::placeholder {
    color: #9e9e9e;
    font-weight: normal;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;

  section:first-child {
    margin-bottom: 8px;
  }

  section {
    display: flex;
    align-items: center;
    border: 1px solid #cfcfcf;
    border-radius: 10px;
    padding: 8px;
    width: 110px;
    cursor: pointer;
    transition: background-color 0.4s;

    img {
      margin-right: 8px;
      width: 26px;
    }

    span {
      font-size: 14px;
      font-weight: normal;
    }
  }

  section:hover {
    background-color: #e1ebf3;
  }

  section.selected {
    background-color: #e1ebf3;
    border: 1px solid var(--primary);
  }
`;

export const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: #e0e0e0;
  justify-self: center;
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 32px;

  div {
    display: flex;
    align-items: center;
  }

  div section {
    display: flex;
    align-items: center;
    img {
      margin-right: 8px;
    }

    input {
      border: none;
      outline: none;
      font-weight: normal;
      font-size: 14px;
      width: 90px;
    }

    input::placeholder {
      color: #9e9e9e;
      font-weight: normal;
    }

    svg {
      margin-left: 8px;
    }
  }

  section:last-child {
    margin-left: 40px;
  }
`;
