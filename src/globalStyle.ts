import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    --primary: #0E66A8;
    --secondary-details: #FAB10A;
    --dark: #13324E;
    --light: #EDF1F6;
    --danger: #D40707;
    --confirm: #00B564;
    --background: #F9F9F9;
  }
  html,
  body,
  #root {
    height: 100vh;
  }
  body {
    color: var(--dark);
    background: var(--background);
  }
  body, input, button, textarea {
    font: 600 18px 'Roboto', sans-serif;
  }

`;
