# form0 Vite Template

A production-ready Vite + React template for building forms with [form0-react](https://github.com/paqu-io/form0-react). This template demonstrates best practices for integrating form0 into a React application with custom styling, field renderers, and centralized configuration.

## Features

- ⚡️ **Vite** - Lightning-fast development with Hot Module Replacement (HMR)
- ⚛️ **React 19** - Latest React with concurrent features
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom configuration
- 🎭 **shadcn/ui** - High-quality, accessible UI components
- 📝 **form0-react** - Powerful form engine with schema-driven forms
- 🔧 **Centralized Configuration** - Single config file for all form0 settings
- 🎨 **Custom Field Renderers** - Production-ready shadcn-based field components
- 🌗 **Dark Mode Ready** - Built-in light/dark theme support
- 📦 **Clean Architecture** - Organized file structure with clear separation of concerns

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Configuration

### form0.config.js

This template uses a centralized configuration file (`form0.config.js` in the project root) to manage all form0-related settings. This provides a single source of truth and makes it easy to customize form behavior across your application.

```javascript
export default {
  // Layout settings
  layout: {
    labelPosition: 'side',      // 'side' | 'top'
    labelWidthPercent: 30,       // 0-100
    formWidth: '70vw',           // Any valid CSS width
  },

  // Theme settings
  theme: {
    mode: 'light',               // 'light' | 'dark' | 'system'
    customTheme: null,           // Path to custom theme or null
  },

  // Schema location
  schemas: {
    directory: './src',          // Where form schemas are stored
  },

  // Field renderer overrides
  fieldRenderers: {
    DateField: 'date-field-shadcn',
    // Add more custom renderers here
  },

  // Output format
  output: {
    useKeys: false,              // Use keys instead of data_names
  },
};
```

### Configuration Options

#### Layout

- **`labelPosition`**: Controls label placement relative to inputs
  - `'side'`: Labels appear to the left (horizontal layout)
  - `'top'`: Labels appear above (vertical layout)

- **`labelWidthPercent`**: Width percentage for labels when positioned on the side (0-100)

- **`formWidth`**: Default width for form containers (any valid CSS width value)

#### Theme

- **`mode`**: Color scheme for forms
  - `'light'`: Always use light theme
  - `'dark'`: Always use dark theme
  - `'system'`: Follow system preference (requires implementation)

- **`customTheme`**: Path to a custom vanilla-extract theme file
  - Set to `null` to use form0-react's default theme
  - Example: `'./src/themes/custom-example.css.js'`

#### Field Renderers

Map field types to custom implementations. Keys are field type names from form0-core (e.g., `DateField`, `TextField`), and values are renderer identifiers defined in `src/field-renderers/resolver.js`.

#### Output

- **`useKeys`**: When `true`, uses schema keys instead of `data_name` values in form output

## Project Structure

```
form0-test1/
├── form0.config.js                 # Central configuration
├── src/
│   ├── components/
│   │   ├── Form0Form.jsx          # Main form wrapper component
│   │   ├── FormModal.jsx          # Modal form variant
│   │   ├── FormSpotlight.jsx      # Drawer/spotlight form variant
│   │   └── ui/                    # shadcn UI components
│   ├── field-renderers/
│   │   ├── resolver.js            # Maps config strings to components
│   │   ├── date-field.jsx         # Basic date field renderer
│   │   ├── date-field-shadcn.jsx  # Enhanced shadcn date field
│   │   └── index.js               # Exports all renderers
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   └── FormPage.jsx           # Form display page
│   ├── styles/
│   │   └── form0-overrides.css    # Custom form0 styling
│   ├── themes/
│   │   └── custom-example.css.js  # Example custom theme
│   ├── form.schema.js             # Sample form schema
│   ├── index.css                  # Global app styles + Tailwind
│   ├── App.css                    # App-specific styles
│   └── main.jsx                   # App entry point
```

## Customization

### Adding Custom Field Renderers

1. **Create your renderer component** in `src/field-renderers/`:

```jsx
// src/field-renderers/my-custom-field.jsx
export function MyCustomField({ field, value, onChange, readOnly, inputProps }) {
  return (
    <input
      {...inputProps}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={readOnly}
      placeholder={field.label}
    />
  );
}
```

2. **Register it in the resolver** (`src/field-renderers/resolver.js`):

```javascript
import { MyCustomField } from './my-custom-field.jsx';

const RENDERER_MAP = {
  'my-custom-field': MyCustomField,
  // ... other renderers
};
```

3. **Configure it** in `form0.config.js`:

```javascript
fieldRenderers: {
  TextField: 'my-custom-field',
}
```

### Creating Custom Themes

Custom themes allow you to completely override form0's default styling to match your brand.

1. **Create a theme file** in `src/themes/`:

```javascript
// src/themes/my-brand-theme.css.js
import { createTheme } from '@vanilla-extract/css';
import { vars } from 'form0-react/theme.css.js';

export const myBrandTheme = createTheme(vars, {
  color: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#0066cc',
    // ... more color tokens
  },
  borderRadius: '8px',
  fontSize: {
    base: '1rem',
    label: '0.875rem',
    section: '1.25rem',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
});
```

2. **Configure it** in `form0.config.js`:

```javascript
theme: {
  mode: 'light',
  customTheme: './src/themes/my-brand-theme.css.js',
}
```

See `src/themes/custom-example.css.js` for a complete example.

### Styling form0 Components

form0 components can be styled in multiple ways:

1. **CSS Custom Properties** - Override design tokens in `src/styles/form0-overrides.css`:

```css
:root {
  --form0-accent: 210 100% 56%;
  --form0-field-border: 214 16% 86%;
  /* ... more tokens */
}
```

2. **Component Classes** - Override specific component styles:

```css
.form0-field {
  border-radius: 12px;
  padding: 1rem;
}
```

3. **vanilla-extract Themes** - For comprehensive theming, create a custom theme (see above)

### Per-Component Layout Overrides

While `form0.config.js` sets global defaults, you can override layout settings per component:

```jsx
<Form0Form
  labelPosition="top"
  labelWidthPercent={40}
  formWidth="500px"
/>
```

This is useful for modals, drawers, or special form contexts.

## CSS Architecture

This template separates styling concerns:

- **`index.css`**: Tailwind imports, shadcn design tokens, global app styles
- **`App.css`**: Application-specific layout and structure
- **`styles/form0-overrides.css`**: Custom styling for form0 components only
- **`themes/`**: Optional custom vanilla-extract themes for form0

This separation ensures your app styling and form styling remain independent, making it easy to customize either without affecting the other.

## Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint

## Learn More

- [form0-core Documentation](https://github.com/paqu-io/form0-core)
- [form0-react Documentation](https://github.com/paqu-io/form0-react)
- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## License

This template is MIT licensed. See LICENSE for details.
