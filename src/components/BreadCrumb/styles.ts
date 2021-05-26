import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;

  font-size: 24px;
  margin-top: 24px;

  a {
    color: var(--dark);
    text-decoration: none;
    width: 100px;
  }

  span {
    a {
      width: 100px;
      display: flex;
      align-items: center;
      cursor: pointer;
      svg {
        margin-right: 6px;
      }

      transition: color 0.1s;
    }
  }

  span:hover {
    color: var(--primary);

    svg {
      color: var(--primary);
    }
  }
`;
