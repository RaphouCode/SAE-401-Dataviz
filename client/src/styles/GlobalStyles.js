import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    bg: '#f4f7f9',
    bgCard: '#ffffff',
    bgCardHover: '#f9fafb',
    border: '#e2e8f0',
    primary: '#0039a2',
    secondary: '#e9a2ef',
    tertiary: '#f2bde7',
    accent: '#0039a2', // Bleu pour les badges, etc.
    accentLight: '#173672', // Bleu plus foncé
    accentGlow: 'rgba(0, 57, 162, 0.1)',
    text: '#0c2e57',
    textMuted: '#64748b',
    textDim: '#4b5563',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    surface: '#ffffff',
    navy: '#0c2e57', // Bleu très sombre
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '12px',
    xl: '20px',
  },
  shadow: {
    card: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
    glow: '0 0 15px rgba(0, 51, 102, 0.1)',
    header: '0 2px 4px rgba(0,0,0,0.02)',
  },
};

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input {
    font-family: inherit;
    outline: none;
    border: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
