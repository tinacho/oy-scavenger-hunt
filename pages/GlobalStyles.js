import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --dark-primary: rgba(14, 1, 50, 1);
    --light-primary: rgb(255, 253, 237);
    --light-secondary: bisque;
    --text-primary: var(--light-primary);
    --text-invert: var(--dark-primary);
  }

  body {
    min-height: 100vh;
    color: var(--text-primary);
    background: linear-gradient(
      156deg,
      rgba(14, 1, 50, 1) 0%,
      rgba(39, 41, 109, 1) 49%,
      rgba(103, 12, 212, 1) 91%,
      rgba(130, 0, 255, 1) 100%
    );
  }
`;

export default GlobalStyles;
