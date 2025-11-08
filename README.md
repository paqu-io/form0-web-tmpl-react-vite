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

  // Per-variant presentation presets (theme + layout overrides)
  presentations: {
    standard: {
      theme: 'standard',
      layout: { formWidth: '70vw', labelPosition: 'side', labelWidthPercent: 30 },
    },
    simplified: {
      theme: 'simplified',
      layout: { formWidth: '65vw', labelPosition: 'top', labelWidthPercent: 100 },
    },
    modal: {
      theme: 'standard',
      layout: { formWidth: '60vw', labelPosition: 'side', labelWidthPercent: 35 },
    },
    spotlight: {
      theme: 'standard',
      layout: { formWidth: '55vw', labelPosition: 'side', labelWidthPercent: 35 },
    },
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

#### Presentations

- Provide per-variant overrides for layout + theme without touching component code.
- Each key corresponds to a presentation (`standard`, `simplified`, `modal`, `spotlight`).
- `theme`: which form0-react theme string to use for the variant.
- `layout`: optional overrides for `formWidth`, `labelPosition`, and `labelWidthPercent`.

#### Theme

- **`mode`**: Color scheme for forms
  - `'light'`: Always use light theme
  - `'dark'`: Always use dark theme
  - `'system'`: Follow system preference (requires implementation)

- **`customTheme`**: Path to a custom vanilla-extract theme file (relative to `src/components/`)
  - Set to `null` to use form0-react's default theme
  - Example: `'../themes/custom-example.css.js'`
  - The theme is dynamically imported when the app loads
  - Must export a theme created with `createTheme()` from `@vanilla-extract/css`

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
│   ├── forms/
│   │   ├── registry.js            # Multi-form metadata + loaders
│   │   ├── use-form-schema.js     # Hook for loading schema JSON
│   │   └── demo/
│   │       └── schema.json        # Sample schema used across variants
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
  // Path is relative to src/components/ directory
  customTheme: '../themes/my-brand-theme.css.js',
}
```

The theme will be automatically imported and applied when the form loads.

See `src/themes/custom-example.css.js` for a complete example. To test it, uncomment the `customTheme` line in `form0.config.js`.

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

## Styling & Theming Architecture

This template uses a **three-layer styling system** that provides flexibility for different customization needs. Understanding how these layers interact is crucial for effective theming.

### The Three Styling Layers

```
┌─────────────────────────────────────────────────────────┐
│  Layer 3: Plain CSS Overrides (form0-overrides.css)    │
│  • Custom field renderer styles                         │
│  • CSS variables: --form0-accent, --form0-field-*      │
│  • Used by: date-field.jsx custom renderer             │
└─────────────────────────────────────────────────────────┘
                          ↓ overrides
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Custom Themes (custom-example.css.js)        │
│  • vanilla-extract theme overrides                      │
│  • Affects: ALL default form0-react field renderers    │
│  • Configured via: form0.config.js                      │
└─────────────────────────────────────────────────────────┘
                          ↓ overrides
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Default Theme (form0-react/theme.css.js)     │
│  • Built-in form0-react themes                          │
│  • Defines: vars.color.*, vars.spacing.*, etc.         │
│  • Used by: field-renderer.css, form-renderer.css      │
└─────────────────────────────────────────────────────────┘
```

### Layer 1: Default form0-react Theme

Located in the `form0-react` package, this provides built-in themes:
- `standard` (light/dark)
- `modal` (light/dark)
- `simplified` (light/dark)
- `spotlight` (light/dark)

These themes style **all default field renderers** (TextField, NumericField, SelectField, etc.) using vanilla-extract CSS-in-JS.

**When to use:** You don't need to do anything - this is the automatic fallback when no custom theme is specified.

### Layer 2: Custom Themes (Project-Level)

Create custom vanilla-extract themes to override the default form0-react styling for your entire project.

**Location:** `src/themes/custom-example.css.js`

**How it works:**
1. Import the theme contract from form0-react
2. Create your theme with `createTheme()`
3. Configure it in `form0.config.js`

```javascript
// src/themes/my-brand-theme.css.js
import { createTheme } from '@vanilla-extract/css';
import { vars } from 'form0-react/theme.css.js';

