import { createTheme } from '@vanilla-extract/css';
import { vars } from 'form0-react/theme.css.js';

export const myCustomTheme = createTheme(vars, {
  color: {
    background: '#f0f0f0',
    foreground: '#222',
    border: '#ff0000', // Red border!
    primary: '#0070f3',
    error: '#e00',
    section: '#fff',
    sectionBorder: '#ccc',
    sectionHeader: '#0070f3',
    buttonBg: '#ff007a', // vivid pink
    buttonFg: '#fff',
    buttonBorder: '#ff007a',
    buttonHoverBg: '#d6006b',
    buttonHoverFg: '#fff',
    buttonHoverBorder: '#d6006b',
    drilldownButtonBg: '#00c2ff', // vivid cyan
    drilldownButtonFg: '#fff',
    backButtonBg: '#ffe600', // vivid yellow
    backButtonFg: '#111',
  },
  borderRadius: '16px',
  fontSize: {
    base: '1.1rem',
    label: '1.1rem',
    section: '1.25rem',
  },
  spacing: {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
  },
});