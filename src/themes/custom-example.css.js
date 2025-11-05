/**
 * Custom Theme Example for form0
 *
 * This file demonstrates how to create a custom theme for form0 forms
 * using vanilla-extract. Custom themes override the default form0-react
 * styling with your own design tokens.
 *
 * To use this theme:
 * 1. Set `customTheme: './src/themes/custom-example.css.js'` in form0.config.js
 * 2. Uncomment the import in Form0Form.jsx to load this theme
 * 3. Pass the theme object to FormRenderer's `theme` prop
 *
 * Note: This is completely optional. form0-react has sensible defaults
 * that work well with most applications. Only create a custom theme if
 * you need to match specific brand guidelines or design requirements.
 */

import { createTheme } from '@vanilla-extract/css';
import { vars } from 'form0-react/theme.css.js';

export const myCustomTheme = createTheme(vars, {
  color: {
    background: '#f0f0f0',
    foreground: '#222',
    border: '#ff0000', // Red border for demonstration
    primary: '#0070f3',
    error: '#e00',
    section: '#fff',
    sectionBorder: '#ccc',
    sectionHeader: '#0070f3',
    buttonBg: '#ff007a', // Vivid pink
    buttonFg: '#fff',
    buttonBorder: '#ff007a',
    buttonHoverBg: '#d6006b',
    buttonHoverFg: '#fff',
    buttonHoverBorder: '#d6006b',
    drilldownButtonBg: '#00c2ff', // Vivid cyan
    drilldownButtonFg: '#fff',
    backButtonBg: '#ffe600', // Vivid yellow
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

