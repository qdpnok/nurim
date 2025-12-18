import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primitives-color-brand-50: rgba(248, 247, 251, 1);
    --primitives-color-grey-50: rgba(255, 255, 255, 1);
    --primitives-color-grey-500: rgba(95, 105, 128, 1);
    --primitives-color-grey-800: rgba(46, 47, 51, 1);
    --primitives-radius-3xl: 300px;
    --primitives-radius-3xl-duplicate: 300px;
    --primitives-radius-sm: 6px;
    --primitives-spacing-1: 8px;
    --primitives-spacing-10: 80px;
    --primitives-spacing-12: 96px;
    --primitives-spacing-3: 24px;
    --primitives-spacing-4: 32px;
    --primitives-spacing-6: 48px;
    --primitives-spacing-8: 64px;
    --tokens-background-primary: var(--primitives-color-grey-50);
    --tokens-buttons-secondary: var(--primitives-color-brand-50);
    --tokens-radius-radius-full: var(--primitives-radius-3xl);
    --tokens-radius-radius-fully-rounded: var(--primitives-radius-3xl-duplicate);
    --tokens-radius-radius-minimal: var(--primitives-radius-sm);
    --tokens-spacing-spacing-2xl: var(--primitives-spacing-8);
    --tokens-spacing-spacing-3xl: var(--primitives-spacing-10);
    --tokens-spacing-spacing-lg: var(--primitives-spacing-4);
    --tokens-spacing-spacing-md: var(--primitives-spacing-3);
    --tokens-spacing-spacing-sm: var(--primitives-spacing-1);
    --tokens-spacing-spacing-xl: var(--primitives-spacing-6);
    --tokens-text-body-sub: var(--primitives-color-grey-500);
    --tokens-text-heading-main: var(--primitives-color-grey-800);
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button,
  input,
  select,
  textarea {
    appearance: none;
    background: transparent;
    border: 0;
    outline: none;
  }

  /* Reset for layout */
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;
