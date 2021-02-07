import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Content = styled.div`
  &.error {
    background-color: var(--danger);
  }

  &.success {
    background-color: var(--confirm);
  }

  min-width: 350px;
  min-height: 40px;
  border-radius: 10px;
  animation: fadein 0.4s ease-in;
  /* border-bottom: 8px solid #F29292; */
  div {
    display: flex;
    align-items: center;
    padding: 8px;
    margin-bottom: 8px;
    & > svg {
      margin-right: 16px;
    }
  }

  h4 {
    color: #fff;
    font-size: 18px;
    font-weight: normal;
    max-width: 300px;
  }

  @-webkit-keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }
`;

export const Bar = styled.section`
  height: 8px;
  margin-top: -10px;
  border-radius: 10px;
  width: 100%;
  animation: progressbar 4s ease-in;

  @-webkit-keyframes progressbar {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  @keyframes progressbar {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  &.success {
    background-color: #cbeec2;
  }

  &.error {
    background-color: #f29292;
  }
`;
