import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --dark-primary: rgba(14, 1, 50, 1);
    --light-primary: rgb(255, 253, 237);
    --light-secondary: bisque;
    --positive: green;
    --negative: red;

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

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    padding: 15px 25px;
    background-color: var(--light-secondary);
    color: var(--text-invert);
    border-radius: 100px;

    &[disabled] {
      opacity: 0.7;
    }
  }
`;

export default GlobalStyles;