export const myBrandTheme = createTheme(vars, {
  color: {
    background: '#ffffff',
    foreground: '#000000',
    border: '#e5e7eb',
    primary: '#0066cc',
    error: '#dc2626',
    // ... all color tokens
  },
  borderRadius: '8px',
  fontSize: { base: '1rem', label: '0.875rem', section: '1.25rem' },
  spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem' },
});
```

**Activation:**
```javascript
// form0.config.js
theme: {
  customTheme: '../themes/my-brand-theme.css.js',
}
```

**What it affects:** ALL default form0-react field renderers (TextField, NumericField, etc.)

**What it does NOT affect:** Custom field renderers that use their own styling (like `date-field-shadcn.jsx`)

### Layer 3: Custom Field Renderer Styles

When you create custom field renderers, they can use their own styling approach.

#### Option A: Plain CSS (date-field.jsx)

Uses classes and CSS variables defined in `form0-overrides.css`:

```css
/* src/styles/form0-overrides.css */
:root {
  --form0-accent: 210 100% 56%;
  --form0-field-border: 214 16% 86%;
}

.form0-field {
  border: 1px solid hsl(var(--form0-field-border));
  background-color: hsl(var(--form0-field-bg));
}
```

```jsx
// src/field-renderers/date-field.jsx
<button className="form0-field form0-field-trigger">
  {/* Uses styles from form0-overrides.css */}
</button>
```

**Pros:** Centralized styling, framework-agnostic, easier to maintain consistent design system

#### Option B: Tailwind + shadcn (date-field-shadcn.jsx)

Uses Tailwind utility classes and shadcn component styles:

```jsx
// src/field-renderers/date-field-shadcn.jsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

<Input className="bg-background pr-10" />
<Button variant="ghost" className="absolute top-1/2 right-2">
  <CalendarIcon />
</Button>
```

**Pros:** More consistent with shadcn ecosystem, flexible per-component, better tree-shaking

### Which Fields Use Which Styling?

| Field Type | Renderer | Styling System |
|------------|----------|----------------|
| TextField (default) | form0-react | Layer 2 → Layer 1 |
| NumericField (default) | form0-react | Layer 2 → Layer 1 |
| SelectField (default) | form0-react | Layer 2 → Layer 1 |
| **DateField** (custom) | `date-field-shadcn.jsx` | Tailwind + shadcn (Layer 3) |
| DateField (alternate) | `date-field.jsx` | `form0-overrides.css` (Layer 3) |

To switch DateField styling:
```javascript
// form0.config.js
fieldRenderers: {
  DateField: 'date-field-shadcn',  // Uses Tailwind + shadcn
  // OR
  DateField: 'date-field',          // Uses form0-overrides.css
}
```

### Complete Styling Reference

#### File Overview

- **`index.css`**: Tailwind v4 config, shadcn design tokens, global app styles
- **`App.css`**: Application-specific layout and page structure
- **`styles/form0-overrides.css`**: Custom styling for form0 custom renderers (plain CSS approach)
- **`themes/custom-example.css.js`**: Example vanilla-extract custom theme for form0-react defaults

#### Quick Styling Guide

**To customize default form0 fields globally:**
→ Edit or create a theme in `src/themes/` and configure it in `form0.config.js`

**To customize the DateField (shadcn version):**
→ Edit shadcn component styles in `src/components/ui/` or modify Tailwind config in `index.css`

**To customize the DateField (plain CSS version):**
→ Edit classes in `src/styles/form0-overrides.css`

**To create a new custom field renderer:**
→ Choose your approach (Tailwind or plain CSS) and follow the pattern in `src/field-renderers/`

### Tailwind Configuration

This template uses **Tailwind CSS v4** with CSS-based configuration (no `tailwind.config.js` needed).

**Configuration location:** `src/index.css`

```css
/* Tailwind v4 imports */
@import "tailwindcss";

/* Theme configuration */
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --color-primary: var(--primary);
  /* ... more design tokens */
}
```

This modern approach keeps all styling configuration in CSS files, making it easier to manage and understand.

### Best Practices

1. **Keep styling concerns separated**: App styles in `index.css`/`App.css`, form0 overrides in `form0-overrides.css`
2. **Use custom themes for global changes**: If you want all default fields to match your brand, create a custom vanilla-extract theme
3. **Use custom renderers for specific field types**: If you need special behavior or styling for one field type (like DateField), create a custom renderer
4. **Choose one approach per renderer**: Either use plain CSS (like `date-field.jsx`) or Tailwind (like `date-field-shadcn.jsx`), but keep them consistent
5. **Test theme changes**: When creating custom themes, use dramatic values (like red borders) initially to verify the theme is loading correctly

### Troubleshooting

**Custom theme not applying?**
- Check browser console for `[form0] Custom theme loaded successfully`
- Verify the path in `form0.config.js` is correct (relative to `src/components/`)
- Ensure you've rebuilt `form0-react` if you modified package files: `cd form0-react && npm run build`

**Custom renderer not appearing?**
- Verify it's registered in `src/field-renderers/resolver.js`
- Check `form0.config.js` fieldRenderers mapping
- Ensure the field type matches exactly (e.g., `DateField`, not `dateField`)

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
