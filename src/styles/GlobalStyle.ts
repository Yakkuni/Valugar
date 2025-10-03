import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #2563eb;
    --primary-light: #3b82f6;
    --primary-dark: #1d4ed8;
    --secondary-color: #059669;
    --text-color: #1e293b;
    --text-light: #64748b;
    --background-color: #ffffff;
    --background-alt: #f8fafc;
    --border-color: #e2e8f0;
    --error-color: #ef4444;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
    --border-radius-sm: 0.25rem;
    --border-radius-md: 0.375rem;
    --border-radius-lg: 0.5rem;
    --border-radius-xl: 0.75rem;
  }

  [data-theme="dark"] {
    --primary-color: #3b82f6;
    --primary-light: #60a5fa;
    --primary-dark: #2563eb;
    --secondary-color: #10b981;
    --text-color: #f1f5f9;
    --text-light: #cbd5e1;
    --background-color: #0f172a;
    --background-alt: #1e293b;
    --border-color: #334155;
    --error-color: #f87171;
    --success-color: #34d399;
    --warning-color: #fbbf24;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.5;
    transition: background-color 0.3s, color 0.3s;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.2s;
  }

  a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.25rem;
  }

  h2 {
    font-size: 1.875rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  p {
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
  }

  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (min-width: 640px) {
    .container {
      padding: 0 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding: 0 2rem;
    }
  }
`;