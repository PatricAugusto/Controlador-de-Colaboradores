import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg-main: #060608;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --text-muted: #52525b;
    
    /* Glassmorphism Variables */
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-bg-hover: rgba(255, 255, 255, 0.06);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-border-focus: rgba(255, 255, 255, 0.2);
    --glass-blur: blur(16px);
    
    /* Depth Shadows */
    --shadow-deep: 0 20px 50px rgba(0, 0, 0, 0.6);
    --shadow-glow: 0 0 25px rgba(255, 255, 255, 0.05);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  body {
    background-color: var(--bg-main);
    background-image: 
      radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 70%),
      radial-gradient(circle at 80% 100%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
    background-attachment: fixed;
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Custom Scrollbar imersiva */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #060608;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;