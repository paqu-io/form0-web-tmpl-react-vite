import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/form0-overrides.css';
import App from './App.jsx';
import 'form0-react/index.css';
import form0Config from '../form0.config.js';

// Apply global CSS custom properties from config to root element
// These serve as defaults but can be overridden per-component
const root = document.getElementById('root');
if (root && form0Config.layout) {
  // Note: form0-react's FieldRenderer uses --label-width (not --form0-label-width)
  // for label sizing when labelPosition is 'side'
  if (form0Config.layout.labelWidthPercent !== undefined) {
    root.style.setProperty('--label-width', `${form0Config.layout.labelWidthPercent}%`);
  }
  if (form0Config.layout.formWidth !== undefined) {
    root.style.setProperty('--form0-form-width', form0Config.layout.formWidth);
  }
  if (form0Config.layout.labelPosition !== undefined) {
    root.style.setProperty('--form0-label-position', form0Config.layout.labelPosition);
  }
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
