import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --dark-primary: rgba(14, 1, 50, 1);
    --light-primary: rgb(255, 253, 237);
    --pink: #ff37bf;
    --light-secondary: bisque;
    --positive: #55e878;
    --negative: #f23434;

    --text-primary: var(--light-primary);
    --text-invert: var(--dark-primary);
    --text-accent: var(--pink);

    --input-height: 50px;
    --max-content-width: 600px;

    --border-primary: 2px solid var(--light-secondary);
  }

  body {
    font-size: 20px;
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

  strong {
    color: var(--text-accent);
  }
`;

export default GlobalStyles;
