import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    bg: '#ffffff',
    bgCard: '#ffffff',
    bgCardHover: '#f9fafb',
    border: '#e5e7eb',
    accent: '#003366',
    accentLight: '#0066cc',
    accentGlow: 'rgba(0, 51, 102, 0.05)',
    text: '#1a1a1a',
    textMuted: '#6b7280',
    textDim: '#4b5563',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    surface: '#f3f4f6',
    navy: '#0b1a32',
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
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

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
    overflow-x: hidden;
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
