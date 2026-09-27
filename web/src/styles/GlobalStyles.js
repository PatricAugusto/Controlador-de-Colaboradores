import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  body {
    background-color: #0f172a;
    color: #f8fafc;
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }
`;